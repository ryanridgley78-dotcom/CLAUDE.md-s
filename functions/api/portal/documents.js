import { ensurePortalTables, hasEditorAccess, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

const DOCUMENT_LIMIT_BYTES = 15 * 1024 * 1024;
const DOCUMENT_TYPES = new Map([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
  ["application/vnd.ms-excel", "xls"],
  ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
  ["text/plain", "txt"],
  ["text/rtf", "rtf"],
  ["application/rtf", "rtf"],
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
]);
const DOCUMENT_EXTENSIONS = new Map([
  ["pdf", "application/pdf"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["xls", "application/vnd.ms-excel"],
  ["xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  ["txt", "text/plain"],
  ["rtf", "application/rtf"],
  ["png", "image/png"],
  ["jpg", "image/jpeg"],
  ["jpeg", "image/jpeg"],
  ["webp", "image/webp"],
]);

function documentBucket(env) {
  const bucket = env.PORTAL_DOCUMENTS || env.FORUM_MEDIA;
  if (!bucket) {
    throw new Error("Portal document storage is not configured.");
  }
  return bucket;
}

function cleanDocumentScope(value) {
  return String(value || "library").trim() === "client" ? "client" : "library";
}

function documentPayload(row) {
  return {
    ...row,
    file_url: `/api/portal/document-file?id=${encodeURIComponent(row.id)}`,
  };
}

function parseDocumentIds(value) {
  try {
    const parsed = JSON.parse(value || "[]");
    return Array.isArray(parsed)
      ? parsed.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0)
      : [];
  } catch {
    return [];
  }
}

async function assignedLibraryDocumentIds(db, email) {
  const { results } = await db.prepare(`
    SELECT document_ids_json
    FROM client_coursework_items
    WHERE client_email = ?
  `).bind(String(email || "").toLowerCase()).all();

  return Array.from(new Set((results || []).flatMap((item) => parseDocumentIds(item.document_ids_json))));
}

function canPreviewClient(user) {
  return hasEditorAccess(user);
}

async function firstClientEmail(db) {
  const client = await db.prepare(`
    SELECT client_email
    FROM client_portals
    ORDER BY updated_at DESC, client_name ASC
    LIMIT 1
  `).first();
  return String(client?.client_email || "").toLowerCase();
}

async function clientDocuments(db, email) {
  const normalizedEmail = String(email || "").toLowerCase();
  const libraryDocumentIds = await assignedLibraryDocumentIds(db, normalizedEmail);
  const libraryClause = libraryDocumentIds.length
    ? `OR (document_scope = 'library' AND id IN (${libraryDocumentIds.map(() => "?").join(", ")}))`
    : "";
  const { results } = await db.prepare(`
    SELECT id, title, description, document_scope, client_email, client_name, file_name, file_type, file_size, uploaded_by_name, created_at, updated_at
    FROM portal_documents
    WHERE client_email = ?
      ${libraryClause}
    ORDER BY document_scope ASC, created_at DESC
  `).bind(normalizedEmail, ...libraryDocumentIds).all();

  return (results || []).map(documentPayload);
}

export async function onRequestGet({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Not signed in." }, 401);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const url = new URL(request.url);
  const requestedClientEmail = String(url.searchParams.get("client_email") || "").trim().toLowerCase();
  const canEdit = hasEditorAccess(user);
  const previewingClient = url.searchParams.get("preview") === "client" && canPreviewClient(user);

  if (previewingClient) {
    const previewEmail = requestedClientEmail || await firstClientEmail(db);
    return jsonResponse({ documents: previewEmail ? await clientDocuments(db, previewEmail) : [] });
  }

  if (requestedClientEmail && canEdit) {
    const { results } = await db.prepare(`
      SELECT id, title, description, document_scope, client_email, client_name, file_name, file_type, file_size, uploaded_by_name, created_at, updated_at
      FROM portal_documents
      WHERE document_scope = 'library' OR client_email = ?
      ORDER BY document_scope ASC, created_at DESC
    `).bind(requestedClientEmail).all();
    return jsonResponse({ documents: (results || []).map(documentPayload) });
  }

  if (canEdit) {
    const { results } = await db.prepare(`
      SELECT id, title, description, document_scope, client_email, client_name, file_name, file_type, file_size, uploaded_by_name, created_at, updated_at
      FROM portal_documents
      ORDER BY created_at DESC
      LIMIT 100
    `).all();
    return jsonResponse({ documents: (results || []).map(documentPayload) });
  }

  return jsonResponse({ documents: await clientDocuments(db, user.email) });
}

export async function onRequestPost({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Document upload details are required." }, 400);
  }

  const file = formData.get("file");
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const documentScope = cleanDocumentScope(formData.get("document_scope"));
  const clientEmail = String(formData.get("client_email") || "").trim().toLowerCase();
  const clientName = String(formData.get("client_name") || "").trim();

  if (!(file instanceof File) || !file.name) {
    return jsonResponse({ error: "Choose a document to upload." }, 400);
  }

  const fileExtension = String(file.name || "").split(".").pop().toLowerCase();
  const detectedType = DOCUMENT_EXTENSIONS.get(fileExtension) || "";
  const fileType = String(file.type || detectedType || "application/octet-stream").toLowerCase();
  const extension = DOCUMENT_TYPES.get(fileType) || (detectedType ? fileExtension.replace("jpeg", "jpg") : "");
  if (!extension) {
    return jsonResponse({ error: "Upload a PDF, Word document, spreadsheet, text file, or image." }, 400);
  }

  if (file.size > DOCUMENT_LIMIT_BYTES) {
    return jsonResponse({ error: "Choose a smaller document. Uploads must stay under 15 MB." }, 400);
  }

  if (!title) {
    return jsonResponse({ error: "Enter a document title." }, 400);
  }

  if (documentScope === "client" && (!clientEmail || !clientEmail.includes("@") || !clientName)) {
    return jsonResponse({ error: "Choose a client for this document." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  if (documentScope === "client") {
    const client = await db.prepare(`
      SELECT client_email, client_name
      FROM client_portals
      WHERE client_email = ?
    `).bind(clientEmail).first();
    if (!client) {
      return jsonResponse({ error: "Client assignment was not found." }, 404);
    }
  }

  const key = `portal-documents/${crypto.randomUUID()}.${extension}`;
  try {
    await documentBucket(env).put(key, file.stream(), {
      httpMetadata: {
        contentType: fileType,
        contentDisposition: `attachment; filename="${file.name.replaceAll('"', "")}"`,
      },
      customMetadata: {
        uploadedBy: String(editor.user.email || "").toLowerCase(),
        originalName: file.name.slice(0, 180),
      },
    });
  } catch {
    return jsonResponse({ error: "Portal document storage is not configured." }, 500);
  }

  const result = await db.prepare(`
    INSERT INTO portal_documents (
      title,
      description,
      document_scope,
      client_email,
      client_name,
      file_key,
      file_name,
      file_type,
      file_size,
      uploaded_by_email,
      uploaded_by_name
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    title,
    description,
    documentScope,
    documentScope === "client" ? clientEmail : "",
    documentScope === "client" ? clientName : "",
    key,
    file.name.slice(0, 180),
    fileType,
    file.size,
    String(editor.user.email || "").toLowerCase(),
    String(editor.user.name || ""),
  ).run();

  return jsonResponse({
    document: {
      id: result.meta?.last_row_id,
      title,
      description,
      document_scope: documentScope,
      client_email: documentScope === "client" ? clientEmail : "",
      client_name: documentScope === "client" ? clientName : "",
      file_name: file.name.slice(0, 180),
      file_type: fileType,
      file_size: file.size,
      uploaded_by_name: editor.user.name || "",
      file_url: `/api/portal/document-file?id=${encodeURIComponent(result.meta?.last_row_id || "")}`,
    },
  }, 201);
}

export async function onRequestDelete({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Document id is required." }, 400);
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || id < 1) {
    return jsonResponse({ error: "Document id is required." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const document = await db.prepare(`
    SELECT file_key
    FROM portal_documents
    WHERE id = ?
  `).bind(id).first();

  if (!document) {
    return jsonResponse({ error: "Document was not found." }, 404);
  }

  await db.prepare(`DELETE FROM portal_documents WHERE id = ?`).bind(id).run();
  try {
    await documentBucket(env).delete(document.file_key);
  } catch {
    // Metadata removal succeeded; a stale object can be cleaned up later.
  }

  return jsonResponse({ deleted: true, id });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
