import { ensurePortalTables, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

const US_STATES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "DC",
]);

export async function onRequestPatch({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) return jsonResponse({ error: "Not signed in." }, 401);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Profile details are required." }, 400);
  }

  const publicLocationEnabled = Boolean(body.public_location_enabled);
  const publicLocationState = String(body.public_location_state || "").trim().toUpperCase();

  if (publicLocationEnabled && !US_STATES.has(publicLocationState)) {
    return jsonResponse({ error: "Choose a valid public state." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  await db.prepare(`
    UPDATE portal_users
    SET public_location_state = ?, public_location_enabled = ?, updated_at = CURRENT_TIMESTAMP
    WHERE email = ?
  `).bind(
    publicLocationEnabled ? publicLocationState : "",
    publicLocationEnabled ? 1 : 0,
    user.email,
  ).run();

  return jsonResponse({
    public_location_state: publicLocationEnabled ? publicLocationState : "",
    public_location_enabled: publicLocationEnabled,
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
