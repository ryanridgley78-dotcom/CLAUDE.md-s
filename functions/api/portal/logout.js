import { clearSessionCookie, jsonResponse } from "../../_shared/portal-auth.js";

export function onRequestPost() {
  return jsonResponse({ ok: true }, 200, { "set-cookie": clearSessionCookie() });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
