import { ensurePortalTables, requirePortalDb, sha256Hex } from "../../_shared/portal-db.js";
import { jsonResponse } from "../../_shared/portal-auth.js";
import { sendZohoEmail } from "../../_shared/smtp-mailer.js";

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function resetUrl(request, email, token) {
  const url = new URL(request.url);
  return `${url.origin}/portal/reset-password.html?email=${encodeURIComponent(email)}&token=${encodeURIComponent(token)}`;
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Email address is required." }, 400);
  }

  const email = String(body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const user = await db.prepare(`
    SELECT email, name, status
    FROM portal_users
    WHERE email = ?
  `).bind(email).first();

  if (!user || user.status === "disabled") {
    return jsonResponse({
      sent: false,
      message: "If that account exists, a password reset link will be sent.",
    });
  }

  const token = randomToken();
  const tokenHash = await sha256Hex(token);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  const link = resetUrl(request, email, token);

  await db.prepare(`
    INSERT INTO portal_password_resets (token_hash, email, status, expires_at)
    VALUES (?, ?, 'active', ?)
  `).bind(tokenHash, email, expiresAt).run();

  let emailSent = false;
  let emailError = "";
  try {
    await sendZohoEmail(env, {
      to: email,
      subject: "YAH's Misfits Gate Password Reset",
      text: `Shalom ${user.name},

Use this link to reset your YAH's Misfits gate password:
${link}

This reset link expires in 1 hour. If you did not request this, you can ignore this email.

Blessings,
YAH's Misfits`,
    });
    emailSent = true;
  } catch (error) {
    emailError = error.message || "Unable to send password reset email.";
  }

  return jsonResponse({
    sent: emailSent,
    email_error: emailError,
    message: emailSent
      ? "Password reset link sent."
      : "Password reset link was created, but email could not be sent.",
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
