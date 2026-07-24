import { ensurePortalTables, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

function cleanReport(input) {
  const reportDate = String(input.report_date || "").trim();
  const completedTasks = String(input.completed_tasks || "").trim();
  const progressNotes = String(input.progress_notes || "").trim();
  const blockers = String(input.blockers || "").trim();
  const nextSteps = String(input.next_steps || "").trim();

  if (!reportDate) {
    return { error: "Choose the report date." };
  }

  if (!completedTasks && !progressNotes && !blockers && !nextSteps) {
    return { error: "Add at least one progress detail before submitting." };
  }

  return {
    value: {
      report_date: reportDate,
      completed_tasks: completedTasks,
      progress_notes: progressNotes,
      blockers,
      next_steps: nextSteps,
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

export async function onRequestGet({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const url = new URL(request.url);
  const clientEmail = String(url.searchParams.get("client_email") || "").trim().toLowerCase();

  const query = clientEmail
    ? db.prepare(`
        SELECT id, client_email, client_name, report_date, completed_tasks, progress_notes, blockers, next_steps, created_at
        FROM daily_task_reports
        WHERE client_email = ?
        ORDER BY report_date DESC, created_at DESC
        LIMIT 50
      `).bind(clientEmail)
    : db.prepare(`
        SELECT id, client_email, client_name, report_date, completed_tasks, progress_notes, blockers, next_steps, created_at
        FROM daily_task_reports
        ORDER BY report_date DESC, created_at DESC
        LIMIT 50
      `);

  const { results } = await query.all();
  return jsonResponse({ reports: results || [] });
}

export async function onRequestPost({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Not signed in." }, 401);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Daily task report details are required." }, 400);
  }

  const cleaned = cleanReport(body);
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

  const report = cleaned.value;
  await db.prepare(`
    INSERT INTO daily_task_reports (
      client_email,
      client_name,
      report_date,
      completed_tasks,
      progress_notes,
      blockers,
      next_steps
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    user.email,
    user.name,
    report.report_date,
    report.completed_tasks,
    report.progress_notes,
    report.blockers,
    report.next_steps,
  ).run();

  return jsonResponse({ report });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
