import { ensurePortalTables, hasEditorAccess, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

const REFLECTION_TYPES = new Set(["journal", "dream"]);

function cleanReflection(input) {
  const reflectionType = String(input.reflection_type || "").trim().toLowerCase();
  const reflectionDate = String(input.reflection_date || "").trim();
  const title = String(input.title || "").trim();
  const body = String(input.body || "").trim();

  if (!REFLECTION_TYPES.has(reflectionType)) {
    return { error: "Choose journal or dream." };
  }

  if (!reflectionDate) {
    return { error: "Choose the entry date." };
  }

  if (!body) {
    return { error: "Write the entry before submitting." };
  }

  return {
    value: {
      reflection_type: reflectionType,
      reflection_date: reflectionDate,
      title,
      body,
    },
  };
}

async function isEnrolledClient(db, email) {
  const enrollment = await db.prepare(`
    SELECT client_email
    FROM client_portals
    WHERE client_email = ?
  `).bind(String(email || "").toLowerCase()).first();

  return Boolean(enrollment);
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

export async function onRequestGet({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Not signed in." }, 401);
  }

  const canEdit = hasEditorAccess(user);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const url = new URL(request.url);
  const clientEmail = String(url.searchParams.get("client_email") || "").trim().toLowerCase();
  const reflectionType = String(url.searchParams.get("reflection_type") || "").trim().toLowerCase();
  const previewingClient = url.searchParams.get("preview") === "client" && canPreviewClient(user);

  if (!canEdit && !await isEnrolledClient(db, user.email)) {
    return jsonResponse({ error: "Client course access is required." }, 403);
  }

  const filters = [];
  const bindings = [];

  if (previewingClient) {
    bindings.push(clientEmail || await firstClientEmail(db));
    filters.push("client_email = ?");
  } else if (canEdit && clientEmail) {
    filters.push("client_email = ?");
    bindings.push(clientEmail);
  }

  if (!canEdit) {
    filters.push("client_email = ?");
    bindings.push(user.email);
  }

  if (REFLECTION_TYPES.has(reflectionType)) {
    filters.push("reflection_type = ?");
    bindings.push(reflectionType);
  }

  const where = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const statement = db.prepare(`
    SELECT id, client_email, client_name, reflection_type, reflection_date, title, body, elder_notes, created_at
    FROM client_reflections
    ${where}
    ORDER BY reflection_date DESC, created_at DESC
    LIMIT 50
  `);

  const { results } = await statement.bind(...bindings).all();
  return jsonResponse({ reflections: results || [] });
}

export async function onRequestPost({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Not signed in." }, 401);
  }
  const url = new URL(request.url);
  if (url.searchParams.get("preview") === "client" && canPreviewClient(user)) {
    return jsonResponse({ error: "Preview mode is read-only." }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Reflection details are required." }, 400);
  }

  const cleaned = cleanReflection(body);
  if (cleaned.error) {
    return jsonResponse({ error: cleaned.error }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  if (!await isEnrolledClient(db, user.email)) {
    return jsonResponse({ error: "Client course access is required." }, 403);
  }

  const reflection = cleaned.value;
  await db.prepare(`
    INSERT INTO client_reflections (
      client_email,
      client_name,
      reflection_type,
      reflection_date,
      title,
      body
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(
    user.email,
    user.name,
    reflection.reflection_type,
    reflection.reflection_date,
    reflection.title,
    reflection.body,
  ).run();

  return jsonResponse({ reflection });
}

export async function onRequestPatch({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Reflection feedback is required." }, 400);
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || id < 1) {
    return jsonResponse({ error: "Reflection id is required." }, 400);
  }

  const elderNotes = String(body.elder_notes || "").trim();

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const result = await db.prepare(`
    UPDATE client_reflections
    SET elder_notes = ?
    WHERE id = ?
  `).bind(elderNotes, id).run();

  return jsonResponse({
    updated: Boolean(result.meta?.changes),
    reflection: { id, elder_notes: elderNotes },
  });
}

export async function onRequestDelete({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Reflection id is required." }, 400);
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || id < 1) {
    return jsonResponse({ error: "Reflection id is required." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const result = await db.prepare(`
    DELETE FROM client_reflections
    WHERE id = ?
  `).bind(id).run();

  return jsonResponse({ deleted: Boolean(result.meta?.changes), id });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
