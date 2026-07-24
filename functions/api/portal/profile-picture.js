import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";
import { ensurePortalTables, requirePortalDb } from "../../_shared/portal-db.js";

function cleanImageData(value) {
  const imageData = String(value || "").trim();
  if (!imageData) return { value: "" };

  if (!/^data:image\/(png|jpeg|jpg|webp);base64,[a-z0-9+/=]+$/i.test(imageData)) {
    return { error: "Upload a PNG, JPG, or WebP image." };
  }

  if (imageData.length > 700000) {
    return { error: "Choose a smaller image. Profile pictures must be under 700 KB after resizing." };
  }

  return { value: imageData };
}

export async function onRequestPost({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) return jsonResponse({ error: "Not signed in." }, 401);

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Profile picture data is required." }, 400);
  }

  const cleaned = cleanImageData(body.profile_image_data);
  if (cleaned.error) return jsonResponse({ error: cleaned.error }, 400);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  await db.prepare(`
    UPDATE portal_users
    SET profile_image_data = ?, updated_at = CURRENT_TIMESTAMP
    WHERE email = ?
  `).bind(cleaned.value, user.email).run();

  return jsonResponse({ profile_image_data: cleaned.value });
}

export async function onRequestDelete({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) return jsonResponse({ error: "Not signed in." }, 401);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Gate database is not configured." }, 500);
  }

  await db.prepare(`
    UPDATE portal_users
    SET profile_image_data = '', updated_at = CURRENT_TIMESTAMP
    WHERE email = ?
  `).bind(user.email).run();

  return jsonResponse({ profile_image_data: "" });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
