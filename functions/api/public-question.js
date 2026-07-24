import { ensurePortalTables, requirePortalDb } from "../_shared/portal-db.js";
import { jsonResponse } from "../_shared/portal-auth.js";

const RYAN_RECIPIENT = {
  email: "ryanridgley78@gmail.com",
  name: "Ryan Ridgley",
};

async function readBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();
  return Object.fromEntries(formData.entries());
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await readBody(request);
  } catch {
    return jsonResponse({ error: "Question details are required." }, 400);
  }

  if (String(body.website || "").trim()) {
    return jsonResponse({ sent: true });
  }

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim().toLowerCase();
  const subject = String(body.subject || "").trim();
  const question = String(body.question || body.message || "").trim();

  if (!name) return jsonResponse({ error: "Enter your name." }, 400);
  if (!email || !email.includes("@")) return jsonResponse({ error: "Enter a valid email address." }, 400);
  if (!subject) return jsonResponse({ error: "Add a subject." }, 400);
  if (!question) return jsonResponse({ error: "Add your question." }, 400);
  if (subject.length > 160) return jsonResponse({ error: "Keep the subject under 160 characters." }, 400);
  if (question.length > 5000) return jsonResponse({ error: "Keep the question under 5000 characters." }, 400);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Website message storage is not configured." }, 500);
  }

  const result = await db.prepare(`
    INSERT INTO direct_messages (sender_email, sender_name, sender_role, recipient_email, recipient_name, subject, body)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    email,
    name,
    "Public Question",
    RYAN_RECIPIENT.email,
    RYAN_RECIPIENT.name,
    `Public Question: ${subject}`,
    question,
  ).run();

  return jsonResponse({
    sent: true,
    message: {
      id: result.meta?.last_row_id,
      recipient_name: RYAN_RECIPIENT.name,
    },
  }, 201);
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
