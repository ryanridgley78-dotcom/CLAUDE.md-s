import { getSessionUser } from "../_shared/portal-auth.js";
import { hasEditorAccess } from "../_shared/portal-db.js";

export async function onRequest(context) {
  const url = new URL(context.request.url);
  const isLoginPage = url.pathname === "/portal/login.html" || url.pathname === "/portal/login";
  const isSetPasswordPage =
    url.pathname === "/portal/set-password.html" ||
    url.pathname === "/portal/set-password" ||
    url.pathname === "/portal/set-password/";
  const isPasswordResetPage =
    url.pathname === "/portal/forgot-password.html" ||
    url.pathname === "/portal/forgot-password" ||
    url.pathname === "/portal/forgot-password/" ||
    url.pathname === "/portal/reset-password.html" ||
    url.pathname === "/portal/reset-password" ||
    url.pathname === "/portal/reset-password/";

  if (isLoginPage || isSetPasswordPage || isPasswordResetPage) {
    return context.next();
  }

  const user = await getSessionUser(context.request, context.env);
  if (!user) {
    return Response.redirect(`${url.origin}/portal/login.html`, 302);
  }

  const dashboardPaths = new Set([
    "/portal/dashboard",
    "/portal/dashboard.html",
  ]);
  if (dashboardPaths.has(url.pathname) && user.role === "member" && !hasEditorAccess(user)) {
    return Response.redirect(`${url.origin}/portal/member.html`, 302);
  }

  const displayRole = String(user.display_role || "").toLowerCase();
  const hasElderAssessmentAccess = hasEditorAccess(user);
  const elderAssessmentPaths = new Set([
    "/portal/widow-shepherding-assessment",
    "/portal/widow-shepherding-assessment.html",
  ]);
  if (elderAssessmentPaths.has(url.pathname) && !hasElderAssessmentAccess) {
    return Response.redirect(`${url.origin}${user.role === "member" ? "/portal/member.html" : "/portal/dashboard.html"}`, 302);
  }

  const editorOnlyPaths = new Set([
    "/portal/editor",
    "/portal/editor.html",
    "/portal/documents",
    "/portal/documents.html",
    "/portal/management",
    "/portal/management.html",
    "/portal/blog-management",
    "/portal/blog-management.html",
    "/portal/blog-management-jared-cheshire",
    "/portal/blog-management-jared-cheshire.html",
    "/portal/widows-coursework",
    "/portal/widows-coursework.html",
    "/portal/client-coursework",
    "/portal/client-coursework.html",
    "/portal/assessments",
    "/portal/assessments.html",
    "/portal/widow-shepherding-assessment",
    "/portal/widow-shepherding-assessment.html",
  ]);
  const isEditorPage = editorOnlyPaths.has(url.pathname);
  const canEdit = hasEditorAccess(user);
  if (isEditorPage && !canEdit) {
    return Response.redirect(`${url.origin}${user.role === "member" ? "/portal/member.html" : "/portal/dashboard.html"}`, 302);
  }

  const mensForumPaths = new Set([
    "/portal/mens-forum",
    "/portal/mens-forum.html",
  ]);
  const hasAutomaticMensForumAccess = hasEditorAccess(user);
  if (mensForumPaths.has(url.pathname) && !hasAutomaticMensForumAccess) {
    try {
      const db = context.env.PORTAL_DB;
      if (!db) throw new Error("Missing portal database.");
      const record = await db.prepare(`
        SELECT mens_forum_approved
        FROM portal_users
        WHERE email = ? AND status = 'active'
      `).bind(String(user.email || "").toLowerCase()).first();
      if (!record?.mens_forum_approved) {
        return Response.redirect(`${url.origin}${user.role === "member" ? "/portal/member.html" : "/portal/dashboard.html"}`, 302);
      }
    } catch {
      return Response.redirect(`${url.origin}${user.role === "member" ? "/portal/member.html" : "/portal/dashboard.html"}`, 302);
    }
  }

  const blogManagementPaths = new Set([
    "/portal/blog-management",
    "/portal/blog-management.html",
    "/portal/blog-management-jared-cheshire",
    "/portal/blog-management-jared-cheshire.html",
  ]);
  const blogManagers = new Map([
    ["/portal/blog-management", { email: "ryanridgley78@gmail.com", name: "Ryan Ridgley" }],
    ["/portal/blog-management.html", { email: "ryanridgley78@gmail.com", name: "Ryan Ridgley" }],
    ["/portal/blog-management-jared-cheshire", { email: "restoringthekingdom2as1@gmail.com", name: "Jared Cheshire" }],
    ["/portal/blog-management-jared-cheshire.html", { email: "restoringthekingdom2as1@gmail.com", name: "Jared Cheshire" }],
  ]);
  if (blogManagementPaths.has(url.pathname)) {
    const manager = blogManagers.get(url.pathname);
    if (user.role === "admin") {
      return context.next();
    }
    const isBlogManager = String(user.email || "").toLowerCase() === manager.email &&
      String(user.name || "").trim() === manager.name;
    if (!isBlogManager) {
      return Response.redirect(`${url.origin}/portal/editor.html`, 302);
    }
  }

  return context.next();
}
