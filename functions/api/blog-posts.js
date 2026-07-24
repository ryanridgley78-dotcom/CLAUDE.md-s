import {
  cleanBlogPost,
  ensurePortalTables,
  requireEditor,
  requirePortalDb,
  slugify,
} from "../_shared/portal-db.js";
import { getSessionUser, jsonResponse } from "../_shared/portal-auth.js";

const BLOG_MANAGERS = [
  { email: "ryanridgley78@gmail.com", name: "Ryan Ridgley" },
  { email: "restoringthekingdom2as1@gmail.com", name: "Jared Cheshire" },
];

function blogManagerForUser(user) {
  if (!user) return null;
  const email = String(user.email || "").toLowerCase();
  const name = String(user.name || "").trim();
  if (user.role === "admin") {
    return {
      email,
      name: name || "Admin",
      canManageAll: true,
    };
  }
  const manager = BLOG_MANAGERS.find((entry) => entry.email === email && entry.name === name);
  return manager ? { ...manager, canManageAll: false } : null;
}

function publicBlogPost(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    post_type: row.post_type || "internal",
    external_url: row.external_url || "",
    source_name: row.source_name || "",
    status: row.status,
    author_name: row.author_name,
    published_at: row.published_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

async function uniqueSlug(db, baseSlug, postId = 0) {
  const base = slugify(baseSlug);
  let nextSlug = base;
  let suffix = 2;

  while (true) {
    const existing = await db.prepare(`
      SELECT id
      FROM blog_posts
      WHERE slug = ? AND id != ?
      LIMIT 1
    `).bind(nextSlug, postId).first();

    if (!existing) return nextSlug;
    nextSlug = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function onRequestGet({ request, env }) {
  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Blog database is not configured." }, 500);
  }

  const url = new URL(request.url);
  const slug = String(url.searchParams.get("slug") || "").trim();
  const includeAll = url.searchParams.get("include") === "all";
  const authorEmail = String(url.searchParams.get("author_email") || "").trim().toLowerCase();
  const user = await getSessionUser(request, env);
  const manager = blogManagerForUser(user);

  if (includeAll && !manager) {
    return jsonResponse({ error: "Blog management is restricted to approved blog editors." }, 403);
  }

  if (slug) {
    const filters = ["slug = ?"];
    const bindings = [slug];
    if (!(manager && includeAll)) {
      filters.push("status = 'published'");
    }
    if (authorEmail) {
      filters.push("LOWER(author_email) = ?");
      bindings.push(authorEmail);
    }

    const post = await db.prepare(`
      SELECT id, slug, post_type, title, excerpt, body, external_url, source_name, status, author_name, author_email, published_at, created_at, updated_at
      FROM blog_posts
      WHERE ${filters.join(" AND ")}
      LIMIT 1
    `).bind(...bindings).first();

    if (!post) return jsonResponse({ error: "Blog post not found." }, 404);
    return jsonResponse({ post: publicBlogPost(post) });
  }

  let results;
  if (includeAll && manager.canManageAll && authorEmail) {
    ({ results } = await db.prepare(`
        SELECT id, slug, post_type, title, excerpt, body, external_url, source_name, status, author_name, author_email, published_at, created_at, updated_at
        FROM blog_posts
        WHERE LOWER(author_email) = ?
        ORDER BY updated_at DESC, created_at DESC
      `).bind(authorEmail).all());
  } else if (includeAll && manager.canManageAll) {
    ({ results } = await db.prepare(`
        SELECT id, slug, post_type, title, excerpt, body, external_url, source_name, status, author_name, author_email, published_at, created_at, updated_at
        FROM blog_posts
        ORDER BY updated_at DESC, created_at DESC
      `).all());
  } else if (includeAll) {
    ({ results } = await db.prepare(`
        SELECT id, slug, post_type, title, excerpt, body, external_url, source_name, status, author_name, author_email, published_at, created_at, updated_at
        FROM blog_posts
        WHERE LOWER(author_email) = ?
        ORDER BY updated_at DESC, created_at DESC
      `).bind(manager.email).all());
  } else if (authorEmail) {
    ({ results } = await db.prepare(`
        SELECT id, slug, post_type, title, excerpt, body, external_url, source_name, status, author_name, author_email, published_at, created_at, updated_at
        FROM blog_posts
        WHERE status = 'published' AND LOWER(author_email) = ?
        ORDER BY COALESCE(published_at, created_at) DESC, created_at DESC
      `).bind(authorEmail).all());
  } else {
    ({ results } = await db.prepare(`
        SELECT id, slug, post_type, title, excerpt, body, external_url, source_name, status, author_name, author_email, published_at, created_at, updated_at
        FROM blog_posts
        WHERE status = 'published'
        ORDER BY COALESCE(published_at, created_at) DESC, created_at DESC
      `).all());
  }

  return jsonResponse({ posts: (results || []).map(publicBlogPost) });
}

export async function onRequestPost({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;
  const manager = blogManagerForUser(editor.user);
  if (!manager) {
    return jsonResponse({ error: "Blog management is restricted to approved blog editors." }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Blog post details are required." }, 400);
  }

  const cleaned = cleanBlogPost(body);
  if (cleaned.error) return jsonResponse({ error: cleaned.error }, 400);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Blog database is not configured." }, 500);
  }

  const post = cleaned.value;
  post.slug = await uniqueSlug(db, post.slug);

  const result = await db.prepare(`
    INSERT INTO blog_posts (slug, post_type, title, excerpt, body, external_url, source_name, status, author_name, author_email, published_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CASE WHEN ? = 'published' THEN CURRENT_TIMESTAMP ELSE NULL END)
  `).bind(
    post.slug,
    post.post_type,
    post.title,
    post.excerpt,
    post.body,
    post.external_url,
    post.source_name,
    post.status,
    manager.name,
    manager.email,
    post.status,
  ).run();

  return jsonResponse({
    post: {
      ...post,
      id: result.meta?.last_row_id,
      author_name: manager.name,
      author_email: manager.email,
    },
  });
}

export async function onRequestPut({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;
  const manager = blogManagerForUser(editor.user);
  if (!manager) {
    return jsonResponse({ error: "Blog management is restricted to approved blog editors." }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Blog post details are required." }, 400);
  }

  const cleaned = cleanBlogPost(body);
  if (cleaned.error) return jsonResponse({ error: cleaned.error }, 400);

  const post = cleaned.value;
  if (!post.id) return jsonResponse({ error: "Blog post id is required." }, 400);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Blog database is not configured." }, 500);
  }

  const existing = await db.prepare(`
    SELECT id, status, published_at, author_name, author_email
    FROM blog_posts
    WHERE id = ?
  `).bind(post.id).first();

  if (!existing) return jsonResponse({ error: "Blog post not found." }, 404);
  if (!manager.canManageAll && String(existing.author_email || "").toLowerCase() !== manager.email) {
    return jsonResponse({ error: "You can only edit your own blog posts." }, 403);
  }

  post.slug = await uniqueSlug(db, post.slug, post.id);
  const shouldPublishNow = post.status === "published" && !existing.published_at;
  const authorName = manager.canManageAll ? (existing.author_name || manager.name) : manager.name;
  const authorEmail = manager.canManageAll ? (existing.author_email || manager.email) : manager.email;

  await db.prepare(`
    UPDATE blog_posts
    SET
      slug = ?,
      post_type = ?,
      title = ?,
      excerpt = ?,
      body = ?,
      external_url = ?,
      source_name = ?,
      status = ?,
      author_name = ?,
      author_email = ?,
      published_at = CASE
        WHEN ? THEN CURRENT_TIMESTAMP
        WHEN ? = 'draft' THEN NULL
        ELSE published_at
      END,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).bind(
    post.slug,
    post.post_type,
    post.title,
    post.excerpt,
    post.body,
    post.external_url,
    post.source_name,
    post.status,
    authorName,
    authorEmail,
    shouldPublishNow ? 1 : 0,
    post.status,
    post.id,
  ).run();

  return jsonResponse({ post });
}

export async function onRequestDelete({ request, env }) {
  const editor = await requireEditor(request, env);
  if (editor.response) return editor.response;
  const manager = blogManagerForUser(editor.user);
  if (!manager) {
    return jsonResponse({ error: "Blog management is restricted to approved blog editors." }, 403);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Blog post id is required." }, 400);
  }

  const id = Number(body.id || 0);
  if (!id) return jsonResponse({ error: "Blog post id is required." }, 400);

  let db;
  try {
    db = requirePortalDb(env);
    await ensurePortalTables(db);
  } catch {
    return jsonResponse({ error: "Blog database is not configured." }, 500);
  }

  const result = await db.prepare(`
    DELETE FROM blog_posts
    WHERE id = ?${manager.canManageAll ? "" : " AND LOWER(author_email) = ?"}
  `).bind(...(manager.canManageAll ? [id] : [id, manager.email])).run();

  return jsonResponse({ deleted: Boolean(result.meta?.changes), id });
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
