import { ensurePortalTables, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

const DIRECTORY_ROLE_LABELS = {
  admin: "Admin",
  editor: "Editor",
  elder: "Elder",
  member: "Member",
};

export async function onRequestGet({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ error: "Not signed in." }, 401);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  const { results } = await db.prepare(`
    SELECT email, name, role, display_role, profile_image_data, public_location_state, public_location_enabled
    FROM portal_users
    WHERE status = 'active'
      AND role IN ('admin', 'editor', 'elder', 'member')
      AND LOWER(COALESCE(name, '') || ' ' || COALESCE(email, '')) NOT LIKE '%test client%'
      AND LOWER(REPLACE(COALESCE(name, '') || COALESCE(email, ''), ' ', '')) NOT LIKE '%testclient%'
    ORDER BY name ASC, email ASC
  `).all();

  return jsonResponse({
    members: (results || []).map((member) => ({
      name: member.name,
      display_role: member.display_role || DIRECTORY_ROLE_LABELS[member.role] || "Member",
      profile_image_data: member.profile_image_data || "",
      public_location_state: member.public_location_enabled ? member.public_location_state || "" : "",
    })),
  });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
