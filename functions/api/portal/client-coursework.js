import {
  COURSEWORK_ITEM_TYPES,
  MODULE_PROGRESS_STATUSES,
  ensurePortalTables,
  hasEditorAccess,
  requireEditor,
  requirePortalDb,
} from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

function cleanCourseworkItem(input) {
  const clientEmail = String(input.client_email || "").trim().toLowerCase();
  const clientName = String(input.client_name || "").trim();
  const itemType = String(input.item_type || "").trim();
  const title = String(input.title || "").trim();
  const instructions = String(input.instructions || "").trim();
  const dueDate = String(input.due_date || "").trim();
  const moduleIndex = Number(input.module_index ?? -1);
  const documentIds = Array.isArray(input.document_ids)
    ? input.document_ids.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0)
    : [];

  if (!clientEmail || !clientEmail.includes("@")) {
    return { error: "Choose a valid client." };
  }

  if (!clientName) {
    return { error: "Client name is required." };
  }

  if (!COURSEWORK_ITEM_TYPES.includes(itemType)) {
    return { error: "Choose a valid coursework type." };
  }

  if (!title) {
    return { error: "Enter a coursework title." };
  }

  if (!Number.isInteger(moduleIndex) || moduleIndex < -1) {
    return { error: "Choose a valid course module." };
  }

  return {
    value: {
      client_email: clientEmail,
      client_name: clientName,
      module_index: moduleIndex,
      item_type: itemType,
      title,
      instructions,
      due_date: dueDate,
      document_ids: documentIds,
    },
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

function documentPayload(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description || "",
    file_name: row.file_name || "",
    file_type: row.file_type || "",
    file_size: row.file_size || 0,
    file_url: `/api/portal/document-file?id=${encodeURIComponent(row.id)}`,
  };
}

async function attachCourseworkDocuments(db, items, clientEmail) {
  const itemDocumentIds = (items || []).map((item) => parseDocumentIds(item.document_ids_json));
  const documentIds = Array.from(new Set(itemDocumentIds.flat()));
  if (!documentIds.length) {
    return (items || []).map((item) => ({ ...item, document_ids: [], documents: [] }));
  }

  const placeholders = documentIds.map(() => "?").join(", ");
  const { results } = await db.prepare(`
    SELECT id, title, description, file_name, file_type, file_size
    FROM portal_documents
    WHERE id IN (${placeholders})
      AND (document_scope = 'library' OR client_email = ?)
  `).bind(...documentIds, String(clientEmail || "").toLowerCase()).all();

  const documentsById = new Map((results || []).map((document) => [Number(document.id), documentPayload(document)]));
  return (items || []).map((item, index) => {
    const document_ids = itemDocumentIds[index] || [];
    return {
      ...item,
      document_ids,
      documents: document_ids.map((id) => documentsById.get(id)).filter(Boolean),
    };
  });
}

async function loadClientBundle(db, clientEmail) {
  const client = await db.prepare(`
    SELECT client_email, client_name, account_type, portal_title, first_assignment, updated_at
    FROM client_portals
    WHERE client_email = ?
  `).bind(clientEmail).first();

  const path = client ? await db.prepare(`
    SELECT course_code, path_title, modules_json
    FROM account_paths
    WHERE account_type = ?
  `).bind(client.account_type).first() : null;

  const { results: moduleProgress } = client ? await db.prepare(`
    SELECT module_index, status, elder_notes, updated_at
    FROM client_module_progress
    WHERE client_email = ? AND account_type = ?
    ORDER BY module_index ASC
  `).bind(clientEmail, client.account_type).all() : { results: [] };

  const { results: items } = await db.prepare(`
    SELECT id, client_email, client_name, module_index, item_type, title, instructions, elder_feedback, document_ids_json, due_date, status, created_at, updated_at
    FROM client_coursework_items
    WHERE client_email = ?
    ORDER BY updated_at DESC, created_at DESC
  `).bind(clientEmail).all();

  const { results: reports } = await db.prepare(`
    SELECT id, client_email, client_name, report_date, completed_tasks, progress_notes, blockers, next_steps, created_at
    FROM daily_task_reports
    WHERE client_email = ?
    ORDER BY report_date DESC, created_at DESC
    LIMIT 25
  `).bind(clientEmail).all();

  const { results: reflections } = await db.prepare(`
    SELECT id, client_email, client_name, reflection_type, reflection_date, title, body, elder_notes, created_at
    FROM client_reflections
    WHERE client_email = ?
    ORDER BY reflection_date DESC, created_at DESC
    LIMIT 25
  `).bind(clientEmail).all();

  return {
    client: client || null,
    path: path ? { ...path, modules: JSON.parse(path.modules_json || "[]") } : null,
    module_progress: moduleProgress || [],
    items: await attachCourseworkDocuments(db, items || [], clientEmail),
    reports: reports || [],
    reflections: reflections || [],
  };
}

function canPreviewClient(user) {
  return hasEditorAccess(user);
}

function isClientPreviewRequest(request, user) {
  const url = new URL(request.url);
  return url.searchParams.get("preview") === "client" && canPreviewClient(user);
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

async function isEnrolledClient(db, email) {
  const enrollment = await db.prepare(`
    SELECT client_email
    FROM client_portals
    WHERE client_email = ?
  `).bind(String(email || "").toLowerCase()).first();

  return Boolean(enrollment);
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
  const requestedEmail = String(url.searchParams.get("client_email") || "").trim().toLowerCase();
  let clientEmail = user.email;

  if (isClientPreviewRequest(request, user)) {
    clientEmail = requestedEmail || await firstClientEmail(db);
  } else if (requestedEmail) {
    const editor = await requireEditor(request, env);
    if (editor.response) return editor.response;
    clientEmail = requestedEmail;
  } else if (!await isEnrolledClient(db, user.email)) {
    return jsonResponse({ error: "Client course access is required." }, 403);
  }

  return jsonResponse(await loadClientBundle(db, clientEmail));
}

export async function onRequestPost({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) return jsonResponse({ error: "Not signed in." }, 401);
  if (isClientPreviewRequest(request, user)) return jsonResponse({ error: "Preview mode is read-only." }, 403);

  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Coursework details are required." }, 400);
  }

  const cleaned = cleanCourseworkItem(body);
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

  const item = cleaned.value;
  const result = await db.prepare(`
    INSERT INTO client_coursework_items (
      client_email,
      client_name,
      module_index,
      item_type,
      title,
      instructions,
      document_ids_json,
      due_date
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    item.client_email,
    item.client_name,
    item.module_index,
    item.item_type,
    item.title,
    item.instructions,
    JSON.stringify(item.document_ids),
    item.due_date,
  ).run();

  return jsonResponse({ item: { ...item, id: result.meta?.last_row_id } });
}

export async function onRequestPatch({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Not signed in." }, 401);
  }
  if (isClientPreviewRequest(request, user)) return jsonResponse({ error: "Preview mode is read-only." }, 403);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Coursework update details are required." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  if (body.module_progress) {
    const editor = await requireEditor(request, env);
    if (editor.response) return editor.response;

    const clientEmail = String(body.client_email || "").trim().toLowerCase();
    const moduleIndex = Number(body.module_index);
    const status = String(body.module_status || "").trim();
    const elderNotes = String(body.elder_notes || "").trim();
    if (!clientEmail || !clientEmail.includes("@") || !Number.isInteger(moduleIndex) || moduleIndex < 0) {
      return jsonResponse({ error: "Choose a valid client module." }, 400);
    }
    if (!MODULE_PROGRESS_STATUSES.includes(status)) {
      return jsonResponse({ error: "Choose a valid module status." }, 400);
    }

    const client = await db.prepare(`
      SELECT account_type FROM client_portals WHERE client_email = ?
    `).bind(clientEmail).first();
    if (!client) {
      return jsonResponse({ error: "Client assignment was not found." }, 404);
    }

    await db.prepare(`
      INSERT INTO client_module_progress (client_email, account_type, module_index, status, elder_notes)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(client_email, account_type, module_index) DO UPDATE SET
        status = excluded.status,
        elder_notes = excluded.elder_notes,
        updated_at = CURRENT_TIMESTAMP
    `).bind(clientEmail, client.account_type, moduleIndex, status, elderNotes).run();

    return jsonResponse({ updated: true, module_index: moduleIndex, status, elder_notes: elderNotes });
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || id < 1) {
    return jsonResponse({ error: "Coursework item id is required." }, 400);
  }

  if (Object.hasOwn(body, "status")) {
    if (!await isEnrolledClient(db, user.email)) {
      return jsonResponse({ error: "Client course access is required." }, 403);
    }

    const status = String(body.status || "").trim();
    if (!["assigned", "completed"].includes(status)) {
      return jsonResponse({ error: "Choose assigned or completed." }, 400);
    }

    const result = await db.prepare(`
      UPDATE client_coursework_items
      SET status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND client_email = ?
    `).bind(status, id, user.email).run();

    if (!result.meta?.changes) {
      return jsonResponse({ error: "Coursework item was not found for this account." }, 404);
    }

    return jsonResponse({
      updated: true,
      id,
      status,
    });
  }

  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  const elderFeedback = String(body.elder_feedback || "").trim();
  const result = await db.prepare(`
    UPDATE client_coursework_items
    SET elder_feedback = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(elderFeedback, id).run();

  return jsonResponse({
    updated: Boolean(result.meta?.changes),
    id,
    elder_feedback: elderFeedback,
  });
}

export async function onRequestDelete({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) return jsonResponse({ error: "Not signed in." }, 401);
  if (isClientPreviewRequest(request, user)) return jsonResponse({ error: "Preview mode is read-only." }, 403);

  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Coursework item id is required." }, 400);
  }

  const id = Number(body.id);
  if (!Number.isInteger(id) || id < 1) {
    return jsonResponse({ error: "Coursework item id is required." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const result = await db.prepare(`
    DELETE FROM client_coursework_items
    WHERE id = ?
  `).bind(id).run();

  return jsonResponse({ deleted: Boolean(result.meta?.changes), id });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
