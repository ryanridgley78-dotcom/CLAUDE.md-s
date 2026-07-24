import { ensurePortalTables, hasEditorAccess, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { jsonResponse } from "../../_shared/portal-auth.js";

const DEFAULT_ASSESSMENT_TITLE = "Elder-Only Widow Shepherding Assessment";

function hasElderAssessmentAccess(user) {
  return hasEditorAccess(user);
}

function cleanAssessmentInput(input) {
  const clientEmail = String(input.client_email || "").trim().toLowerCase();
  const title = String(input.title || DEFAULT_ASSESSMENT_TITLE).trim() || DEFAULT_ASSESSMENT_TITLE;
  const assessmentText = String(input.assessment_text || "").trim();
  const sendToClient = Boolean(input.send_to_client);
  const assessmentJson = input.assessment_json && typeof input.assessment_json === "object"
    ? input.assessment_json
    : {};

  if (!clientEmail || !clientEmail.includes("@")) {
    return { error: "Choose a widow before saving this assessment." };
  }

  if (!assessmentText) {
    return { error: "Complete at least one assessment field before saving." };
  }

  return {
    value: {
      client_email: clientEmail,
      title,
      assessment_text: assessmentText,
      assessment_json: assessmentJson,
      send_to_client: sendToClient,
    },
  };
}

async function getWidowClient(db, clientEmail) {
  return db.prepare(`
    SELECT client_email, client_name, account_type
    FROM client_portals
    WHERE client_email = ? AND account_type = 'Widows'
  `).bind(clientEmail).first();
}

export async function onRequestGet({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;
  if (!hasElderAssessmentAccess(editor.user)) {
    return jsonResponse({ error: "Elder or admin access is required." }, 403);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const url = new URL(request.url);
  const clientEmail = String(url.searchParams.get("client_email") || "").trim().toLowerCase();
  const title = String(url.searchParams.get("title") || DEFAULT_ASSESSMENT_TITLE).trim() || DEFAULT_ASSESSMENT_TITLE;

  if (!clientEmail) {
    return jsonResponse({ assessment: null });
  }

  const assessment = await db.prepare(`
    SELECT id, client_email, client_name, title, assessment_json, assessment_text, created_by_email,
      created_by_name, sent_to_client_at, coursework_item_id, created_at, updated_at
    FROM elder_assessments
    WHERE client_email = ? AND title = ?
    ORDER BY updated_at DESC, created_at DESC
    LIMIT 1
  `).bind(clientEmail, title).first();

  return jsonResponse({
    assessment: assessment ? {
      ...assessment,
      assessment_json: JSON.parse(assessment.assessment_json || "{}"),
    } : null,
  });
}

export async function onRequestPost({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;
  if (!hasElderAssessmentAccess(editor.user)) {
    return jsonResponse({ error: "Elder or admin access is required." }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Assessment details are required." }, 400);
  }

  const cleaned = cleanAssessmentInput(body);
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

  const assessment = cleaned.value;
  const client = await getWidowClient(db, assessment.client_email);
  if (!client) {
    return jsonResponse({ error: "Choose an active Widows client for this assessment." }, 404);
  }

  const result = await db.prepare(`
    INSERT INTO elder_assessments (
      client_email,
      client_name,
      title,
      assessment_json,
      assessment_text,
      created_by_email,
      created_by_name
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    client.client_email,
    client.client_name,
    assessment.title,
    JSON.stringify(assessment.assessment_json),
    assessment.assessment_text,
    editor.user.email,
    editor.user.name,
  ).run();

  const assessmentId = result.meta?.last_row_id || 0;
  let courseworkItemId = 0;
  let sentToClientAt = "";

  if (assessment.send_to_client) {
    const sharedInstructions = [
      `This completed widow shepherding assessment was shared by ${editor.user.name}.`,
      "",
      assessment.assessment_text,
    ].join("\n");

    const courseworkResult = await db.prepare(`
      INSERT INTO client_coursework_items (
        client_email,
        client_name,
        item_type,
        title,
        instructions
      )
      VALUES (?, ?, 'assignment', ?, ?)
    `).bind(
      client.client_email,
      client.client_name,
      "Completed Widow Shepherding Assessment",
      sharedInstructions,
    ).run();

    courseworkItemId = courseworkResult.meta?.last_row_id || 0;

    await db.prepare(`
      UPDATE elder_assessments
      SET sent_to_client_at = CURRENT_TIMESTAMP,
        coursework_item_id = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(courseworkItemId, assessmentId).run();

    const sentRecord = await db.prepare(`
      SELECT sent_to_client_at
      FROM elder_assessments
      WHERE id = ?
    `).bind(assessmentId).first();
    sentToClientAt = sentRecord?.sent_to_client_at || "";
  }

  return jsonResponse({
    assessment: {
      id: assessmentId,
      client_email: client.client_email,
      client_name: client.client_name,
      title: assessment.title,
      sent_to_client_at: sentToClientAt,
      coursework_item_id: courseworkItemId,
    },
    sent: Boolean(assessment.send_to_client),
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
