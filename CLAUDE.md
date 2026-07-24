# YAH's Misfits Project Guidance

## Project Overview

- This repository is the static website and Cloudflare Pages app for `yahsmisfits.com`.
- Preserve the ministry identity and wording carefully: `YHWH's Misfits`, `YHWH`, `Yahushua`, `Torah`, and `qahal`.
- The public site is mostly plain HTML, CSS, and JavaScript. The gated portal uses Cloudflare Pages Functions, D1, and R2.
- Prefer the existing file structure and vanilla patterns over introducing a framework.

## Main Files

- `index.html`, page-level `.html` files: public website content.
- `styles.css`: shared styling and responsive layout.
- `script.js`: shared browser behavior.
- `server.mjs`: local static preview server.
- `portal/`: gated portal pages.
- `functions/`: Cloudflare Pages Functions APIs and portal middleware.
- `functions/_shared/`: shared auth, database, referral-code, and mailer helpers.
- `migrations/`: D1 database migrations.
- `assets/`, `deliverables/`, `outputs/`, `output/`: media, generated documents, and production artifacts.

## Local Commands

- Preview locally with `npm run dev`, which runs `node server.mjs` on `http://localhost:4173`.
- If `npm` is unavailable, run `node server.mjs` directly.
- Install/update local tooling with `npm install`.
- Deploy with `.\deploy.ps1` after Wrangler is authenticated locally.
- The deploy script stages only selected website, portal, function, and asset files into `.cloudflare-deploy` before uploading.

## Cloudflare Setup

- Wrangler project name: `yahsmisfits`.
- D1 binding: `PORTAL_DB`.
- D1 database name: `yahsmisfits-portal`.
- R2 binding: `FORUM_MEDIA`.
- R2 bucket: `yahsmisfits-forum-media`.
- Required production secrets include `PORTAL_USERS_JSON` and `PORTAL_SESSION_SECRET`.
- Do not save API tokens, passwords, `.env`, `.dev.vars`, Cloudflare credentials, or other secrets in this repository.
- Do not repeat user-provided passwords in chat or documentation.

## Portal Behavior

- Portal roles include `admin`, `editor`, `elder`, and `client`.
- Client account paths include `Widows`, `Orphans`, and `Patriarchs`.
- The portal includes coursework, assessments, reflections, documents, messages, member profile/directory features, applications, invites, password reset, blog management, public questions, patriarch referrals, and forum media.
- Keep operational UI dense, organized, and professional. The user has called out clutter and unreadable curriculum text as things to avoid.

## Implementation Preferences

- Make small, focused changes that fit the current plain HTML/CSS/JS and Cloudflare Functions style.
- Keep public ministry copy warm, direct, and reverent. Avoid rewriting theological or identity language casually.
- Preserve mobile responsiveness and check that text remains readable on small screens.
- For UI work, prioritize clarity, polish, and actual usability over decorative flourish.
- When changing Cloudflare Functions, inspect shared helpers before duplicating auth, database, email, or response logic.
- When changing data shape, check existing D1 migrations and API consumers together.

## Verification

- For JavaScript changes, run a syntax check with Node when possible.
- For browser-facing changes, run `npm run dev` and smoke-test the affected pages.
- For portal/API changes, verify relevant Pages Function paths and any D1/R2 bindings involved.
- For deploys, confirm Wrangler authentication first. If Wrangler is logged out, ask the user to complete `wrangler login` locally instead of asking for tokens.

