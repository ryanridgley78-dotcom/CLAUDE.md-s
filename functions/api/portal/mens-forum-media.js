import { ensurePortalTables, hasEditorAccess, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

const MEDIA_LIMITS = {
  image: { maxBytes: 10 * 1024 * 1024, label: "10 MB" },
  video: { maxBytes: 30 * 1024 * 1024, label: "30 MB" },
};

const MEDIA_TYPES = new Map([
  ["image/png", { kind: "image", extension: "png" }],
  ["image/jpeg", { kind: "image", extension: "jpg" }],
  ["image/webp", { kind: "image", extension: "webp" }],
  ["image/gif", { kind: "image", extension: "gif" }],
  ["video/mp4", { kind: "video", extension: "mp4" }],
  ["video/webm", { kind: "video", extension: "webm" }],
  ["video/ogg", { kind: "video", extension: "ogg" }],
]);

async function requireMensForumAccess(request, env) {
  const user = await getSessionUser(request, env);
  if (!user) return { response: jsonResponse({ error: "Not signed in." }, 401) };

  if (hasEditorAccess(user)) return { user };

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return { response: jsonResponse({ error: "Gate database is not configured." }, 500) };
  }

  const record = await db.prepare(`
    SELECT mens_forum_approved
    FROM portal_users
    WHERE email = ? AND status = 'active'
  `).bind(String(user.email || "").toLowerCase()).first();

  if (!record?.mens_forum_approved) {
    return { response: jsonResponse({ error: "Men's Forum access has not been approved for this account." }, 403) };
  }

  return { user };
}

function forumMediaBucket(env) {
  if (!env.FORUM_MEDIA) {
    throw new Error("Forum media storage is not configured.");
  }
  return env.FORUM_MEDIA;
}

export async function onRequestGet({ request, env }) {
  const access = await requireMensForumAccess(request, env);
  if (access.response) return access.response;

  const key = new URL(request.url).searchParams.get("key") || "";
  if (!/^mens-forum\/[a-z0-9._-]+$/i.test(key)) {
    return jsonResponse({ error: "Media file not found." }, 404);
  }

  let object;
  try {
    object = await forumMediaBucket(env).get(key);
  } catch {
    return jsonResponse({ error: "Forum media storage is not configured." }, 500);
  }

  if (!object) return jsonResponse({ error: "Media file not found." }, 404);

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("cache-control", "private, max-age=3600");
  headers.set("content-disposition", "inline");
  if (object.httpEtag) headers.set("etag", object.httpEtag);
  return new Response(object.body, { headers });
}

export async function onRequestPost({ request, env }) {
  const access = await requireMensForumAccess(request, env);
  if (access.response) return access.response;

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return jsonResponse({ error: "Choose a picture or video file." }, 400);
  }

  const file = formData.get("file");
  if (!(file instanceof File) || !file.name) {
    return jsonResponse({ error: "Choose a picture or video file." }, 400);
  }

  const media = MEDIA_TYPES.get(String(file.type || "").toLowerCase());
  if (!media) {
    return jsonResponse({ error: "Upload a PNG, JPG, WebP, GIF, MP4, WebM, or OGG file." }, 400);
  }

  const limit = MEDIA_LIMITS[media.kind];
  if (file.size > limit.maxBytes) {
    return jsonResponse({ error: `Choose a smaller ${media.kind}. Attachments must stay under ${limit.label}.` }, 400);
  }

  const key = `mens-forum/${crypto.randomUUID()}.${media.extension}`;
  try {
    await forumMediaBucket(env).put(key, file.stream(), {
      httpMetadata: { contentType: file.type },
      customMetadata: {
        uploadedBy: String(access.user.email || "").toLowerCase(),
        originalName: file.name.slice(0, 160),
      },
    });
  } catch {
    return jsonResponse({ error: "Forum media storage is not configured." }, 500);
  }

  return jsonResponse({
    media_type: media.kind,
    media_data: `/api/portal/mens-forum-media?key=${encodeURIComponent(key)}`,
    media_name: file.name.slice(0, 160),
  }, 201);
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
