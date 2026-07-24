import { ensurePortalTables, PORTAL_ROLES, requireEditor, requirePortalDb, sha256Hex } from "../../_shared/portal-db.js";
import { jsonResponse } from "../../_shared/portal-auth.js";
import { sendZohoEmail } from "../../_shared/smtp-mailer.js";

function setupUrl(request, email, token) {
  const url = new URL(request.url);
  return `${url.origin}/portal/set-password.html?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function normalizeInviteRole(value) {
  const requestedRole = String(value || "member").trim().toLowerCase();
  if (requestedRole === "deacon") {
    return {
      role: "elder",
      displayRole: "Deacon",
    };
  }
  return {
    role: requestedRole,
    displayRole: "",
  };
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

  const { results } = await db.prepare(`
    SELECT email, name, role, display_role, status, expires_at, used_at, created_at
    FROM portal_invites
    ORDER BY created_at DESC
    LIMIT 25
  `).all();

  const applications = await db.prepare(`
    SELECT
      email,
      first_name,
      last_name,
      full_name,
      phone,
      location,
      role_requested,
      approval_status,
      approved_at,
      approval_email_sent_at,
      submitted_at,
      updated_at
    FROM qahal_applications
    WHERE approval_status != 'denied'
    ORDER BY updated_at DESC, submitted_at DESC, full_name ASC, email ASC
  `).all();

  return jsonResponse({
    invites: results || [],
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
    return jsonResponse({ error: "Invite details are required." }, 400);
  }

  let requestBody = body;
  const { role, displayRole } = normalizeInviteRole(body.role);

  const applicationEmail = String(body.application_email || "").trim().toLowerCase();
  if (applicationEmail) {
    let db;
    try {
      db = requirePortalDb(env);
      await ensurePortalTables(db);
    } catch {
      return jsonResponse({ error: "Gate database is not configured." }, 500);
    }

    const application = await db.prepare(`
      SELECT email, full_name, first_name, last_name, approval_status
      FROM qahal_applications
      WHERE email = ?
    `).bind(applicationEmail).first();

    if (!application || application.approval_status === "denied") {
      return jsonResponse({ error: "Choose a finished Join Qahal application." }, 400);
    }

    const applicationName = String(application.full_name || `${application.first_name || ""} ${application.last_name || ""}`).trim();
    requestBody = {
      ...body,
      email: application.email,
      name: applicationName || body.name,
    };
  }

  const email = String(requestBody.email || "").trim().toLowerCase();
  const name = String(requestBody.name || "").trim();

  if (!email || !email.includes("@")) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }

  if (!name) {
    return jsonResponse({ error: "Enter the person's name." }, 400);
  }

  if (!PORTAL_ROLES.includes(role)) {
    return jsonResponse({ error: "Choose a valid gate role." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const token = randomToken();
  const tokenHash = await sha256Hex(token);
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
  const setupLink = setupUrl(request, email, token);

  await db.prepare(`
    INSERT INTO portal_invites (token_hash, email, name, role, display_role, status, expires_at)
    VALUES (?, ?, ?, ?, ?, 'active', ?)
  `).bind(tokenHash, email, name, role, displayRole, expiresAt).run();

  let emailSent = false;
  let emailError = "";
  if (body.send_email) {
    try {
      await sendZohoEmail(env, {
        to: email,
        subject: "YAH's Misfits Gate access",
        text: `Shalom ${name},

Your YAH's Misfits gate account has been approved.

Please use the link below to create your password:
${setupLink}

This link expires in 14 days. If you did not request or expect this account, you can ignore this message.

Blessings,
YAH's Misfits`,
      });
      emailSent = true;
    } catch (error) {
      emailError = error.message || "Unable to send setup email.";
    }
  }

  return jsonResponse({
    invite: {
      email,
      name,
      role,
      display_role: displayRole,
      status: "active",
      expires_at: expiresAt,
      setup_link: setupLink,
      email_sent: emailSent,
      email_error: emailError,
    },
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
