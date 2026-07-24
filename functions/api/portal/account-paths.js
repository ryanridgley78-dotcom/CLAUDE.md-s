import { ACCOUNT_TYPES, cleanAccountPath, ensurePortalTables, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { jsonResponse } from "../../_shared/portal-auth.js";

export async function onRequestGet({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  const url = new URL(request.url);
  const accountType = url.searchParams.get("account_type");
  if (accountType && !ACCOUNT_TYPES.includes(accountType)) {
    return jsonResponse({ error: "Choose Widows, Orphans, or Patriarchs." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  if (accountType) {
    const path = await db.prepare(`
      SELECT account_type, course_code, course_status, path_title, overview, learning_objectives, completion_requirements, modules_json, coursework, progress_tracking, book_list, first_lesson, first_assignment, updated_at
      FROM account_paths
      WHERE account_type = ?
    `).bind(accountType).first();

    return jsonResponse({ path: path ? { ...path, modules: JSON.parse(path.modules_json || "[]") } : null });
  }

  const { results } = await db.prepare(`
    SELECT account_type, course_code, course_status, path_title, overview, learning_objectives, completion_requirements, modules_json, coursework, progress_tracking, book_list, first_lesson, first_assignment, updated_at
    FROM account_paths
    ORDER BY account_type ASC
  `).all();

  return jsonResponse({ paths: (results || []).map((path) => ({ ...path, modules: JSON.parse(path.modules_json || "[]") })) });
}

export async function onRequestPost({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Account path details are required." }, 400);
  }

  const cleaned = cleanAccountPath(body);
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

  const path = cleaned.value;
  await db.prepare(`
    INSERT INTO account_paths (account_type, course_code, course_status, path_title, overview, learning_objectives, completion_requirements, modules_json, coursework, progress_tracking, book_list, first_lesson, first_assignment)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(account_type) DO UPDATE SET
      course_code = excluded.course_code,
      course_status = excluded.course_status,
      path_title = excluded.path_title,
      overview = excluded.overview,
      learning_objectives = excluded.learning_objectives,
      completion_requirements = excluded.completion_requirements,
      modules_json = excluded.modules_json,
      coursework = excluded.coursework,
      progress_tracking = excluded.progress_tracking,
      book_list = excluded.book_list,
      first_lesson = excluded.first_lesson,
      first_assignment = excluded.first_assignment,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    path.account_type,
    path.course_code,
    path.course_status,
    path.path_title,
    path.overview,
    path.learning_objectives,
    path.completion_requirements,
    path.modules_json,
    path.coursework,
    path.progress_tracking,
    path.book_list,
    path.first_lesson,
    path.first_assignment,
  ).run();

  return jsonResponse({ path });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
