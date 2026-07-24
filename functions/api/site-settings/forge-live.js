import { ensurePortalTables, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

const FORGE_LIVE_KEY = "forge_live_enabled";

async function readForgeLiveSetting(db) {
  const row = await db.prepare(`
    SELECT setting_value
    FROM site_settings
    WHERE setting_key = ?
  `).bind(FORGE_LIVE_KEY).first();

  return row?.setting_value === "true";
}

export async function onRequestGet({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse({ enabled: false });
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ enabled: false });
  }

  const enabled = await readForgeLiveSetting(db);
  return jsonResponse({ enabled });
}

export async function onRequestPost({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Forge Live setting is required." }, 400);
  }

  const enabled = Boolean(body.enabled);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Portal database is not configured." }, 500);
  }

  await db.prepare(`
    INSERT INTO site_settings (setting_key, setting_value)
    VALUES (?, ?)
    ON CONFLICT(setting_key) DO UPDATE SET
      setting_value = excluded.setting_value,
      updated_at = CURRENT_TIMESTAMP
  `).bind(FORGE_LIVE_KEY, enabled ? "true" : "false").run();

  return jsonResponse({ enabled });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
