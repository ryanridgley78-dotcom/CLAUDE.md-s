import { ensurePortalTables, requirePortalDb } from "../_shared/portal-db.js";
import { jsonResponse } from "../_shared/portal-auth.js";

function cleanComment(input) {
  const postId = Number(input.post_id || 0);
  const parentCommentId = Number(input.parent_comment_id || 0);
  const commenterName = String(input.commenter_name || "").trim().slice(0, 80);
  const body = String(input.body || "").trim().slice(0, 1200);

  if (!Number.isInteger(postId) || postId < 1) {
    return { error: "Blog post is required." };
  }

  if (!body) {
    return { error: "Write a comment before submitting." };
  }

  return {
    value: {
      post_id: postId,
      parent_comment_id: Number.isInteger(parentCommentId) && parentCommentId > 0 ? parentCommentId : null,
      commenter_name: commenterName || "Anonymous",
      body,
    },
  };
}

async function requirePublishedPost(db, postId) {
  return db.prepare(`
    SELECT id
    FROM blog_posts
    WHERE id = ? AND status = 'published'
    LIMIT 1
  `).bind(postId).first();
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const postId = Number(url.searchParams.get("post_id") || 0);
  if (!Number.isInteger(postId) || postId < 1) {
    return jsonResponse({ error: "Blog post is required." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Blog database is not configured." }, 500);
  }

  const post = await requirePublishedPost(db, postId);
  if (!post) return jsonResponse({ error: "Blog post not found." }, 404);

  const reaction = await db.prepare(`
    SELECT hearts_count
    FROM blog_post_reactions
    WHERE post_id = ?
  `).bind(postId).first();

  const { results } = await db.prepare(`
    SELECT id, post_id, parent_comment_id, commenter_name, body, created_at
    FROM blog_post_comments
    WHERE post_id = ? AND status = 'visible'
    ORDER BY
      COALESCE(parent_comment_id, id) DESC,
      CASE WHEN parent_comment_id IS NULL THEN 0 ELSE 1 END,
      created_at ASC,
      id ASC
    LIMIT 100
  `).bind(postId).all();

  return jsonResponse({
    hearts_count: Number(reaction?.hearts_count || 0),
    comments: results || [],
  });
}

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Interaction details are required." }, 400);
  }

  const action = String(body.action || "").trim().toLowerCase();
  const postId = Number(body.post_id || 0);
  if (!Number.isInteger(postId) || postId < 1) {
    return jsonResponse({ error: "Blog post is required." }, 400);
  }

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Blog database is not configured." }, 500);
  }

  const post = await requirePublishedPost(db, postId);
  if (!post) return jsonResponse({ error: "Blog post not found." }, 404);

  if (action === "heart") {
    await db.prepare(`
      INSERT INTO blog_post_reactions (post_id, hearts_count, updated_at)
      VALUES (?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(post_id) DO UPDATE SET
        hearts_count = hearts_count + 1,
        updated_at = CURRENT_TIMESTAMP
    `).bind(postId).run();

    const reaction = await db.prepare(`
      SELECT hearts_count
      FROM blog_post_reactions
      WHERE post_id = ?
    `).bind(postId).first();

    return jsonResponse({ hearts_count: Number(reaction?.hearts_count || 0) });
  }

  if (action === "comment") {
    const cleaned = cleanComment(body);
    if (cleaned.error) return jsonResponse({ error: cleaned.error }, 400);
    const comment = cleaned.value;

    if (comment.parent_comment_id) {
      const parent = await db.prepare(`
        SELECT id
        FROM blog_post_comments
        WHERE id = ? AND post_id = ? AND parent_comment_id IS NULL AND status = 'visible'
        LIMIT 1
      `).bind(comment.parent_comment_id, comment.post_id).first();

      if (!parent) {
        return jsonResponse({ error: "The comment being replied to could not be found." }, 404);
      }
    }

    const result = await db.prepare(`
      INSERT INTO blog_post_comments (post_id, parent_comment_id, commenter_name, body)
      VALUES (?, ?, ?, ?)
    `).bind(comment.post_id, comment.parent_comment_id, comment.commenter_name, comment.body).run();

    return jsonResponse({
      comment: {
        id: result.meta?.last_row_id,
        parent_comment_id: comment.parent_comment_id,
        commenter_name: comment.commenter_name,
        body: comment.body,
      },
    });
  }

  return jsonResponse({ error: "Choose a valid interaction." }, 400);
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
