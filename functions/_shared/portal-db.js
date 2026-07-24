import { getSessionUser, jsonResponse } from "./portal-auth.js";

export const ACCOUNT_TYPES = ["Widows", "Orphans", "Patriarchs"];
export const PORTAL_ROLES = ["admin", "elder", "member", "client"];
export const COURSEWORK_ITEM_TYPES = ["course", "assignment", "daily_report", "journal", "dream"];
export const MODULE_PROGRESS_STATUSES = ["not_started", "in_progress", "awaiting_review", "complete", "not_required"];
export const BLOG_POST_STATUSES = ["draft", "published"];
export const BLOG_POST_TYPES = ["internal", "external"];

const WIDOWS_REPENTANCE_COURSE = {
  account_type: "Widows",
  course_code: "WID-101",
  course_status: "published",
  path_title: "Widows Coursework",
  overview: `This Widows course uses the five-step covenantal pattern of repentance and redemption as a first formation path. It teaches each widow to recognize emotional feedback as a signal, measure conflict by Torah-defined order, take ownership without deflection, return to proper covenant function, and reflect alignment under Messiah's atonement.

The course is meant for elder-guided discipleship. It gives the client a clear framework for confession, correction, restoration, and accountable fruit while keeping the guardrail clear: Messiah's blood is the only true atonement for sin, and human action is an expression of restored alignment.`,
  coursework: `Module 1: Identify - Discern the breach.
Name the specific sin, transgression, disorder, or unmet covenant expectation. Separate the emotional signal from the standard of righteousness.

Module 2: Qualify - Establish the root cause.
Measure the breach against Torah, household order, roles, and righteous covenantal need. Distinguish legitimate deficiency from selfish ambition, manipulation, or disorderly desire.

Module 3: Accountability - Own the transgression.
Practice clear confession without blame-shifting, justification, or emotional defense. Use covenantal language that agrees with Torah's judgment concerning the action.

Module 4: Repentance - Return to order.
Build an immediate and measurable obedience plan. Identify the behavior that must stop, the order that must be restored, and the fruit elders should be able to observe.

Module 5: Atonement - Reflect alignment under Messiah's covering.
Study how atonement is fulfilled through Yahushua and how earthly covenant structures reflect, but do not achieve, that atonement through reverence, restored order, and reconciled action.`,
  progress_tracking: `Milestone 1: The widow can name the breach precisely without defending the emotion.
Milestone 2: The widow can identify whether the root is a legitimate covenantal need or a flesh-driven distortion.
Milestone 3: The widow can confess the offense clearly and remove blame-shifting from the account.
Milestone 4: The widow completes a measurable return-to-order plan and shows observable fruit.
Milestone 5: The widow can explain the guardrail: Messiah's blood alone atones, while human action expresses alignment.

Elder review rhythm: one check-in after each module, with notes on clarity, ownership, fruit, and any follow-up correction needed before moving forward.`,
  learning_objectives: `Identify covenant disorder with clarity and without blame-shifting.
Measure decisions and conflicts against Torah-defined order.
Practice accountable confession and measurable repentance.
Explain the role of Messiah's atonement in restoration.
Demonstrate observable fruit through elder-guided reflection and action.`,
  completion_requirements: `Complete all five modules in sequence.
Submit each required reflection or worksheet.
Participate in an elder review after each module.
Complete a final reflection demonstrating understanding, accountability, and an actionable restoration plan.`,
  book_list: `Required Reading:
Created to Be His Help Meet
Love and Respect by Dr. Emerson Eggerichs
How to Win Friends and Influence People by Dale Carnegie
Failing Forward by John Maxwell
The Slight Edge by Jeff Olson

Primary reference: Five-Step Process of Repentance and Redemption (Covenantal Framework).
Scripture focus: Exodus 21:10; Matthew 3:8; 1 John 1:7-9; Hebrews 9-10; Romans 12:1-2.
Elder-selected readings: add household-order, repentance, forgiveness, and covenant-restoration materials appropriate to the widow's situation.`,
  first_lesson: `First Lesson: Identify the Breach

Repentance begins with precision. Negative emotional feedback may reveal that something needs attention, but emotion does not establish righteousness. The standard is alignment with Torah and covenant order.

In this lesson, the widow names one recent conflict, rebuke, conviction, or moment of disorder. She will write what happened, identify the specific breach, and describe which covenant expectation was not upheld. The goal is not self-condemnation or self-defense. The goal is truthful discernment before YHWH and accountable elders.

By the end of the lesson, she should be able to say: "The breach was..." and "The covenant expectation was..." without shifting the focus to another person's failure.`,
  first_assignment: `Complete a one-page reflection using these prompts:

1. What situation produced the strongest emotional feedback this week?
2. What specific sin, transgression, disorder, or covenantal failure may be present?
3. What Torah-defined expectation or household order issue is involved?
4. Where did I defend, justify, or blame-shift instead of identifying the breach?
5. What do I need to ask an elder to help me qualify next?`,
  modules: [
    {
      title: "Identify - Discern the Breach",
      objective: "Name the specific breach and distinguish emotional feedback from the standard of righteousness.",
      lesson_summary: "Recognize a recent conflict or conviction and identify the covenant expectation that was not upheld.",
      assignment: "Submit a one-page reflection identifying the breach and the covenant expectation involved.",
    },
    {
      title: "Qualify - Establish the Root Cause",
      objective: "Measure the breach against Torah, household order, and righteous covenantal need.",
      lesson_summary: "Distinguish legitimate deficiency from selfish ambition, manipulation, or disorderly desire.",
      assignment: "Complete a guided root-cause worksheet for the breach identified in Module 1.",
    },
    {
      title: "Accountability - Own the Transgression",
      objective: "Confess the offense clearly without blame-shifting, justification, or emotional defense.",
      lesson_summary: "Practice covenantal language that truthfully agrees with the correction required.",
      assignment: "Write a confession and accountability reflection for elder review.",
    },
    {
      title: "Repentance - Return to Order",
      objective: "Develop an immediate and measurable obedience plan that produces observable fruit.",
      lesson_summary: "Identify the conduct that must stop and the order that must be restored.",
      assignment: "Submit a return-to-order plan with measurable next steps.",
    },
    {
      title: "Atonement - Reflect Alignment Under Messiah's Covering",
      objective: "Explain that Messiah's blood alone atones while restored action reflects alignment.",
      lesson_summary: "Study atonement through Yahushua and the proper purpose of reconciled action.",
      assignment: "Complete a final reflection describing restoration, fruit, and the atonement guardrail.",
    },
  ],
};

export function requirePortalDb(env) {
  if (!env.PORTAL_DB) {
    throw new Error("PORTAL_DB binding is not configured.");
  }
  return env.PORTAL_DB;
}

export function hasEditorAccess(user) {
  const role = String(user?.role || "").toLowerCase();
  const displayRole = String(user?.display_role || "").toLowerCase();
  return role === "admin" ||
    role === "editor" ||
    role === "elder" ||
    displayRole.includes("elder") ||
    displayRole.includes("deacon") ||
    displayRole.includes("co-founder");
}

export async function requireEditor(request, env) {
  const user = await getSessionUser(request, env);
  if (!user) {
    return { response: jsonResponse({ error: "Not signed in." }, 401) };
  }

  if (!hasEditorAccess(user)) {
    return { response: jsonResponse({ error: "Editor access is required." }, 403) };
  }

  return { user };
}

export async function ensurePortalTables(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS client_portals (
      client_email TEXT PRIMARY KEY,
      client_name TEXT NOT NULL,
      account_type TEXT NOT NULL CHECK (account_type IN ('Widows', 'Orphans', 'Patriarchs')),
      portal_title TEXT NOT NULL,
      first_assignment TEXT NOT NULL DEFAULT '',
      program_application_id INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE client_portals ADD COLUMN program_application_id INTEGER NOT NULL DEFAULT 0
  `).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS account_paths (
      account_type TEXT PRIMARY KEY CHECK (account_type IN ('Widows', 'Orphans', 'Patriarchs')),
      path_title TEXT NOT NULL,
      course_code TEXT NOT NULL DEFAULT '',
      course_status TEXT NOT NULL DEFAULT 'draft',
      overview TEXT NOT NULL DEFAULT '',
      learning_objectives TEXT NOT NULL DEFAULT '',
      completion_requirements TEXT NOT NULL DEFAULT '',
      modules_json TEXT NOT NULL DEFAULT '[]',
      first_lesson TEXT NOT NULL DEFAULT '',
      first_assignment TEXT NOT NULL DEFAULT '',
      coursework TEXT NOT NULL DEFAULT '',
      progress_tracking TEXT NOT NULL DEFAULT '',
      book_list TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`ALTER TABLE account_paths ADD COLUMN course_code TEXT NOT NULL DEFAULT ''`).run().catch(() => {});
  await db.prepare(`ALTER TABLE account_paths ADD COLUMN course_status TEXT NOT NULL DEFAULT 'draft'`).run().catch(() => {});
  await db.prepare(`ALTER TABLE account_paths ADD COLUMN learning_objectives TEXT NOT NULL DEFAULT ''`).run().catch(() => {});
  await db.prepare(`ALTER TABLE account_paths ADD COLUMN completion_requirements TEXT NOT NULL DEFAULT ''`).run().catch(() => {});
  await db.prepare(`ALTER TABLE account_paths ADD COLUMN modules_json TEXT NOT NULL DEFAULT '[]'`).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS portal_users (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'elder', 'member', 'client')),
      display_role TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'active',
      mens_forum_approved INTEGER NOT NULL DEFAULT 0,
      password_iterations INTEGER NOT NULL,
      password_salt TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      profile_image_data TEXT NOT NULL DEFAULT '',
      public_location_state TEXT NOT NULL DEFAULT '',
      public_location_enabled INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE portal_users ADD COLUMN display_role TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE portal_users ADD COLUMN profile_image_data TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE portal_users ADD COLUMN public_location_state TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE portal_users ADD COLUMN public_location_enabled INTEGER NOT NULL DEFAULT 0
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE portal_users ADD COLUMN mens_forum_approved INTEGER NOT NULL DEFAULT 0
  `).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS portal_invites (
      token_hash TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'elder', 'member', 'client')),
      display_role TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'active',
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE portal_invites ADD COLUMN display_role TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS qahal_applications (
      email TEXT PRIMARY KEY,
      first_name TEXT NOT NULL DEFAULT '',
      last_name TEXT NOT NULL DEFAULT '',
      full_name TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      role_requested TEXT NOT NULL DEFAULT 'Member',
      approval_status TEXT NOT NULL DEFAULT 'pending',
      approved_at TEXT,
      approval_email_sent_at TEXT,
      application_json TEXT NOT NULL DEFAULT '{}',
      application_text TEXT NOT NULL DEFAULT '',
      submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE qahal_applications ADD COLUMN approval_status TEXT NOT NULL DEFAULT 'pending'
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE qahal_applications ADD COLUMN approved_at TEXT
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE qahal_applications ADD COLUMN approval_email_sent_at TEXT
  `).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS ministry_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      application_type TEXT NOT NULL,
      email TEXT NOT NULL,
      first_name TEXT NOT NULL DEFAULT '',
      last_name TEXT NOT NULL DEFAULT '',
      full_name TEXT NOT NULL DEFAULT '',
      phone TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT '',
      application_json TEXT NOT NULL DEFAULT '{}',
      application_text TEXT NOT NULL DEFAULT '',
      submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS portal_password_resets (
      token_hash TEXT PRIMARY KEY,
      email TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'active',
      expires_at TEXT NOT NULL,
      used_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS site_settings (
      setting_key TEXT PRIMARY KEY,
      setting_value TEXT NOT NULL,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS daily_task_reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_email TEXT NOT NULL,
      client_name TEXT NOT NULL,
      report_date TEXT NOT NULL,
      completed_tasks TEXT NOT NULL DEFAULT '',
      progress_notes TEXT NOT NULL DEFAULT '',
      blockers TEXT NOT NULL DEFAULT '',
      next_steps TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS client_reflections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_email TEXT NOT NULL,
      client_name TEXT NOT NULL,
      reflection_type TEXT NOT NULL CHECK (reflection_type IN ('journal', 'dream')),
      reflection_date TEXT NOT NULL,
      title TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL,
      elder_notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS client_coursework_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_email TEXT NOT NULL,
      client_name TEXT NOT NULL,
      module_index INTEGER NOT NULL DEFAULT -1,
      item_type TEXT NOT NULL CHECK (item_type IN ('course', 'assignment', 'daily_report', 'journal', 'dream')),
      title TEXT NOT NULL,
      instructions TEXT NOT NULL DEFAULT '',
      elder_feedback TEXT NOT NULL DEFAULT '',
      document_ids_json TEXT NOT NULL DEFAULT '[]',
      due_date TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'assigned',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE client_coursework_items ADD COLUMN elder_feedback TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE client_coursework_items ADD COLUMN module_index INTEGER NOT NULL DEFAULT -1
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE client_coursework_items ADD COLUMN document_ids_json TEXT NOT NULL DEFAULT '[]'
  `).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS elder_assessments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_email TEXT NOT NULL,
      client_name TEXT NOT NULL,
      title TEXT NOT NULL,
      assessment_json TEXT NOT NULL DEFAULT '{}',
      assessment_text TEXT NOT NULL DEFAULT '',
      created_by_email TEXT NOT NULL DEFAULT '',
      created_by_name TEXT NOT NULL DEFAULT '',
      sent_to_client_at TEXT,
      coursework_item_id INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_elder_assessments_client
    ON elder_assessments (client_email, title, updated_at DESC)
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS client_module_progress (
      client_email TEXT NOT NULL,
      account_type TEXT NOT NULL,
      module_index INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'awaiting_review', 'complete', 'not_required')),
      elder_notes TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (client_email, account_type, module_index)
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS portal_documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      document_scope TEXT NOT NULL DEFAULT 'library' CHECK (document_scope IN ('library', 'client')),
      client_email TEXT NOT NULL DEFAULT '',
      client_name TEXT NOT NULL DEFAULT '',
      file_key TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_type TEXT NOT NULL DEFAULT 'application/octet-stream',
      file_size INTEGER NOT NULL DEFAULT 0,
      uploaded_by_email TEXT NOT NULL DEFAULT '',
      uploaded_by_name TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_portal_documents_client
    ON portal_documents (document_scope, client_email, created_at DESC)
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS patriarch_referrals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      referral_token TEXT NOT NULL UNIQUE,
      referral_code TEXT NOT NULL,
      authority_name TEXT NOT NULL DEFAULT '',
      authority_role TEXT NOT NULL DEFAULT '',
      authority_contact TEXT NOT NULL DEFAULT '',
      referral_notes TEXT NOT NULL DEFAULT '',
      document_id INTEGER NOT NULL DEFAULT 0,
      document_name TEXT NOT NULL DEFAULT '',
      document_path TEXT NOT NULL DEFAULT '',
      applicant_name TEXT NOT NULL DEFAULT '',
      applicant_email TEXT NOT NULL DEFAULT '',
      application_id INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'referral_connected',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_patriarch_referrals_code
    ON patriarch_referrals (referral_code, created_at DESC)
  `).run();

  await db.prepare(`
    CREATE INDEX IF NOT EXISTS idx_patriarch_referrals_application
    ON patriarch_referrals (application_id, updated_at DESC)
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      post_type TEXT NOT NULL CHECK (post_type IN ('internal', 'external')) DEFAULT 'internal',
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL,
      external_url TEXT NOT NULL DEFAULT '',
      source_name TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
      author_name TEXT NOT NULL DEFAULT '',
      author_email TEXT NOT NULL DEFAULT '',
      published_at TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE blog_posts ADD COLUMN post_type TEXT NOT NULL DEFAULT 'internal'
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE blog_posts ADD COLUMN external_url TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE blog_posts ADD COLUMN source_name TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS blog_post_reactions (
      post_id INTEGER PRIMARY KEY,
      hearts_count INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS blog_post_comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      post_id INTEGER NOT NULL,
      parent_comment_id INTEGER,
      commenter_name TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'visible' CHECK (status IN ('visible', 'hidden')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE blog_post_comments ADD COLUMN parent_comment_id INTEGER
  `).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS mens_forum_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      parent_post_id INTEGER,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      media_type TEXT NOT NULL DEFAULT '',
      media_data TEXT NOT NULL DEFAULT '',
      media_name TEXT NOT NULL DEFAULT '',
      author_email TEXT NOT NULL,
      author_name TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'visible' CHECK (status IN ('visible', 'hidden')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE mens_forum_posts ADD COLUMN parent_post_id INTEGER
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE mens_forum_posts ADD COLUMN media_type TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE mens_forum_posts ADD COLUMN media_data TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE mens_forum_posts ADD COLUMN media_name TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    CREATE TABLE IF NOT EXISTS direct_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sender_email TEXT NOT NULL DEFAULT '',
      sender_name TEXT NOT NULL DEFAULT '',
      sender_role TEXT NOT NULL DEFAULT 'public',
      recipient_email TEXT NOT NULL DEFAULT '',
      recipient_name TEXT NOT NULL DEFAULT '',
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `).run();

  await db.prepare(`
    ALTER TABLE direct_messages ADD COLUMN recipient_email TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    ALTER TABLE direct_messages ADD COLUMN recipient_name TEXT NOT NULL DEFAULT ''
  `).run().catch(() => {});

  await db.prepare(`
    INSERT INTO mens_forum_posts (title, body, author_email, author_name)
    SELECT ?, ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1 FROM mens_forum_posts WHERE title = ?
    )
  `).bind(
    "Iron Sharpens Iron",
    `This forum is a private place for men to bring honest questions, comments, and discussion before other men who are seeking order, accountability, and maturity.

Proverbs 27:17 says, "Iron sharpens iron, and one man sharpens another." That kind of sharpening requires humility, truth, correction, patience, and the willingness to be examined. Use this space to ask real questions, test ideas through Scripture, encourage one another toward obedience, and receive correction without offense.

Post with honor. Answer with sobriety. Build men who can carry responsibility.`,
    "system@yahsmisfits.com",
    "YHWH's Misfits Elders",
    "Iron Sharpens Iron",
  ).run();

  await db.prepare(`
    INSERT INTO mens_forum_posts (title, body, author_email, author_name)
    SELECT ?, ?, ?, ?
    WHERE NOT EXISTS (
      SELECT 1 FROM mens_forum_posts WHERE title = ?
    )
  `).bind(
    "Introduce Yourself: Your Journey and Walk with Torah",
    `Men, use this discussion to introduce yourself to the other approved brothers in the forum.

Share a little about your journey, how YHWH began drawing you toward Torah, what changed in your walk, and what you are currently learning. You can also share what you hope to grow in as you walk with other men who desire truth, order, accountability, and maturity.

This is a place to be known soberly and to sharpen one another with honor.`,
    "system@yahsmisfits.com",
    "YHWH's Misfits Elders",
    "Introduce Yourself: Your Journey and Walk with Torah",
  ).run();

  await db.prepare(`
    INSERT OR IGNORE INTO account_paths (
      account_type,
      path_title,
      overview,
      coursework,
      progress_tracking,
      book_list,
      first_lesson,
      first_assignment
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    WIDOWS_REPENTANCE_COURSE.account_type,
    WIDOWS_REPENTANCE_COURSE.path_title,
    WIDOWS_REPENTANCE_COURSE.overview,
    WIDOWS_REPENTANCE_COURSE.coursework,
    WIDOWS_REPENTANCE_COURSE.progress_tracking,
    WIDOWS_REPENTANCE_COURSE.book_list,
    WIDOWS_REPENTANCE_COURSE.first_lesson,
    WIDOWS_REPENTANCE_COURSE.first_assignment,
  ).run();

  await db.prepare(`
    UPDATE account_paths
    SET
      course_code = ?,
      course_status = ?,
      learning_objectives = ?,
      completion_requirements = ?,
      modules_json = ?
    WHERE account_type = 'Widows'
      AND course_code = ''
      AND learning_objectives = ''
      AND completion_requirements = ''
      AND modules_json = '[]'
  `).bind(
    WIDOWS_REPENTANCE_COURSE.course_code,
    WIDOWS_REPENTANCE_COURSE.course_status,
    WIDOWS_REPENTANCE_COURSE.learning_objectives,
    WIDOWS_REPENTANCE_COURSE.completion_requirements,
    JSON.stringify(WIDOWS_REPENTANCE_COURSE.modules),
  ).run();
}

export async function sha256Hex(value) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function cleanClientPortal(input) {
  const clientEmail = String(input.client_email || "").trim().toLowerCase();
  const clientName = String(input.client_name || "").trim();
  const accountType = String(input.account_type || "").trim();
  const portalTitle = String(input.portal_title || "").trim();
  const firstAssignment = String(input.first_assignment || "").trim();

  if (!clientEmail || !clientEmail.includes("@")) {
    return { error: "Enter a valid client email address." };
  }

  if (!clientName) {
    return { error: "Enter the client's name." };
  }

  if (!ACCOUNT_TYPES.includes(accountType)) {
    return { error: "Choose Widows, Orphans, or Patriarchs." };
  }

  if (!portalTitle) {
    return { error: "Enter a gate title." };
  }

  return {
    value: {
      client_email: clientEmail,
      client_name: clientName,
      account_type: accountType,
      portal_title: portalTitle,
      first_assignment: firstAssignment,
    },
  };
}

export function slugify(value) {
  const slug = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  return slug || `post-${Date.now()}`;
}

export function cleanBlogPost(input) {
  const id = Number(input.id || 0);
  const postType = String(input.post_type || "internal").trim();
  const title = String(input.title || "").trim();
  const excerpt = String(input.excerpt || "").trim();
  const body = String(input.body || "").trim();
  const externalUrl = String(input.external_url || "").trim();
  const sourceName = String(input.source_name || "").trim();
  const status = String(input.status || "draft").trim();
  const slug = slugify(input.slug || title);

  if (!title) {
    return { error: "Enter a blog title." };
  }

  if (!body) {
    return { error: "Write the blog post body." };
  }

  if (!BLOG_POST_TYPES.includes(postType)) {
    return { error: "Choose website post or external link." };
  }

  if (postType === "external") {
    try {
      const url = new URL(externalUrl);
      if (url.protocol !== "http:" && url.protocol !== "https:") {
        return { error: "Enter a valid external blog link." };
      }
    } catch {
      return { error: "Enter a valid external blog link." };
    }
  }

  if (!BLOG_POST_STATUSES.includes(status)) {
    return { error: "Choose draft or published." };
  }

  return {
    value: {
      id,
      slug,
      post_type: postType,
      title,
      excerpt,
      body,
      external_url: externalUrl,
      source_name: sourceName,
      status,
    },
  };
}

export function cleanAccountPath(input) {
  const accountType = String(input.account_type || "").trim();
  const courseCode = String(input.course_code || "").trim();
  const courseStatus = String(input.course_status || "draft").trim();
  const pathTitle = String(input.path_title || "").trim();
  const overview = String(input.overview || "").trim();
  const learningObjectives = String(input.learning_objectives || "").trim();
  const completionRequirements = String(input.completion_requirements || "").trim();
  const firstLesson = String(input.first_lesson || "").trim();
  const firstAssignment = String(input.first_assignment || "").trim();
  const coursework = String(input.coursework || "").trim();
  const progressTracking = String(input.progress_tracking || "").trim();
  const bookList = String(input.book_list || "").trim();
  const modules = Array.isArray(input.modules)
    ? input.modules.map((module) => ({
      title: String(module.title || "").trim(),
      objective: String(module.objective || "").trim(),
      lesson_summary: String(module.lesson_summary || "").trim(),
      assignment: String(module.assignment || "").trim(),
      document_ids: Array.isArray(module.document_ids)
        ? module.document_ids.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0)
        : [],
    })).filter((module) => module.title)
    : [];

  if (!ACCOUNT_TYPES.includes(accountType)) {
    return { error: "Choose Widows, Orphans, or Patriarchs." };
  }

  if (!pathTitle) {
    return { error: "Enter a path title." };
  }

  if (!["draft", "published"].includes(courseStatus)) {
    return { error: "Choose draft or published for the course status." };
  }

  return {
    value: {
      account_type: accountType,
      course_code: courseCode,
      course_status: courseStatus,
      path_title: pathTitle,
      overview,
      learning_objectives: learningObjectives,
      completion_requirements: completionRequirements,
      modules_json: JSON.stringify(modules),
      modules,
      first_lesson: firstLesson,
      first_assignment: firstAssignment,
      coursework,
      progress_tracking: progressTracking,
      book_list: bookList,
    },
  };
}
