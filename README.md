# YAH's Misfits Website

Static website for `yahsmisfits.com`, designed to deploy cleanly to Cloudflare Pages.

## Edit locally

Open these files in your editor:

- `index.html` for page content
- `styles.css` for visual styling
- `script.js` for the small mobile menu/header behavior
- `assets/hero-community.png` for the hero image

## Preview locally

Run:

```powershell
npm run dev
```

Then open:

```text
http://localhost:4173
```

Press `Ctrl+C` in the terminal when you want to stop the local server.

If `npm` is not installed yet, this also works:

```powershell
node server.mjs
```

## One-command Cloudflare deploy

This project is set up for Wrangler-based Cloudflare Pages deploys.

Install local tooling:

```powershell
npm install
```

This repository can also use the local Node.js copy in `.tools` if global `npm`
is not available.

Authenticate with Cloudflare:

```powershell
npx wrangler login
```

This opens Cloudflare in your browser and stores Wrangler's local login.
If you manage multiple Cloudflare accounts, you can optionally set an account ID:

```powershell
$env:CLOUDFLARE_ACCOUNT_ID = "your-account-id"
```

Deploy:

```powershell
.\deploy.ps1
```

The deploy script stages only the website and Cloudflare Functions files before
uploading, so local tooling folders like `node_modules` are not published.

Do not save API tokens in this repository.

## Private gate setup

The first gate phase lives at `/portal/login.html` and
`/portal/dashboard.html`. Public pages remain public, while the dashboard is
protected by Cloudflare Pages Functions.

Create a gate user record:

```powershell
node .\.tools\create-portal-user.mjs client@example.com "Client Name" client "temporary-password"
```

Use `admin`, `editor`, `elder`, or `client` for the role. Add one or more
generated records to a JSON array and set it as the Cloudflare Pages environment variable
`PORTAL_USERS_JSON`.

Also set `PORTAL_SESSION_SECRET` to a long random value. Both variables must be
configured in Cloudflare before real gate login will work.

Client account assignments use a Cloudflare D1 binding named `PORTAL_DB`. The
editor gate can assign one of three account paths to a client: `Widows`,
`Orphans`, or `Patriarchs`. The editor gate links to a dedicated Widows
coursework workspace for reusable coursework, progress tracking, and book list
content.

## Deploy to Cloudflare Pages

### Option A: Direct Upload

1. Sign in to Cloudflare.
2. Go to **Workers & Pages**.
3. Choose **Create application** > **Get started** > **Drag and drop your files**.
4. Name the project `yahsmisfits`.
5. Upload this project folder, or a zip containing these files.
6. Select **Deploy site**, then **Save and Deploy**.

Cloudflare notes that Direct Upload projects cannot later be switched into Git integration.
If you want automatic deploys from GitHub or GitLab, use Option B from the start.

### Option B: Git Deployment

Once Git is installed locally and the project is pushed to GitHub or GitLab:

1. In Cloudflare, go to **Workers & Pages**.
2. Create a Pages project connected to the repository.
3. Use these build settings:
   - Framework preset: `None`
   - Build command: `exit 0`
   - Build output directory: `/`

## Connect the domain

In the Cloudflare Pages project:

1. Open the project.
2. Go to **Custom domains**.
3. Add `yahsmisfits.com`.
4. Add `www.yahsmisfits.com` if you want the `www` version to work too.
5. Cloudflare will create or suggest the needed DNS records.

To send `www.yahsmisfits.com` to `yahsmisfits.com`, create a Cloudflare Redirect Rule:

- When incoming requests match: `Hostname equals www.yahsmisfits.com`
- Then: `Static redirect` to `https://yahsmisfits.com/${uri.path}`
- Status code: `301`
- Preserve query string: enabled

## Next setup items

- Replace placeholder email `hello@yahsmisfits.com` if needed.
- Connect the contact form to a real form handler when ready.
- Install Git if you want version control and Git-based Cloudflare deploys.
