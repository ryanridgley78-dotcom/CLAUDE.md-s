import { createSessionCookie, jsonResponse, readUsers, verifyPassword } from "../../_shared/portal-auth.js";
import { ensurePortalTables, requirePortalDb } from "../../_shared/portal-db.js";

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Please enter your email and password." }, 400);
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  if (!email || !password) {
    return jsonResponse({ error: "Please enter your email and password." }, 400);
  }

  let d1User = null;
  try {
    const db = requirePortalDb(env);
    await ensurePortalTables(db);
    d1User = await db.prepare(`
      SELECT email, name, role, display_role, status, password_iterations, password_salt, password_hash
      FROM portal_users
      WHERE email = ?
    `).bind(email).first();
  } catch {
    d1User = null;
  }

  if (d1User && d1User.status !== "disabled") {
    const passwordMatches = await verifyPassword(password, {
      iterations: d1User.password_iterations,
      salt: d1User.password_salt,
      hash: d1User.password_hash,
    });

    if (passwordMatches) {
      const user = {
        email: d1User.email,
        name: d1User.name,
        role: d1User.role,
        display_role: d1User.display_role || "",
      };

      let sessionCookie;
      try {
        sessionCookie = await createSessionCookie(env, user);
      } catch {
        return jsonResponse({ error: "Gate session secret is not configured." }, 500);
      }

      return jsonResponse({ user }, 200, { "set-cookie": sessionCookie });
    }
  }

  let users;
  try {
    users = readUsers(env);
  } catch {
    return jsonResponse({ error: "Gate users are not configured correctly." }, 500);
  }

  if (users.length === 0) {
    return jsonResponse({ error: "No gate accounts are configured yet." }, 500);
  }

  const user = users.find((candidate) => candidate.email === email && candidate.status !== "disabled");
  const passwordMatches = user ? await verifyPassword(password, user.password) : false;
  if (!user || !passwordMatches) {
    return jsonResponse({ error: "The email or password is not correct." }, 401);
  }

  let sessionCookie;
  try {
    sessionCookie = await createSessionCookie(env, user);
  } catch {
    return jsonResponse({ error: "Gate session secret is not configured." }, 500);
  }

  return jsonResponse(
    {
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
        display_role: user.display_role || "",
      },
    },
    200,
    { "set-cookie": sessionCookie },
  );
}

export function onRequest() {
  return jsonResponse({ error: "Method not allowed." }, 405);
}
