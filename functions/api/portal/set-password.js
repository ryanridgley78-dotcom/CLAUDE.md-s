import { createSessionCookie, hashPassword, jsonResponse } from "../../_shared/portal-auth.js";
import { ensurePortalTables, requirePortalDb, sha256Hex } from "../../_shared/portal-db.js";

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Password setup details are required." }, 400);
  }

  const email = String(body.email || "").trim().toLowerCase();
  const token = String(body.token || "").trim();
  const password = String(body.password || "");

  if (!email || !email.includes("@") || !token || !password) {
    return jsonResponse({ error: "Email, invite token, and password are required." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const tokenHash = await sha256Hex(token);
  const invite = await db.prepare(`
    SELECT email, name, role, display_role, status, expires_at, used_at
    FROM portal_invites
    WHERE token_hash = ? AND email = ?
  `).bind(tokenHash, email).first();

  if (!invite || invite.status !== "active" || invite.used_at) {
    return jsonResponse({ error: "This setup link is not valid." }, 400);
  }

  if (invite.expires_at && new Date(invite.expires_at).getTime() < Date.now()) {
    return jsonResponse({ error: "This setup link has expired." }, 400);
  }

  const passwordRecord = await hashPassword(password);

  await db.prepare(`
    INSERT INTO portal_users (email, name, role, display_role, status, password_iterations, password_salt, password_hash)
    VALUES (?, ?, ?, ?, 'active', ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      name = excluded.name,
      role = excluded.role,
      display_role = excluded.display_role,
      status = 'active',
      password_iterations = excluded.password_iterations,
      password_salt = excluded.password_salt,
      password_hash = excluded.password_hash,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    invite.email,
    invite.name,
    invite.role,
    invite.display_role || "",
    passwordRecord.iterations,
    passwordRecord.salt,
    passwordRecord.hash,
  ).run();

  await db.prepare(`
    UPDATE portal_invites
    SET used_at = CURRENT_TIMESTAMP, status = 'used'
    WHERE token_hash = ?
  `).bind(tokenHash).run();

  const user = {
    email: invite.email,
    name: invite.name,
    role: invite.role,
    display_role: invite.display_role || "",
  };

  let sessionCookie;
  try {
    sessionCookie = await createSessionCookie(env, user);
  } catch {
    return jsonResponse({ error: "Gate session secret is not configured." }, 500);
  }

  return jsonResponse({ user }, 200, { "set-cookie": sessionCookie });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
