import { ensurePortalTables, hasEditorAccess, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

function canPreviewClient(user) {
  return hasEditorAccess(user);
}

async function previewClientEmail(request, db, user) {
  const url = new URL(request.url);
  if (url.searchParams.get("preview") !== "client" || !canPreviewClient(user)) return "";

  const requestedEmail = String(url.searchParams.get("client_email") || "").trim().toLowerCase();
  if (requestedEmail) return requestedEmail;

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

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ assignment: null, setupNeeded: true });
  }

  const previewEmail = await previewClientEmail(request, db, user);
  const clientEmail = previewEmail || user.email;

  const assignment = await db.prepare(`
    SELECT
      cp.client_email,
      cp.client_name,
      cp.account_type,
      cp.portal_title,
      cp.first_assignment,
      cp.updated_at,
      ap.course_code,
      ap.path_title,
      ap.overview,
      ap.learning_objectives,
      ap.completion_requirements,
      ap.modules_json,
      ap.coursework,
      ap.progress_tracking,
      ap.book_list,
      ap.first_lesson,
      ap.first_assignment AS path_first_assignment
    FROM client_portals cp
    LEFT JOIN account_paths ap ON ap.account_type = cp.account_type
    WHERE cp.client_email = ?
  `).bind(clientEmail).first();

  const { results: moduleProgress } = assignment ? await db.prepare(`
    SELECT module_index, status, elder_notes, updated_at
    FROM client_module_progress
    WHERE client_email = ? AND account_type = ?
    ORDER BY module_index ASC
  `).bind(clientEmail, assignment.account_type).all() : { results: [] };

  return jsonResponse({
    assignment: assignment ? {
      ...assignment,
      modules: JSON.parse(assignment.modules_json || "[]"),
      module_progress: moduleProgress || [],
    } : null,
  });
}
