import { ensurePortalTables, hasEditorAccess, requireEditor, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

const LIVE_STREAM_KEY = "live_stream_schedule_enabled";
const LIVE_STREAM_URL = "https://us06web.zoom.us/j/89436760315";
const LIVE_STREAM_TIME_ZONE = "America/New_York";
const LIVE_STREAM_ACTIVE_WEEKDAY = "Sat";
const LIVE_STREAM_ACTIVE_START_MINUTE = (14 * 60) + 45;
const LIVE_STREAM_ACTIVE_END_MINUTE = (15 * 60) + 45;

async function readLiveStreamSetting(db) {
  const row = await db.prepare(`
    SELECT setting_value
    FROM site_settings
    WHERE setting_key = ?
  `).bind(LIVE_STREAM_KEY).first();

  return row ? row.setting_value === "true" : true;
}

function easternTimeParts(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: LIVE_STREAM_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  return {
    hour: Number(parts.find((part) => part.type === "hour")?.value),
    minute: Number(parts.find((part) => part.type === "minute")?.value),
  };
}

function easternWeekday(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: LIVE_STREAM_TIME_ZONE,
    weekday: "short",
  }).format(date);
}

function hasAlwaysAvailableAccess(user) {
  return hasEditorAccess(user);
}

function liveStreamPayload(user, scheduleEnabled) {
  const { hour, minute } = easternTimeParts();
  const currentMinute = (hour * 60) + minute;
  const activeNow = easternWeekday() === LIVE_STREAM_ACTIVE_WEEKDAY &&
    currentMinute >= LIVE_STREAM_ACTIVE_START_MINUTE &&
    currentMinute < LIVE_STREAM_ACTIVE_END_MINUTE;
  const alwaysAvailable = Boolean(user && hasAlwaysAvailableAccess(user));
  const visible = Boolean(user && scheduleEnabled);
  const enabled = Boolean(visible && (alwaysAvailable || activeNow));
  return {
    enabled,
    visible,
    clickable: enabled,
    active: activeNow,
    always_available: alwaysAvailable,
    schedule_enabled: Boolean(scheduleEnabled),
    url: LIVE_STREAM_URL,
    time_zone: LIVE_STREAM_TIME_ZONE,
    starts_at: "Saturdays at 2:45 PM Eastern",
    active_window: "Saturdays, 2:45-3:44 PM Eastern",
  };
}

export async function onRequestGet({ request, env }) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return jsonResponse(liveStreamPayload(null, false));
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ enabled: false });
  }

  const enabled = await readLiveStreamSetting(db);
  return jsonResponse(liveStreamPayload(user, enabled));
}

export async function onRequestPost({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Live stream setting is required." }, 400);
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
  `).bind(LIVE_STREAM_KEY, enabled ? "true" : "false").run();

  return jsonResponse(liveStreamPayload(editor.user, enabled));
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
