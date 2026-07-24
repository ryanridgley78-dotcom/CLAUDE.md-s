import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";
import { ensurePortalTables, requirePortalDb } from "../../_shared/portal-db.js";

export async function onRequestGet({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Not signed in." }, 401);
  }

  try {
    const db = requirePortalDb(env);
    await ensurePortalTables(db);
    const freshUser = await db.prepare(`
      SELECT email, name, role, display_role, status, profile_image_data, public_location_state, public_location_enabled, mens_forum_approved
      FROM portal_users
      WHERE email = ?
    `).bind(user.email).first();

    if (freshUser && freshUser.status !== "disabled") {
      return jsonResponse({
        user: {
          email: freshUser.email,
          name: freshUser.name,
          role: freshUser.role,
          display_role: freshUser.display_role || "",
          profile_image_data: freshUser.profile_image_data || "",
          public_location_state: freshUser.public_location_state || "",
          public_location_enabled: Boolean(freshUser.public_location_enabled),
          mens_forum_approved: Boolean(freshUser.mens_forum_approved),
        },
      });
    }
  } catch {
    // Fall back to the signed session when the database is unavailable.
  }

  return jsonResponse({ user });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
