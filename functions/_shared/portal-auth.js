const SESSION_COOKIE = "ym_portal_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;
const encoder = new TextEncoder();

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

function timingSafeEqual(left, right) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) {
    diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return diff === 0;
}

function randomBytes(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

async function hmacKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

async function pbkdf2Key(password) {
  return crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
}

export function jsonResponse(payload, status = 200, headers = {}) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...headers,
    },
  });
}

export function getCookie(request, name) {
  const cookieHeader = request.headers.get("cookie") || "";
  const cookies = cookieHeader.split(";").map((cookie) => cookie.trim());
  const match = cookies.find((cookie) => cookie.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

export function clearSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}

export function readUsers(env) {
  if (!env.PORTAL_USERS_JSON) return [];
  const users = JSON.parse(env.PORTAL_USERS_JSON);
  if (!Array.isArray(users)) throw new Error("PORTAL_USERS_JSON must be an array.");
  return users.map((user) => ({ ...user, email: String(user.email || "").toLowerCase() }));
}

export async function hashPassword(password) {
  const iterations = 100000;
  const salt = randomBytes(16);
  const key = await pbkdf2Key(password);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt,
      iterations,
    },
    key,
    256,
  );

  return {
    iterations,
    salt: bytesToBase64Url(salt),
    hash: bytesToBase64Url(new Uint8Array(bits)),
  };
}

export async function verifyPassword(password, passwordRecord) {
  if (!passwordRecord?.salt || !passwordRecord?.hash) return false;

  const iterations = Number(passwordRecord.iterations || 210000);
  const key = await pbkdf2Key(password);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: base64UrlToBytes(passwordRecord.salt),
      iterations,
    },
    key,
    256,
  );

  return timingSafeEqual(bytesToBase64Url(new Uint8Array(bits)), passwordRecord.hash);
}

export async function createSessionCookie(env, user) {
  if (!env.PORTAL_SESSION_SECRET) throw new Error("PORTAL_SESSION_SECRET is required.");

  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = bytesToBase64Url(
    encoder.encode(JSON.stringify({
      email: user.email,
      name: user.name,
      role: user.role,
      display_role: user.display_role || "",
      exp: expiresAt,
    })),
  );
  const key = await hmacKey(env.PORTAL_SESSION_SECRET);
  const signature = bytesToBase64Url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(payload))));

  return `${SESSION_COOKIE}=${payload}.${signature}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_TTL_SECONDS}`;
}

export async function getSessionUser(request, env) {
  if (!env.PORTAL_SESSION_SECRET) return null;

  const session = getCookie(request, SESSION_COOKIE);
  const [payload, signature] = session.split(".");
  if (!payload || !signature) return null;

  const key = await hmacKey(env.PORTAL_SESSION_SECRET);
  const valid = await crypto.subtle.verify("HMAC", key, base64UrlToBytes(signature), encoder.encode(payload));
  if (!valid) return null;

  const user = JSON.parse(new TextDecoder().decode(base64UrlToBytes(payload)));
  if (!user.exp || user.exp < Math.floor(Date.now() / 1000)) return null;

  return {
    email: user.email,
    name: user.name,
    role: user.role,
    display_role: user.display_role || "",
  };
}
