import { cleanClientPortal, ensurePortalTables, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { jsonResponse } from "../../_shared/portal-auth.js";

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

  const { results } = await db.prepare(`
    SELECT
      cp.client_email,
      cp.client_name,
      cp.account_type,
      cp.portal_title,
      cp.first_assignment,
      cp.program_application_id,
      cp.updated_at,
      ma.application_type,
      ma.first_name,
      ma.last_name,
      ma.full_name AS application_full_name,
      ma.phone,
      ma.location,
      ma.application_json,
      ma.application_text,
      ma.submitted_at AS application_submitted_at,
      ma.updated_at AS application_updated_at
    FROM client_portals cp
    LEFT JOIN ministry_applications ma ON ma.id = cp.program_application_id
    ORDER BY cp.updated_at DESC, cp.client_name ASC
  `).all();

  const applications = await db.prepare(`
    SELECT
      id,
      application_type,
      email,
      first_name,
      last_name,
      full_name,
      phone,
      location,
      submitted_at,
      updated_at
    FROM ministry_applications
    WHERE application_type LIKE '%Widow%'
      OR application_type LIKE '%Orphan%'
      OR application_type LIKE '%Patriarch%'
    ORDER BY updated_at DESC, submitted_at DESC, full_name ASC, email ASC
  `).all();

  return jsonResponse({
    clients: results || [],
    applications: applications.results || [],
  });
}

export async function onRequestPost({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Client gate details are required." }, 400);
  }

  let requestBody = body;

  const applicationId = Number(body.application_id || 0);
  if (applicationId) {
    let db;
    try {
      db = requirePortalDb(env);
      await ensurePortalTables(db);
    } catch {
      return jsonResponse({ error: "Gate database is not configured." }, 500);
    }

    const application = await db.prepare(`
      SELECT id, email, full_name, first_name, last_name, application_type
      FROM ministry_applications
      WHERE id = ?
    `).bind(applicationId).first();

    if (!application) {
      return jsonResponse({ error: "Choose a finished Widows, Orphans, or Patriarch application." }, 400);
    }

    const applicationName = String(application.full_name || `${application.first_name || ""} ${application.last_name || ""}`).trim();
    requestBody = {
      ...body,
      client_email: application.email,
      client_name: applicationName || body.client_name,
      program_application_id: application.id,
    };
  }

  const cleaned = cleanClientPortal(requestBody);
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

  const client = cleaned.value;
  await db.prepare(`
    INSERT INTO client_portals (client_email, client_name, account_type, portal_title, first_assignment, program_application_id)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(client_email) DO UPDATE SET
      client_name = excluded.client_name,
      account_type = excluded.account_type,
      portal_title = excluded.portal_title,
      first_assignment = excluded.first_assignment,
      program_application_id = excluded.program_application_id,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    client.client_email,
    client.client_name,
    client.account_type,
    client.portal_title,
    client.first_assignment,
    Number(requestBody.program_application_id || 0),
  ).run();

  return jsonResponse({ client });
}

export async function onRequestDelete({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Client email is required." }, 400);
  }

  const clientEmail = String(body.client_email || "").trim().toLowerCase();
  if (!clientEmail || !clientEmail.includes("@")) {
    return jsonResponse({ error: "Enter a valid client email address." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const result = await db.prepare(`
    DELETE FROM client_portals
    WHERE client_email = ?
  `).bind(clientEmail).run();

  return jsonResponse({
    deleted: Boolean(result.meta?.changes),
    client_email: clientEmail,
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
