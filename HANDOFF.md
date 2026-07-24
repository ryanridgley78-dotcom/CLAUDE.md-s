# Codex To Claude Handoff

Generated on 2026-07-24 from the local Codex context for `C:\Users\ryanr\OneDrive\Documents\New project`.

## Migration Notes

- Codex's dedicated memory database did not contain completed saved-memory rows at migration time.
- This handoff is curated from the current project files, README, package scripts, Wrangler config, Codex config, and relevant Codex session titles/summaries.
- Raw Codex transcripts are intentionally not copied here. They are large, noisy, and may contain sensitive tool output.
- Codex transcript archives remain under `C:\Users\ryanr\.codex\sessions` and `C:\Users\ryanr\.codex\archived_sessions` if a specific past task needs to be investigated later.

## Current Project

- The project is the YAH's Misfits static site and gated portal for Cloudflare Pages.
- The local preview command is `npm run dev`, serving `http://localhost:4173`.
- Deployment is handled by `deploy.ps1`, which uses local `node_modules\.bin\wrangler.cmd` when available.
- `wrangler.toml` defines the Pages project as `yahsmisfits`, with D1 binding `PORTAL_DB` and R2 binding `FORUM_MEDIA`.
- `.gitignore` excludes `node_modules/`, `.wrangler/`, `.cloudflare-deploy/`, `.dev.vars`, `.env`, and `*.log`.
- Bundled Git did not recognize the current folder as a valid Git repository during this migration, even though a `.git` folder appears in the directory listing.

## Important Current Features

- Public website pages include mission, staff, donation, blogs, connection, applications, widows/orphans, patriarchs, weekly Torah study, videos, podcast, calendar, Torah portions, and events.
- The site includes PWA-related files: `manifest.webmanifest` and `service-worker.js`.
- The Gate portal starts at `/portal/login.html` and `/portal/dashboard.html`.
- Pages Functions protect the portal and serve APIs under `functions/api` and `functions/portal`.
- Portal functionality includes users, invites, login/logout, password reset, profile pictures, messages, documents, coursework, reflections, assessments, daily task reports, member directory/profile, blog posts/interactions, public questions, patriarch referrals, and forum media.
- D1 migrations run from `0001_client_portals.sql` through `0029_patriarch_referrals.sql`.

## Codex-Known Work History

- The hero branding was changed from "YAH's Misfits" to `YHWH's Misfits` and deployed early in the project.
- The spelling `quahal` was corrected to `qahal`.
- A widows course was created from a repentance/redemption reference document and added for elder/editor access.
- The curriculum/coursework area was refactored after the user noted it looked cluttered and unreadable.
- Elder assignment creation and document upload/access features were added or expanded.
- Widows readiness assessments were moved into an assessments tab.
- Referral-letter requirements were simplified to referral code, referral letter, and referral notes.
- Password requirements were lowered from a 12-character minimum, then deployed.
- Elder Ryan's live Gate account was updated in July 2026; do not repeat or document passwords, and verify current account details from the live system if needed.
- Several generated artifacts exist in `deliverables/`, `outputs/`, and `output/`, including ministry video work, brochures, presentation decks, and an editable weekly schedule workbook.

## Deployment And Auth Caveats

- Wrangler authentication has failed in past Codex sessions when the local browser OAuth callback did not complete.
- If deploy fails with `Not logged in`, run `.\node_modules\.bin\wrangler.cmd login` in a normal PowerShell and approve the browser login.
- Do not paste Cloudflare tokens or passwords into chat. Use local login or environment variables.
- Production variables such as `PORTAL_USERS_JSON` and `PORTAL_SESSION_SECRET` must remain in Cloudflare, not in repo files.

## Suggested Claude Workflow

- Read `CLAUDE.md` first for durable project guidance.
- Read this handoff when continuing old Codex work or trying to understand why the project is shaped this way.
- Inspect current source files before trusting old session summaries.
- Keep raw Codex transcripts as an archive only. Search them by session title or ID when a specific historical decision needs confirmation.

