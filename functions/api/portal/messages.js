import { ensurePortalTables, hasEditorAccess, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse, readUsers } from "../../_shared/portal-auth.js";

const DEFAULT_ELDER_RECIPIENTS = [
  {
    email: "ryanridgley78@gmail.com",
    name: "Ryan Ridgley",
    role: "editor",
    display_role: "Elder/Co-Founder",
  },
  {
    email: "restoringthekingdom2as1@gmail.com",
    name: "Jared Cheshire",
    role: "elder",
    display_role: "Elder",
  },
  {
    email: "prayerforlife@yahoo.com",
    name: "Samuel Barnes",
    role: "elder",
    display_role: "Elder",
  },
];

function canManageMessages(user) {
  return hasEditorAccess(user);
}

function portalPreviewMode() {
  return "";
}

function isPortalPreviewRequest(request, user) {
  return Boolean(portalPreviewMode(request, user));
}

function effectiveMessageUser(request, user) {
  const preview = portalPreviewMode(request, user);
  if (!preview) return user;
  return {
    ...user,
    role: preview,
    display_role: preview === "client" ? "Client" : "Member",
  };
}

function canSendMessages(user) {
  return Boolean(user?.role);
}

function isElderRecipient(user) {
  return hasEditorAccess(user);
}

function addElderRecipients(recipients, users) {
  for (const configuredUser of users || []) {
    const email = String(configuredUser.email || "").toLowerCase();
    if (email && isElderRecipient(configuredUser)) {
      recipients.set(email, { ...configuredUser, email });
    }
  }
}

async function loadRecipients(db, user, env) {
  if (canManageMessages(user)) {
    const { results } = await db.prepare(`
      SELECT email, name, role, display_role
      FROM portal_users
      WHERE status = 'active'
        AND role IN ('member', 'client')
        AND lower(display_role) NOT LIKE '%elder%'
        AND lower(display_role) NOT LIKE '%deacon%'
        AND lower(display_role) NOT LIKE '%co-founder%'
      ORDER BY role ASC, name ASC, email ASC
    `).all();

    return results || [];
  }

  const { results } = await db.prepare(`
    SELECT email, name, role, display_role
    FROM portal_users
    WHERE status = 'active'
      AND (
        role IN ('elder', 'admin', 'editor')
        OR lower(display_role) LIKE '%elder%'
        OR lower(display_role) LIKE '%deacon%'
        OR lower(display_role) LIKE '%co-founder%'
      )
    ORDER BY role DESC, name ASC, email ASC
  `).all();

  const recipients = new Map();
  for (const recipient of results || []) {
    recipients.set(String(recipient.email || "").toLowerCase(), recipient);
  }

  addElderRecipients(recipients, DEFAULT_ELDER_RECIPIENTS);

  try {
    addElderRecipients(recipients, readUsers(env));
  } catch {
    // D1 users are the primary source; configured users are only a fallback.
  }

  return Array.from(recipients.values()).sort((left, right) => (
    String(left.name || left.email).localeCompare(String(right.name || right.email))
  ));
}

export async function onRequestGet({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) return jsonResponse({ error: "Not signed in." }, 401);
  const previewingPortal = isPortalPreviewRequest(request, user);
  const messageUser = effectiveMessageUser(request, user);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Message storage is not configured." }, 500);
  }

  const manager = canManageMessages(messageUser);
  const normalizedEmail = String(messageUser.email || "").toLowerCase();
  let results = [];
  if (!previewingPortal) {
    const query = manager
      ? user.role === "admin" || user.role === "editor"
        ? db.prepare(`
          SELECT id, sender_email, sender_name, sender_role, recipient_email, recipient_name, subject, body, status, created_at, updated_at
          FROM direct_messages
          WHERE status != 'archived'
          ORDER BY created_at DESC, id DESC
        `)
        : db.prepare(`
          SELECT id, sender_email, sender_name, sender_role, recipient_email, recipient_name, subject, body, status, created_at, updated_at
          FROM direct_messages
          WHERE status != 'archived' AND (recipient_email = ? OR recipient_email = '')
          ORDER BY created_at DESC, id DESC
        `).bind(normalizedEmail)
      : db.prepare(`
          SELECT id, sender_email, sender_name, sender_role, recipient_email, recipient_name, subject, body, status, created_at, updated_at
          FROM direct_messages
          WHERE status != 'archived' AND (sender_email = ? OR recipient_email = ?)
          ORDER BY created_at DESC, id DESC
        `).bind(normalizedEmail, normalizedEmail);

    ({ results } = await query.all());
  }
  const recipients = await loadRecipients(db, messageUser, env);
  return jsonResponse({
    messages: results || [],
    can_manage: manager,
    can_send: canSendMessages(messageUser),
    recipients,
  });
}

export async function onRequestPost({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) return jsonResponse({ error: "Not signed in." }, 401);
  if (isPortalPreviewRequest(request, user)) return jsonResponse({ error: "Preview mode is read-only." }, 403);
  const messageUser = effectiveMessageUser(request, user);
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Message details are required." }, 400);
  }

  const subject = String(body.subject || "").trim();
  const messageBody = String(body.body || body.message || "").trim();
  const recipientEmail = String(body.recipient_email || "").trim().toLowerCase();
  if (!subject) return jsonResponse({ error: "Add a subject." }, 400);
  if (!messageBody) return jsonResponse({ error: "Add your message." }, 400);
  if (!recipientEmail || !recipientEmail.includes("@")) return jsonResponse({ error: "Choose a recipient." }, 400);
  if (subject.length > 180) return jsonResponse({ error: "Keep the subject under 180 characters." }, 400);
  if (messageBody.length > 8000) return jsonResponse({ error: "Keep the message under 8000 characters." }, 400);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Message storage is not configured." }, 500);
  }

  let recipient = canManageMessages(messageUser)
    ? await db.prepare(`
        SELECT email, name
        FROM portal_users
        WHERE email = ?
          AND role IN ('member', 'client')
          AND lower(display_role) NOT LIKE '%elder%'
          AND lower(display_role) NOT LIKE '%deacon%'
          AND lower(display_role) NOT LIKE '%co-founder%'
          AND status = 'active'
      `).bind(recipientEmail).first()
    : await db.prepare(`
        SELECT email, name
        FROM portal_users
        WHERE email = ?
          AND status = 'active'
          AND (
            role IN ('elder', 'admin', 'editor')
            OR lower(display_role) LIKE '%elder%'
            OR lower(display_role) LIKE '%deacon%'
            OR lower(display_role) LIKE '%co-founder%'
          )
      `).bind(recipientEmail).first();

  if (!recipient && !canManageMessages(messageUser)) {
    const defaultRecipient = DEFAULT_ELDER_RECIPIENTS.find((configuredUser) => (
      String(configuredUser.email || "").toLowerCase() === recipientEmail
    ));
    if (defaultRecipient) {
      recipient = {
        email: defaultRecipient.email,
        name: defaultRecipient.name || defaultRecipient.email,
      };
    }
  }

  if (!recipient && !canManageMessages(messageUser)) {
    try {
      const configuredRecipient = readUsers(env).find((configuredUser) => {
        const email = String(configuredUser.email || "").toLowerCase();
        return email === recipientEmail && isElderRecipient(configuredUser);
      });
      if (configuredRecipient) {
        recipient = {
          email: configuredRecipient.email,
          name: configuredRecipient.name || configuredRecipient.email,
        };
      }
    } catch {
      // D1 users are the primary source; configured users are only a fallback.
    }
  }

  if (!recipient) {
    return jsonResponse({
      error: canManageMessages(messageUser)
        ? "Choose a valid member or client recipient."
        : "Choose a valid elder, admin, or deacon recipient.",
    }, 400);
  }

  const result = await db.prepare(`
    INSERT INTO direct_messages (sender_email, sender_name, sender_role, recipient_email, recipient_name, subject, body)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    String(user.email || "").toLowerCase(),
    user.name || "Gate User",
    messageUser.display_role || messageUser.role || "member",
    recipient.email,
    recipient.name,
    subject,
    messageBody,
  ).run();

  return jsonResponse({
    message: {
      id: result.meta?.last_row_id,
      subject,
      body: messageBody,
      sender_email: user.email,
      sender_name: user.name || "Gate User",
      recipient_email: recipient.email,
      recipient_name: recipient.name,
      status: "new",
    },
  }, 201);
}

export async function onRequestPatch({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) return jsonResponse({ error: "Not signed in." }, 401);
  if (isPortalPreviewRequest(request, user)) return jsonResponse({ error: "Elder, admin, or deacon access is required." }, 403);
  if (!canManageMessages(user)) return jsonResponse({ error: "Elder, admin, or deacon access is required." }, 403);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Message update details are required." }, 400);
  }

  const id = Number(body.id || 0);
  const status = String(body.status || "").trim();
  if (!id) return jsonResponse({ error: "Choose a valid message." }, 400);
  if (!["new", "read", "archived"].includes(status)) return jsonResponse({ error: "Choose a valid message status." }, 400);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Message storage is not configured." }, 500);
  }

  await db.prepare(`
    UPDATE direct_messages
    SET status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(status, id).run();

  return jsonResponse({ message: { id, status } });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
