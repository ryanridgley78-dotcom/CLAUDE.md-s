import { ensurePortalTables, requireEditor, requirePortalDb, sha256Hex } from "../../_shared/portal-db.js";
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

function visiblePendingInvites(results) {
  const seen = new Set();
  const invites = [];

  for (const invite of results || []) {
    const email = String(invite.email || "").toLowerCase();
    if (!email || seen.has(email)) continue;
    seen.add(email);
    invites.push({
      email,
      name: invite.name || email,
      role: invite.role || "member",
      display_role: invite.display_role || "",
      expires_at: invite.expires_at || "",
      created_at: invite.created_at || "",
      expired: invite.expires_at ? new Date(invite.expires_at).getTime() < Date.now() : false,
    });
  }

  return invites;
}

async function loadPendingMemberInvites(db) {
  const { results } = await db.prepare(`
    SELECT
      pi.email,
      pi.name,
      pi.role,
      pi.display_role,
      pi.expires_at,
      pi.created_at
    FROM portal_invites pi
    LEFT JOIN portal_users pu ON lower(pu.email) = lower(pi.email)
    LEFT JOIN qahal_applications qa ON lower(qa.email) = lower(pi.email)
    WHERE pu.email IS NULL
      AND pi.used_at IS NULL
      AND pi.status = 'active'
      AND (pi.role = 'member' OR lower(pi.display_role) LIKE '%deacon%')
      AND COALESCE(qa.approval_status, 'approved') != 'denied'
    ORDER BY pi.created_at DESC
  `).all();

  return visiblePendingInvites(results);
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

  const invites = await loadPendingMemberInvites(db);
  return jsonResponse({ invites });
}

export async function onRequestPost({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Reminder details are required." }, 400);
  }

  const email = String(body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return jsonResponse({ error: "Choose a pending gate invite." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const existingUser = await db.prepare(`
    SELECT email
    FROM portal_users
    WHERE lower(email) = lower(?) AND status = 'active'
  `).bind(email).first();

  if (existingUser) {
    return jsonResponse({ error: "That account has already set up a gate password." }, 400);
  }

  const invite = await db.prepare(`
    SELECT pi.email, pi.name, pi.role, pi.display_role
    FROM portal_invites pi
    LEFT JOIN qahal_applications qa ON lower(qa.email) = lower(pi.email)
    WHERE lower(pi.email) = lower(?)
      AND pi.used_at IS NULL
      AND pi.status = 'active'
      AND (pi.role = 'member' OR lower(pi.display_role) LIKE '%deacon%')
      AND COALESCE(qa.approval_status, 'approved') != 'denied'
    ORDER BY pi.created_at DESC
  `).bind(email).first();

  if (!invite) {
    return jsonResponse({ error: "No pending gate setup invite was found for that email." }, 404);
  }

  const token = randomToken();
  const tokenHash = await sha256Hex(token);
  const expiresAt = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
  const normalizedEmail = String(invite.email || email).toLowerCase();
  const setupLink = setupUrl(request, normalizedEmail, token);
  const loginUrl = new URL("/portal/login.html", request.url).toString();

  await db.prepare(`
    UPDATE portal_invites
    SET status = 'superseded'
    WHERE lower(email) = lower(?)
      AND used_at IS NULL
      AND status = 'active'
  `).bind(normalizedEmail).run();

  await db.prepare(`
    INSERT INTO portal_invites (token_hash, email, name, role, display_role, status, expires_at)
    VALUES (?, ?, ?, ?, ?, 'active', ?)
  `).bind(
    tokenHash,
    normalizedEmail,
    invite.name || normalizedEmail,
    invite.role || "member",
    invite.display_role || "",
    expiresAt,
  ).run();

  let emailSent = false;
  let emailError = "";
  try {
    await sendZohoEmail(env, {
      to: normalizedEmail,
      subject: "YAH's Misfits Gate access reminder",
      text: `Shalom ${invite.name || "there"},

This is a reminder to finish setting up your YAH's Misfits Gate access.

Please use the link below to create your password:
${setupLink}

This link expires in 14 days. If you already set up your password, you can sign in here:
${loginUrl}

Blessings,
YAH's Misfits`,
    });
    emailSent = true;
  } catch (error) {
    emailError = error.message || "Unable to send setup reminder email.";
  }

  return jsonResponse({
    reminder: {
      email: normalizedEmail,
      name: invite.name || normalizedEmail,
      role: invite.role || "member",
      display_role: invite.display_role || "",
      expires_at: expiresAt,
      email_sent: emailSent,
      email_error: emailError,
    },
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
