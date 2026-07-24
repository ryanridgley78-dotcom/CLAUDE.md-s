import { sendZohoEmail } from "../_shared/smtp-mailer.js";
import { ensurePortalTables, requirePortalDb } from "../_shared/portal-db.js";
import {
  normalizePatriarchReferralCode,
  patriarchReferralAuthorityForCode,
} from "../_shared/patriarch-referral-codes.js";

const RECIPIENT = "ryanridgley78@gmail.com";
const QAHAL_ALERT_NAME = "Ryan Ridgley";
const PLACEHOLDER_VALUES = new Set(["", "select one"]);
const DISPOSABLE_EMAIL_DOMAINS = new Set(["immenseignite.info"]);
const APPLICATION_INTERNAL_FIELDS = new Set(["referral_token"]);

const QAHAL_REQUIRED_FIELDS = [
  "full_name",
  "email",
  "phone",
  "location",
  "best_contact_method",
  "preferred_contact_time",
  "what_drew_you",
  "referred_by_someone",
  "how_you_heard",
  "profess_faith",
  "torah_walk",
  "observe_sabbath",
  "faith_background",
  "household_status",
  "participation_interest",
  "hopes_or_contribution",
  "truthful_consent",
  "applicant_signature_name",
  "application_date",
];

const QAHAL_SELECT_OPTIONS = {
  best_contact_method: ["Email", "Phone", "Text"],
  referred_by_someone: ["Yes", "No"],
  profess_faith: ["Yes", "No", "Learning"],
  torah_walk: ["Yes", "Learning", "Not yet"],
  observe_sabbath: ["Yes", "Learning", "No"],
  household_status: ["Single", "Married", "Polygynous", "Family household", "Widow / single mother", "Other"],
  participation_interest: ["Yes", "Maybe", "Not sure yet"],
};
const APPLICATION_DOCUMENT_LIMIT_BYTES = 15 * 1024 * 1024;
const APPLICATION_DOCUMENT_TYPES = new Map([
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
const APPLICATION_DOCUMENT_EXTENSIONS = new Map([
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

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function titleize(name) {
  return String(name || "")
    .replace(/\[\]/g, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isUploadedFile(value) {
  return typeof File !== "undefined" && value instanceof File && Boolean(value.name);
}

function formatFileSize(bytes) {
  const size = Number(bytes || 0);
  if (!Number.isFinite(size) || size <= 0) return "0 bytes";
  if (size < 1024) return `${size} bytes`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function fileSummary(file) {
  return `${file.name} (${formatFileSize(file.size)})`;
}

function fieldValue(formData, name) {
  return String(formData.get(name) || "").trim();
}

function isMissingValue(value) {
  return PLACEHOLDER_VALUES.has(String(value || "").trim().toLowerCase());
}

function isValidEmail(value) {
  const email = String(value || "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return false;
  const domain = email.split("@").pop();
  return Boolean(domain) && !DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

function looksLikeRandomLetters(value) {
  const text = String(value || "").trim().toLowerCase();
  const lettersOnly = text.replace(/[^a-z]/g, "");
  if (lettersOnly.length < 8) return false;

  const words = text.split(/\s+/).filter(Boolean);
  const vowelCount = (lettersOnly.match(/[aeiou]/g) || []).length;
  const vowelRatio = vowelCount / lettersOnly.length;
  return words.length === 1 && lettersOnly.length >= 8 && vowelRatio < 0.22;
}

function validateQahalApplication(formData) {
  if (fieldValue(formData, "_website")) {
    return "Application could not be accepted.";
  }

  const missing = QAHAL_REQUIRED_FIELDS.filter((name) => isMissingValue(fieldValue(formData, name)));
  if (missing.length) {
    return "Please complete every required application section before submitting.";
  }

  if (!isValidEmail(fieldValue(formData, "email"))) {
    return "Please enter a valid email address.";
  }

  for (const [name, allowedValues] of Object.entries(QAHAL_SELECT_OPTIONS)) {
    if (!allowedValues.includes(fieldValue(formData, name))) {
      return "Please choose valid options from each section before submitting.";
    }
  }

  const connectionInterests = formData.getAll("connection_interest[]")
    .map((value) => String(value || "").trim())
    .filter(Boolean);
  if (!connectionInterests.length) {
    return "Please choose at least one connection interest.";
  }

  if (fieldValue(formData, "referred_by_someone") === "Yes" && isMissingValue(fieldValue(formData, "referral_name"))) {
    return "Please include the referral name.";
  }

  const fullName = fieldValue(formData, "full_name");
  if (fullName.split(/\s+/).filter(Boolean).length < 2 || looksLikeRandomLetters(fullName)) {
    return "Please enter your real first and last name.";
  }

  const textFields = ["location", "preferred_contact_time", "what_drew_you", "how_you_heard", "faith_background", "hopes_or_contribution"];
  const randomLooking = textFields.filter((name) => looksLikeRandomLetters(fieldValue(formData, name)));
  if (randomLooking.length >= 2) {
    return "Application could not be accepted. Please enter clear, truthful answers.";
  }

  const signature = fieldValue(formData, "applicant_signature_name");
  if (signature && signature.toLowerCase() !== fullName.toLowerCase() && looksLikeRandomLetters(signature)) {
    return "Please enter your real applicant name.";
  }

  return "";
}

function isPatriarchApplication(applicationName) {
  return String(applicationName || "").toLowerCase().includes("patriarch");
}

function applicationDocumentDetails(file) {
  if (!isUploadedFile(file)) {
    return { error: "Attach the referral letter or document before continuing." };
  }

  const fileExtension = String(file.name || "").split(".").pop().toLowerCase();
  const detectedType = APPLICATION_DOCUMENT_EXTENSIONS.get(fileExtension) || "";
  const fileType = String(file.type || detectedType || "application/octet-stream").toLowerCase();
  const extension = APPLICATION_DOCUMENT_TYPES.get(fileType) || (detectedType ? fileExtension.replace("jpeg", "jpg") : "");

  if (!extension) {
    return { error: "Upload a PDF, Word document, text file, or image for the referral letter." };
  }

  if (file.size > APPLICATION_DOCUMENT_LIMIT_BYTES) {
    return { error: "Choose a smaller referral document. Uploads must stay under 15 MB." };
  }

  return { fileType, extension };
}

function validatePatriarchReferral(formData, env) {
  const requiredFields = ["referral_code"];
  const missing = requiredFields.filter((name) => isMissingValue(fieldValue(formData, name)));
  if (missing.length) {
    return "Enter the referral code before submitting the Patriarch application.";
  }

  const referralCode = normalizePatriarchReferralCode(fieldValue(formData, "referral_code"));
  if (!patriarchReferralAuthorityForCode(referralCode, env)) {
    return "The referral code is not approved for Patriarch application access.";
  }

  const documentDetails = applicationDocumentDetails(formData.get("referral_letter"));
  if (documentDetails.error) return documentDetails.error;

  return "";
}

function applicationDocumentBucket(env) {
  const bucket = env.PORTAL_DOCUMENTS || env.FORUM_MEDIA;
  if (!bucket) {
    throw new Error("Application document storage is not configured.");
  }
  return bucket;
}

function referralDocumentPath(documentId) {
  return `/api/portal/document-file?id=${encodeURIComponent(documentId || "")}`;
}

async function storePatriarchReferralDocument(env, formData, applicantName, applicantEmail, origin) {
  const file = formData.get("referral_letter");
  const documentDetails = applicationDocumentDetails(file);
  if (documentDetails.error) {
    return { error: documentDetails.error, status: 400 };
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return { error: "Gate database is not configured.", status: 500 };
  }

  const referrerName = "";
  const referrerRole = "";
  const referrerContact = "";
  const referralCode = normalizePatriarchReferralCode(fieldValue(formData, "referral_code"));
  const codeAuthority = patriarchReferralAuthorityForCode(referralCode, env);
  const key = `application-referrals/${crypto.randomUUID()}.${documentDetails.extension}`;
  try {
    await applicationDocumentBucket(env).put(key, file.stream(), {
      httpMetadata: {
        contentType: documentDetails.fileType,
        contentDisposition: `attachment; filename="${file.name.replaceAll('"', "")}"`,
      },
      customMetadata: {
        applicationType: "Patriarch",
        applicantEmail: String(applicantEmail || "").toLowerCase(),
        codeOwner: String(codeAuthority?.name || "").slice(0, 180),
        originalName: file.name.slice(0, 180),
      },
    });
  } catch {
    return { error: "Application document storage is not configured.", status: 500 };
  }

  const applicantLabel = applicantName || applicantEmail || "Patriarch applicant";
  const description = [
    `Referral connected to Patriarch application for ${applicantLabel}.`,
  ].filter(Boolean).join(" ");

  const result = await db.prepare(`
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
    `Patriarch Referral Letter - ${applicantLabel}`.slice(0, 180),
    description,
    key,
    file.name.slice(0, 180),
    documentDetails.fileType,
    file.size,
    referrerContact,
    referrerName,
  ).run();

  const documentId = Number(result.meta?.last_row_id || 0);
  const relativeUrl = referralDocumentPath(documentId);
  const documentUrl = origin ? `${origin}${relativeUrl}` : relativeUrl;
  const referralToken = crypto.randomUUID();
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
      document_path,
      applicant_name,
      applicant_email
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    referralToken,
    referralCode,
    referrerName,
    referrerRole,
    referrerContact,
    fieldValue(formData, "referral_notes"),
    documentId,
    file.name.slice(0, 180),
    relativeUrl,
    applicantName,
    String(applicantEmail || "").toLowerCase(),
  ).run();

  const referralId = Number(referralResult.meta?.last_row_id || 0);

  return {
    referralRecord: {
      id: referralId,
      referral_token: referralToken,
      referral_code: referralCode,
      authority_name: referrerName,
      authority_role: referrerRole,
      authority_contact: referrerContact,
      referral_notes: fieldValue(formData, "referral_notes"),
      document_id: documentId,
      document_name: file.name.slice(0, 180),
      document_path: relativeUrl,
    },
    extraFields: {
      referral_record_id: referralId,
      referral_code: referralCode,
      referral_code_owner: codeAuthority?.name || "",
      referral_code_owner_role: codeAuthority?.title || "",
      referral_code_owner_source: codeAuthority?.source || "",
      referral_notes: fieldValue(formData, "referral_notes"),
      referral_document_id: documentId,
      referral_document_name: file.name.slice(0, 180),
      referral_document_size: formatFileSize(file.size),
      referral_document_path: relativeUrl,
      referral_document_url: documentUrl,
      referral_document_storage: "Stored in protected elder document library.",
    },
  };
}

async function loadPatriarchReferralRecord(env, formData) {
  const referralToken = fieldValue(formData, "referral_token");
  const referralId = Number(fieldValue(formData, "referral_record_id") || 0);
  if (!referralToken || !Number.isInteger(referralId) || referralId < 1) {
    return { error: "Connect the referral letter before submitting the Patriarch application.", status: 400 };
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return { error: "Gate database is not configured.", status: 500 };
  }

  const referral = await db.prepare(`
    SELECT
      id,
      referral_token,
      referral_code,
      authority_name,
      authority_role,
      authority_contact,
      referral_notes,
      document_id,
      document_name,
      document_path,
      application_id
    FROM patriarch_referrals
    WHERE id = ? AND referral_token = ?
  `).bind(referralId, referralToken).first();

  if (!referral) {
    return { error: "The connected Patriarch referral record was not found. Please reconnect the referral letter.", status: 400 };
  }

  return { referralRecord: referral };
}

function patriarchReferralExtraFields(referral, origin, env) {
  const relativeUrl = referral.document_path || referralDocumentPath(referral.document_id);
  const authority = patriarchReferralAuthorityForCode(referral.referral_code, env);
  return {
    referral_record_id: referral.id,
    referral_code: referral.referral_code,
    referral_code_owner: authority?.name || "",
    referral_code_owner_role: authority?.title || "",
    referral_code_owner_source: authority?.source || "",
    referral_notes: referral.referral_notes,
    referral_document_id: referral.document_id,
    referral_document_name: referral.document_name,
    referral_document_path: relativeUrl,
    referral_document_url: origin ? `${origin}${relativeUrl}` : relativeUrl,
    referral_document_storage: "Stored in protected elder document library.",
  };
}

async function updatePatriarchReferralApplication(env, referral, applicationId, applicantName, applicantEmail) {
  if (!referral?.id || !applicationId) return;

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return;
  }

  await db.prepare(`
    UPDATE patriarch_referrals
    SET
      applicant_name = ?,
      applicant_email = ?,
      application_id = ?,
      status = 'application_submitted',
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    applicantName,
    String(applicantEmail || "").toLowerCase(),
    Number(applicationId || 0),
    Number(referral.id),
  ).run();
}

function addGroupedValue(grouped, key, value) {
  const cleanKey = key.replace(/\[\]$/g, "");
  const existing = grouped.get(cleanKey);
  if (existing === value || String(existing || "").split(", ").includes(value)) return;
  grouped.set(cleanKey, existing ? `${existing}, ${value}` : value);
}

function applicationText(formData, extraFields = {}) {
  const grouped = new Map();

  for (const [key, value] of formData.entries()) {
    if (key.startsWith("_") || APPLICATION_INTERNAL_FIELDS.has(key)) continue;
    const cleanValue = isUploadedFile(value) ? fileSummary(value) : String(value || "").trim();
    if (!cleanValue) continue;

    addGroupedValue(grouped, key, cleanValue);
  }

  for (const [key, value] of Object.entries(extraFields || {})) {
    const cleanValue = String(value || "").trim();
    if (cleanValue) addGroupedValue(grouped, key, cleanValue);
  }

  return Array.from(grouped.entries())
    .map(([key, value]) => `${titleize(key)}:\n${value}`)
    .join("\n\n");
}

function splitName(fullName) {
  const parts = String(fullName || "").trim().split(/\s+/).filter(Boolean);
  return {
    first_name: parts[0] || "",
    last_name: parts.length > 1 ? parts.slice(1).join(" ") : "",
  };
}

function applicationJson(formData, extraFields = {}) {
  const data = {};
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("_") || APPLICATION_INTERNAL_FIELDS.has(key)) continue;
    const cleanValue = isUploadedFile(value) ? fileSummary(value) : String(value || "").trim();
    if (!cleanValue) continue;
    const cleanKey = key.replace(/\[\]$/g, "");
    if (data[cleanKey] === cleanValue || String(data[cleanKey] || "").split(", ").includes(cleanValue)) continue;
    if (data[cleanKey]) {
      data[cleanKey] = `${data[cleanKey]}, ${cleanValue}`;
    } else {
      data[cleanKey] = cleanValue;
    }
  }
  for (const [key, value] of Object.entries(extraFields || {})) {
    const cleanValue = String(value || "").trim();
    if (data[key] === cleanValue || String(data[key] || "").split(", ").includes(cleanValue)) continue;
    if (cleanValue) data[key] = cleanValue;
  }
  return data;
}

async function storeQahalApplication(env, formData, bodyText) {
  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return;
  }

  const fullName = String(formData.get("full_name") || formData.get("applicant_signature_name") || "").trim();
  const { first_name: parsedFirst, last_name: parsedLast } = splitName(fullName);
  const firstName = String(formData.get("first_name") || parsedFirst || "").trim();
  const lastName = String(formData.get("last_name") || parsedLast || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email || !email.includes("@")) return;

  const data = applicationJson(formData);
  await db.prepare(`
    INSERT INTO qahal_applications (
      email,
      first_name,
      last_name,
      full_name,
      phone,
      location,
      role_requested,
      application_json,
      application_text
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(email) DO UPDATE SET
      first_name = excluded.first_name,
      last_name = excluded.last_name,
      full_name = excluded.full_name,
      phone = excluded.phone,
      location = excluded.location,
      role_requested = excluded.role_requested,
      application_json = excluded.application_json,
      application_text = excluded.application_text,
      approval_status = 'pending',
      approved_at = NULL,
      approval_email_sent_at = NULL,
      updated_at = CURRENT_TIMESTAMP
  `).bind(
    email,
    firstName,
    lastName,
    fullName,
    String(formData.get("phone") || "").trim(),
    String(formData.get("location") || "").trim(),
    String(formData.get("role_requested") || "Member").trim() || "Member",
    JSON.stringify(data),
    bodyText,
  ).run();

  const applicantName = fullName || `${firstName} ${lastName}`.trim() || email;
  await db.prepare(`
    INSERT INTO direct_messages (sender_email, sender_name, sender_role, recipient_email, recipient_name, subject, body)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).bind(
    email,
    applicantName,
    "Join Qahal Application",
    String(env.QAHAL_ALERT_EMAIL || RECIPIENT).trim().toLowerCase(),
    QAHAL_ALERT_NAME,
    `Pending Join Qahal Application: ${applicantName}`,
    `A Join Qahal application is pending review.

Applicant: ${applicantName}
Email: ${email}
Role Requested: ${String(formData.get("role_requested") || "Member").trim() || "Member"}

Open the Gate management area to review the application.`,
  ).run();
}

async function storeMinistryApplication(env, formData, bodyText, applicationName, extraFields = {}) {
  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return;
  }

  const fullName = String(formData.get("full_name") || formData.get("applicant_signature_name") || "").trim();
  const { first_name: parsedFirst, last_name: parsedLast } = splitName(fullName);
  const firstName = String(formData.get("first_name") || parsedFirst || "").trim();
  const lastName = String(formData.get("last_name") || parsedLast || "").trim();
  const email = String(formData.get("email") || "").trim().toLowerCase();
  if (!email || !email.includes("@")) return;

  const location = String(
    formData.get("location") ||
    formData.get("city_state_country") ||
    formData.get("current_address") ||
    "",
  ).trim();

  const result = await db.prepare(`
    INSERT INTO ministry_applications (
      application_type,
      email,
      first_name,
      last_name,
      full_name,
      phone,
      location,
      application_json,
      application_text
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    applicationName,
    email,
    firstName,
    lastName,
    fullName,
    String(formData.get("phone") || "").trim(),
    location,
    JSON.stringify(applicationJson(formData, extraFields)),
    bodyText,
  ).run();

  return Number(result.meta?.last_row_id || 0);
}

function successHtml(applicationName) {
  return new Response(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Application Sent | YAH's Misfits</title>
    <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/styles.css">
  </head>
  <body class="inner-page">
    <header class="site-header">
      <a class="brand" href="/" aria-label="YHWH's Misfits home">
        <span class="brand-mark" aria-hidden="true">YM</span>
        <span>YHWH's Misfits</span>
      </a>
    </header>
    <main>
      <section class="connect-section connect-page">
        <h2>Application Sent</h2>
        <div class="connect-copy">
          <p>Your ${escapeHtml(applicationName)} has been sent. An elder will review it and follow up.</p>
        </div>
        <a class="button primary" href="/">Return home</a>
      </section>
    </main>
    <footer class="site-footer">
      <p>&copy; ${new Date().getFullYear()} YAH's Misfits. All rights reserved.</p>
      <a href="mailto:ryanridgley78@gmail.com">ryanridgley78@gmail.com</a>
    </footer>
  </body>
</html>`, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

export async function onRequestPost({ request, env }) {
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return new Response("Application details are required.", { status: 400 });
  }

  const applicationName = String(formData.get("application") || "Application").trim();
  const subject = String(formData.get("_subject") || `${applicationName} Submission`).trim();
  const name = String(formData.get("full_name") || formData.get("applicant_signature_name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const isQahalApplication = applicationName.toLowerCase().includes("qahal");
  const isPatriarch = isPatriarchApplication(applicationName);

  if (!name || !email || !email.includes("@")) {
    return new Response("Name and a valid email address are required.", { status: 400 });
  }

  if (isQahalApplication) {
    const validationError = validateQahalApplication(formData);
    if (validationError) {
      return new Response(validationError, { status: 400 });
    }
  }

  let extraFields = {};
  let patriarchReferralRecord = null;
  if (isPatriarch) {
    const origin = new URL(request.url).origin;
    if (fieldValue(formData, "referral_token")) {
      const referral = await loadPatriarchReferralRecord(env, formData);
      if (referral.error) {
        return new Response(referral.error, { status: referral.status || 400 });
      }
      patriarchReferralRecord = referral.referralRecord;
      extraFields = patriarchReferralExtraFields(patriarchReferralRecord, origin, env);
    } else {
      const referralError = validatePatriarchReferral(formData, env);
      if (referralError) {
        return new Response(referralError, { status: 400 });
      }

      const referralDocument = await storePatriarchReferralDocument(env, formData, name, email, origin);
      if (referralDocument.error) {
        return new Response(referralDocument.error, { status: referralDocument.status || 500 });
      }
      patriarchReferralRecord = referralDocument.referralRecord;
      extraFields = referralDocument.extraFields || {};
    }
  }

  const body = applicationText(formData, extraFields);
  let ministryApplicationId = 0;

  if (isQahalApplication) {
    await storeQahalApplication(env, formData, body);
  } else if (
    applicationName.toLowerCase().includes("widow") ||
    applicationName.toLowerCase().includes("orphan") ||
    isPatriarch
  ) {
    ministryApplicationId = await storeMinistryApplication(env, formData, body, applicationName, extraFields);
  }

  if (isPatriarch && patriarchReferralRecord) {
    await updatePatriarchReferralApplication(env, patriarchReferralRecord, ministryApplicationId, name, email);
  }

  await sendZohoEmail(env, {
    to: isQahalApplication ? String(env.QAHAL_ALERT_EMAIL || RECIPIENT).trim() : RECIPIENT,
    subject: isQahalApplication ? `Pending Join Qahal Application: ${name}` : subject,
    text: `${isQahalApplication ? `Pending Join Qahal Application: ${name}` : subject}

Submitted from yahsmisfits.com

Applicant: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}

${body}`,
  });

  return successHtml(applicationName);
}

export function onRequest() {
  return new Response("Method not allowed.", { status: 405 });
}
