import { ensurePortalTables, hasEditorAccess, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

function documentBucket(env) {
  const bucket = env.PORTAL_DOCUMENTS || env.FORUM_MEDIA;
  if (!bucket) {
    throw new Error("Portal document storage is not configured.");
  }
  return bucket;
}

function canManageDocuments(user) {
  return hasEditorAccess(user);
}

function parseDocumentIds(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed)
      ? parsed.map((id) => Number(id)).filter((itemId) => Number.isInteger(itemId) && itemId > 0)
      : [];
  } catch {
    return [];
  }
}

async function hasAssignedLibraryDocument(db, email, documentId) {
  const { results } = await db.prepare(`
    SELECT document_ids_json
    FROM client_coursework_items
    WHERE client_email = ?
  `).bind(String(email || "").toLowerCase()).all();

  return (results || []).some((item) => parseDocumentIds(item.document_ids_json).includes(documentId));
}

export async function onRequestGet({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Not signed in." }, 401);
  }

  const id = Number(new URL(request.url).searchParams.get("id") || 0);
  if (!Number.isInteger(id) || id < 1) {
    return jsonResponse({ error: "Document was not found." }, 404);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const document = await db.prepare(`
    SELECT id, document_scope, client_email, file_key, file_name, file_type
    FROM portal_documents
    WHERE id = ?
  `).bind(id).first();

  if (!document) {
    return jsonResponse({ error: "Document was not found." }, 404);
  }

  const isAllowedClientDocument = document.document_scope === "client"
    && String(document.client_email || "").toLowerCase() === String(user.email || "").toLowerCase();
  const isAllowedLibraryDocument = document.document_scope === "library"
    && await hasAssignedLibraryDocument(db, user.email, document.id);

  if (!canManageDocuments(user) && !isAllowedClientDocument && !isAllowedLibraryDocument) {
    return jsonResponse({ error: "Document access is required." }, 403);
  }

  let object;
  try {
    object = await documentBucket(env).get(document.file_key);
  } catch {
    return jsonResponse({ error: "Portal document storage is not configured." }, 500);
  }

  if (!object) {
    return jsonResponse({ error: "Document file was not found." }, 404);
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("cache-control", "private, max-age=900");
  headers.set("content-type", document.file_type || "application/octet-stream");
  headers.set("content-disposition", `attachment; filename="${String(document.file_name || "document").replaceAll('"', "")}"`);
  if (object.httpEtag) headers.set("etag", object.httpEtag);

  return new Response(object.body, { headers });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
