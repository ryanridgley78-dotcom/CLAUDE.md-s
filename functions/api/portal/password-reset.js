import { createSessionCookie, hashPassword, jsonResponse } from "../../_shared/portal-auth.js";
import { ensurePortalTables, requirePortalDb, sha256Hex } from "../../_shared/portal-db.js";

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Password reset details are required." }, 400);
  }

  const email = String(body.email || "").trim().toLowerCase();
  const token = String(body.token || "").trim();
  const password = String(body.password || "");

  if (!email || !email.includes("@") || !token || !password) {
    return jsonResponse({ error: "Email, reset token, and password are required." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const tokenHash = await sha256Hex(token);
  const reset = await db.prepare(`
    SELECT token_hash, email, status, expires_at, used_at
    FROM portal_password_resets
    WHERE token_hash = ? AND email = ?
  `).bind(tokenHash, email).first();

  if (!reset || reset.status !== "active" || reset.used_at) {
    return jsonResponse({ error: "This reset link is not valid." }, 400);
  }

  if (reset.expires_at && new Date(reset.expires_at).getTime() < Date.now()) {
    return jsonResponse({ error: "This reset link has expired." }, 400);
  }

  const user = await db.prepare(`
    SELECT email, name, role, display_role, status
    FROM portal_users
    WHERE email = ?
  `).bind(email).first();

  if (!user || user.status === "disabled") {
    return jsonResponse({ error: "This reset link is not valid." }, 400);
  }

  const passwordRecord = await hashPassword(password);
  await db.prepare(`
    UPDATE portal_users
    SET
      password_iterations = ?,
      password_salt = ?,
      password_hash = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE email = ?
  `).bind(
    passwordRecord.iterations,
    passwordRecord.salt,
    passwordRecord.hash,
    email,
  ).run();

  await db.prepare(`
    UPDATE portal_password_resets
    SET used_at = CURRENT_TIMESTAMP, status = 'used'
    WHERE token_hash = ?
  `).bind(tokenHash).run();

  const sessionUser = {
    email: user.email,
    name: user.name,
    role: user.role,
    display_role: user.display_role || "",
  };

  let sessionCookie;
  try {
    sessionCookie = await createSessionCookie(env, sessionUser);
  } catch {
    return jsonResponse({ error: "Gate session secret is not configured." }, 500);
  }

  return jsonResponse({ user: sessionUser }, 200, { "set-cookie": sessionCookie });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
