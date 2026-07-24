import { ensurePortalTables, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { jsonResponse } from "../../_shared/portal-auth.js";
import { sendZohoEmail } from "../../_shared/smtp-mailer.js";

export async function onRequestPatch({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Application approval details are required." }, 400);
  }

  const email = String(body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return jsonResponse({ error: "Choose a valid Join Qahal application." }, 400);
  }

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
  `).bind(email).first();

  if (!application) {
    return jsonResponse({ error: "Join Qahal application was not found." }, 404);
  }

  const name = String(application.full_name || `${application.first_name || ""} ${application.last_name || ""}`).trim() || "there";
  const nextStatus = body.approval_status === "denied" ? "denied" : "approved";

  if (nextStatus === "denied") {
    await db.prepare(`
      UPDATE qahal_applications
      SET
        approval_status = 'denied',
        updated_at = CURRENT_TIMESTAMP
      WHERE email = ?
    `).bind(email).run();

    return jsonResponse({
      application: {
        email,
        approval_status: "denied",
        email_sent: false,
        email_error: "",
      },
    });
  }

  let emailSent = false;
  let emailError = "";

  if (body.send_email !== false) {
    try {
      await sendZohoEmail(env, {
        to: email,
        subject: "YAH's Misfits Join Qahal Application Approved",
        text: `Shalom ${name},

Your Join Qahal application has been approved.

The next step is that an elder will send you a Gate login setup email. When that email arrives, use the setup link to create your password and enter your account.

Blessings,
YAH's Misfits`,
      });
      emailSent = true;
    } catch (error) {
      emailError = error.message || "Unable to send approval email.";
    }
  }

  await db.prepare(`
    UPDATE qahal_applications
    SET
      approval_status = 'approved',
      approved_at = COALESCE(approved_at, CURRENT_TIMESTAMP),
      approval_email_sent_at = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE approval_email_sent_at END,
      updated_at = CURRENT_TIMESTAMP
    WHERE email = ?
  `).bind(emailSent ? 1 : 0, email).run();

  return jsonResponse({
    application: {
      email,
      approval_status: "approved",
      email_sent: emailSent,
      email_error: emailError,
    },
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
