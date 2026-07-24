import { ensurePortalTables, requireEditor, requirePortalDb } from "../_shared/portal-db.js";
import { jsonResponse } from "../_shared/portal-auth.js";
import {
  configuredPatriarchReferralAuthorities,
  normalizePatriarchReferralCode,
  patriarchReferralAuthorityForCode,
} from "../_shared/patriarch-referral-codes.js";

const DOCUMENT_LIMIT_BYTES = 15 * 1024 * 1024;
const DOCUMENT_TYPES = new Map([
  ["application/pdf", "pdf"],
  ["application/msword", "doc"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
  ["text/plain", "txt"],
  ["text/rtf", "rtf"],
  ["application/rtf", "rtf"],
  ["image/png", "png"],
  ["image/jpeg", "jpg"],
  ["image/webp", "webp"],
]);
const DOCUMENT_EXTENSIONS = new Map([
  ["pdf", "application/pdf"],
  ["doc", "application/msword"],
  ["docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
  ["txt", "text/plain"],
  ["rtf", "application/rtf"],
  ["png", "image/png"],
  ["jpg", "image/jpeg"],
  ["jpeg", "image/jpeg"],
  ["webp", "image/webp"],
]);

function fieldValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

function isMissingValue(value) {
  return !String(value || "").trim();
}

function isUploadedFile(value) {
  return typeof File !== "undefined" && value instanceof File && Boolean(value.name);
}

function documentBucket(env) {
  const bucket = env.PORTAL_DOCUMENTS || env.FORUM_MEDIA;
  if (!bucket) {
    throw new Error("Patriarch referral document storage is not configured.");
  }
  return bucket;
}

function documentDetails(file) {
  if (!isUploadedFile(file)) {
    return { error: "Attach the referral letter or document before continuing." };
  }

  const fileExtension = String(file.name || "").split(".").pop().toLowerCase();
  const detectedType = DOCUMENT_EXTENSIONS.get(fileExtension) || "";
  const fileType = String(file.type || detectedType || "application/octet-stream").toLowerCase();
  const extension = DOCUMENT_TYPES.get(fileType) || (detectedType ? fileExtension.replace("jpeg", "jpg") : "");

  if (!extension) {
    return { error: "Upload a PDF, Word document, text file, or image for the referral letter." };
  }

  if (file.size > DOCUMENT_LIMIT_BYTES) {
    return { error: "Choose a smaller referral document. Uploads must stay under 15 MB." };
  }

  return { fileType, extension };
}

function validateReferral(formData, env) {
  const requiredFields = ["referral_code"];
  const missing = requiredFields.filter((name) => isMissingValue(fieldValue(formData, name)));
  if (missing.length) {
    return "Enter the referral code before opening the Patriarch application.";
  }

  const referralCode = normalizePatriarchReferralCode(fieldValue(formData, "referral_code"));
  if (!patriarchReferralAuthorityForCode(referralCode, env)) {
    return "The referral code is not approved for Patriarch application access.";
  }

  const details = documentDetails(formData.get("referral_letter"));
  if (details.error) return details.error;

  return "";
}

function referralDocumentPath(documentId) {
  return `/api/portal/document-file?id=${encodeURIComponent(documentId || "")}`;
}

function referralPayload(row, env) {
  const authority = patriarchReferralAuthorityForCode(row.referral_code, env);
  return {
    ...row,
    document_path: row.document_path || referralDocumentPath(row.document_id),
    code_owner_name: authority?.name || "",
    code_owner_title: authority?.title || "",
    code_owner_source: authority?.source || "",
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
    SELECT
      pr.id,
      pr.referral_code,
      pr.authority_name,
      pr.authority_role,
      pr.authority_contact,
      pr.referral_notes,
      pr.document_id,
      pr.document_name,
      pr.document_path,
      pr.applicant_name,
      pr.applicant_email,
      pr.application_id,
      pr.status,
      pr.created_at,
      pr.updated_at,
      ma.submitted_at AS application_submitted_at
    FROM patriarch_referrals pr
    LEFT JOIN ministry_applications ma ON ma.id = pr.application_id
    ORDER BY pr.updated_at DESC, pr.created_at DESC
    LIMIT 200
  `).all();

  return jsonResponse({
    authorized_referrers: configuredPatriarchReferralAuthorities(env),
    referrals: (results || []).map((row) => referralPayload(row, env)),
  });
}

export async function onRequestPost({ request, env }) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Referral details are required." }, 400);
  }

  const validationError = validateReferral(formData, env);
  if (validationError) {
    return jsonResponse({ error: validationError }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const file = formData.get("referral_letter");
  const details = documentDetails(file);
  if (details.error) {
    return jsonResponse({ error: details.error }, 400);
  }

  const referrerName = "";
  const referrerRole = "";
  const referrerContact = "";
  const referralCode = normalizePatriarchReferralCode(fieldValue(formData, "referral_code"));
  const codeAuthority = patriarchReferralAuthorityForCode(referralCode, env);
  const referralNotes = fieldValue(formData, "referral_notes");
  const token = crypto.randomUUID();
  const key = `application-referrals/${crypto.randomUUID()}.${details.extension}`;

  try {
    await documentBucket(env).put(key, file.stream(), {
      httpMetadata: {
        contentType: details.fileType,
        contentDisposition: `attachment; filename="${file.name.replaceAll('"', "")}"`,
      },
      customMetadata: {
        referralCode,
        codeOwner: String(codeAuthority?.name || "").slice(0, 180),
        originalName: file.name.slice(0, 180),
      },
    });
  } catch {
    return jsonResponse({ error: "Patriarch referral document storage is not configured." }, 500);
  }

  const documentResult = await db.prepare(`
    INSERT INTO portal_documents (
      title,
      description,
      document_scope,
      client_email,
      client_name,
      file_key,
      file_name,
      file_type,
      file_size,
      uploaded_by_email,
      uploaded_by_name
    )
    VALUES (?, ?, 'library', '', '', ?, ?, ?, ?, ?, ?)
  `).bind(
    `Patriarch Referral Letter - ${referralCode}`.slice(0, 180),
    `Referral code: ${referralCode}.`,
    key,
    file.name.slice(0, 180),
    details.fileType,
    file.size,
    referrerContact,
    referrerName,
  ).run();

  const documentId = Number(documentResult.meta?.last_row_id || 0);
  const documentPath = referralDocumentPath(documentId);

  const referralResult = await db.prepare(`
    INSERT INTO patriarch_referrals (
      referral_token,
      referral_code,
      authority_name,
      authority_role,
      authority_contact,
      referral_notes,
      document_id,
      document_name,
      document_path
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    token,
    referralCode,
    referrerName,
    referrerRole,
    referrerContact,
    referralNotes,
    documentId,
    file.name.slice(0, 180),
    documentPath,
  ).run();

  const referralId = Number(referralResult.meta?.last_row_id || 0);
  return jsonResponse({
    authorized_referrers: configuredPatriarchReferralAuthorities(env),
    referral: {
      id: referralId,
      token,
      referral_code: referralCode,
      code_owner_name: codeAuthority?.name || "",
      code_owner_title: codeAuthority?.title || "",
      code_owner_source: codeAuthority?.source || "",
      authority_name: referrerName,
      document_name: file.name.slice(0, 180),
      document_path: documentPath,
      status: "referral_connected",
    },
  }, 201);
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
