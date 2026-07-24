import { ensurePortalTables, hasEditorAccess, requirePortalDb } from "../../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../../_shared/portal-auth.js";

async function requireMensForumAccess(request, env) {
  const user = await getSessionUser(request, env);
  if (!user) return { response: jsonResponse({ error: "Not signed in." }, 401) };

  if (hasEditorAccess(user)) {
    return { user };
  }

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

  return { user, db };
}

function cleanForumMedia(input) {
  const mediaData = String(input.media_data || "").trim();
  const mediaType = String(input.media_type || "").trim().toLowerCase();
  const mediaName = String(input.media_name || "").trim().slice(0, 160);

  if (!mediaData && !mediaType && !mediaName) {
    return { value: { mediaType: "", mediaData: "", mediaName: "" } };
  }

  if (!mediaData || !mediaType) {
    return { error: "Choose a picture or video before posting the attachment." };
  }

  const protectedMediaUrl = /^\/api\/portal\/mens-forum-media\?key=mens-forum%2F[a-z0-9%._-]+$/i.test(mediaData);
  const isImage = /^data:image\/(png|jpeg|jpg|webp|gif);base64,[a-z0-9+/=]+$/i.test(mediaData);
  const isVideo = /^data:video\/(mp4|webm|ogg);base64,[a-z0-9+/=]+$/i.test(mediaData);

  if (mediaType === "image" && !isImage && !protectedMediaUrl) {
    return { error: "Upload a PNG, JPG, WebP, or GIF picture." };
  }

  if (mediaType === "video" && !isVideo && !protectedMediaUrl) {
    return { error: "Upload an MP4, WebM, or OGG video." };
  }

  if (mediaType !== "image" && mediaType !== "video") {
    return { error: "Choose either a picture or a video attachment." };
  }

  if (!protectedMediaUrl && mediaData.length > 1800000) {
    return { error: "Please reload this page and upload the attachment again." };
  }

  return { value: { mediaType, mediaData, mediaName } };
}

export async function onRequestGet({ request, env }) {
  const access = await requireMensForumAccess(request, env);
  if (access.response) return access.response;

  const db = access.db || requirePortalDb(env);
  await ensurePortalTables(db);

  const { results } = await db.prepare(`
    SELECT id, parent_post_id, title, body, media_type, media_data, media_name, author_email, author_name, created_at, updated_at
    FROM mens_forum_posts
    WHERE status = 'visible'
    ORDER BY COALESCE(parent_post_id, id) DESC, parent_post_id ASC, created_at ASC, id ASC
  `).all();

  const discussions = [];
  const discussionMap = new Map();

  for (const post of results || []) {
    if (!post.parent_post_id) {
      post.replies = [];
      discussions.push(post);
      discussionMap.set(post.id, post);
    }
  }

  for (const post of results || []) {
    if (!post.parent_post_id) continue;
    const parent = discussionMap.get(post.parent_post_id);
    if (parent) parent.replies.push(post);
  }

  return jsonResponse({ posts: discussions });
}

export async function onRequestPost({ request, env }) {
  const access = await requireMensForumAccess(request, env);
  if (access.response) return access.response;

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Forum post details are required." }, 400);
  }

  const title = String(body.title || "").trim();
  const postBody = String(body.body || "").trim();
  const parentPostId = Number(body.parent_post_id || 0);
  const media = cleanForumMedia(body);

  if (!parentPostId && !title) return jsonResponse({ error: "Add a title for the discussion." }, 400);
  if (!postBody) return jsonResponse({ error: "Add a question or comment for the discussion." }, 400);
  if (title.length > 160) return jsonResponse({ error: "Keep the title under 160 characters." }, 400);
  if (postBody.length > 6000) return jsonResponse({ error: "Keep the post under 6000 characters." }, 400);
  if (media.error) return jsonResponse({ error: media.error }, 400);

  const db = access.db || requirePortalDb(env);
  await ensurePortalTables(db);

  let replyTitle = title;
  if (parentPostId) {
    const parent = await db.prepare(`
      SELECT id, title
      FROM mens_forum_posts
      WHERE id = ? AND parent_post_id IS NULL AND status = 'visible'
    `).bind(parentPostId).first();
    if (!parent) return jsonResponse({ error: "Choose a valid discussion to reply to." }, 400);
    replyTitle = `Re: ${parent.title}`;
  }

  const result = await db.prepare(`
    INSERT INTO mens_forum_posts (parent_post_id, title, body, media_type, media_data, media_name, author_email, author_name)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    parentPostId || null,
    replyTitle,
    postBody,
    media.value.mediaType,
    media.value.mediaData,
    media.value.mediaName,
    String(access.user.email || "").toLowerCase(),
    access.user.name || "Member",
  ).run();

  return jsonResponse({
    post: {
      id: result.meta?.last_row_id,
      parent_post_id: parentPostId || null,
      title: replyTitle,
      body: postBody,
      media_type: media.value.mediaType,
      media_data: media.value.mediaData,
      media_name: media.value.mediaName,
      author_email: access.user.email,
      author_name: access.user.name || "Member",
    },
  }, 201);
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
