import { connect } from "cloudflare:sockets";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function encodeBase64(value) {
  return btoa(unescape(encodeURIComponent(value)));
}

function escapeSmtpData(value) {
  return String(value).replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..");
}

function headerSafe(value) {
  return String(value || "").replace(/[\r\n]/g, " ").trim();
}

function quotedDisplayName(value) {
  const name = headerSafe(value);
  if (!name) return "";
  return `"${name.replaceAll("\\", "\\\\").replaceAll('"', '\\"')}"`;
}

function extractEmailAddress(value) {
  const text = headerSafe(value);
  const bracketedAddress = text.match(/<([^<>@\s]+@[^<>@\s]+)>/);
  if (bracketedAddress) return bracketedAddress[1].trim();
  return text;
}

function formatMailbox(name, email) {
  const address = extractEmailAddress(email);
  const displayName = quotedDisplayName(name);
  return displayName ? `${displayName} <${address}>` : address;
}

function messageId(from) {
  const domain = String(extractEmailAddress(from).split("@")[1] || "yahsmisfits.com").toLowerCase();
  const id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `<${id}@${domain}>`;
}

async function readResponse(reader) {
  let text = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    text += decoder.decode(value, { stream: true });
    const lines = text.split(/\r?\n/).filter(Boolean);
    const lastLine = lines.at(-1) || "";
    if (/^\d{3} /.test(lastLine)) {
      return { code: Number(lastLine.slice(0, 3)), text };
    }
  }

  return { code: 0, text };
}

async function writeCommand(writer, command) {
  await writer.write(encoder.encode(`${command}\r\n`));
}

async function expect(reader, code, label) {
  const response = await readResponse(reader);
  if (response.code !== code) {
    throw new Error(`${label} failed: ${response.text.trim() || "No SMTP response"}`);
  }
  return response;
}

export async function sendZohoEmail(env, { to, subject, text, fromName, replyTo }) {
  const hostname = env.ZOHO_SMTP_HOST || "smtp.zoho.com";
  const port = Number(env.ZOHO_SMTP_PORT || 465);
  const username = env.ZOHO_SMTP_USER;
  const password = env.ZOHO_SMTP_PASSWORD;
  const from = extractEmailAddress(env.ZOHO_SMTP_FROM || username);
  const replyToAddress = replyTo || env.ZOHO_REPLY_TO || from;
  const displayName = fromName || env.ZOHO_SMTP_FROM_NAME || "YAH's Misfits";

  if (!username || !password || !from) {
    throw new Error("Zoho SMTP secrets are not configured.");
  }

  const socket = connect({ hostname, port }, { secureTransport: "on" });
  const reader = socket.readable.getReader();
  const writer = socket.writable.getWriter();

  try {
    await expect(reader, 220, "SMTP greeting");
    await writeCommand(writer, "EHLO yahsmisfits.com");
    await expect(reader, 250, "EHLO");
    await writeCommand(writer, "AUTH LOGIN");
    await expect(reader, 334, "AUTH LOGIN");
    await writeCommand(writer, encodeBase64(username));
    await expect(reader, 334, "SMTP username");
    await writeCommand(writer, encodeBase64(password));
    await expect(reader, 235, "SMTP password");
    await writeCommand(writer, `MAIL FROM:<${from}>`);
    await expect(reader, 250, "MAIL FROM");
    await writeCommand(writer, `RCPT TO:<${to}>`);
    await expect(reader, 250, "RCPT TO");
    await writeCommand(writer, "DATA");
    await expect(reader, 354, "DATA");

    const message = [
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: ${messageId(from)}`,
      `From: ${formatMailbox(displayName, from)}`,
      `To: ${headerSafe(to)}`,
      `Reply-To: ${formatMailbox(displayName, replyToAddress)}`,
      `Subject: ${headerSafe(subject)}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "Content-Transfer-Encoding: 8bit",
      "Auto-Submitted: auto-generated",
      "X-Auto-Response-Suppress: All",
      "Importance: normal",
      "X-Mailer: YAH's Misfits Gate",
      "",
      escapeSmtpData(text),
      ".",
    ].join("\r\n");

    await writeCommand(writer, message);
    await expect(reader, 250, "Message send");
    await writeCommand(writer, "QUIT");
    await readResponse(reader).catch(() => null);
  } finally {
    await writer.releaseLock();
    reader.releaseLock();
    await socket.close().catch(() => null);
  }
}
