import { ensurePortalTables, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
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
      pu.email,
      pu.name,
      pu.role,
      pu.display_role,
      pu.status,
      pu.mens_forum_approved,
      pu.created_at,
      pu.updated_at,
      cp.account_type,
      cp.portal_title,
      cp.updated_at AS program_updated_at,
      qa.first_name,
      qa.last_name,
      qa.full_name AS qahal_full_name,
      qa.phone,
      qa.location,
      qa.role_requested,
      qa.approval_status,
      qa.approved_at,
      qa.approval_email_sent_at,
      qa.application_text,
      qa.submitted_at AS qahal_submitted_at,
      qa.updated_at AS qahal_updated_at
    FROM portal_users pu
    LEFT JOIN client_portals cp ON cp.client_email = pu.email
    LEFT JOIN qahal_applications qa ON qa.email = pu.email
    ORDER BY pu.role ASC, pu.name ASC, pu.email ASC
  `).all();

  return jsonResponse({ users: results || [] });
}

export async function onRequestPatch({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "User update details are required." }, 400);
  }

  const email = String(body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return jsonResponse({ error: "Choose a valid gate user." }, 400);
  }

  const approved = body.mens_forum_approved ? 1 : 0;

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const result = await db.prepare(`
    UPDATE portal_users
    SET mens_forum_approved = ?, updated_at = CURRENT_TIMESTAMP
    WHERE email = ?
  `).bind(approved, email).run();

  if (!result.meta?.changes) {
    return jsonResponse({ error: "Gate user was not found." }, 404);
  }

  return jsonResponse({
    user: {
      email,
      mens_forum_approved: approved,
    },
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
