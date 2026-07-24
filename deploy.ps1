$ErrorActionPreference = "Stop"

$nodeDir = Join-Path $PSScriptRoot ".tools\node-v24.15.0-win-x64"
$localWrangler = Join-Path $PSScriptRoot "node_modules\.bin\wrangler.cmd"
$stageRoot = Join-Path $PSScriptRoot ".cloudflare-deploy"
$stage = Join-Path $stageRoot ([Guid]::NewGuid().ToString("N"))
$siteFiles = @(
  "index.html",
  "mission.html",
  "staff.html",
  "donate.html",
  "blogs.html",
  "blogs-jared-cheshire.html",
  "connect-socially.html",
  "applications.html",
  "privacy-policy.html",
  "connect.html",
  "ask-question.html",
  "general-application.html",
  "widows-orphans.html",
  "patriarchs.html",
  "weekly-torah-study.html",
  "video-recordings.html",
  "podcast.html",
  "calendar.html",
  "torah-portions.html",
  "events.html",
  "styles.css",
  "script.js",
  "app.js",
  "app-portal-cache.js",
  "manifest.webmanifest",
  "service-worker.js",
  "portal",
  "functions",
  "_headers",
  "_redirects",
  "robots.txt",
  "sitemap.xml",
  "assets"
)

New-Item -ItemType Directory -Force -Path $stage | Out-Null

foreach ($item in $siteFiles) {
  $source = Join-Path $PSScriptRoot $item
  if (Test-Path $source) {
    Copy-Item -LiteralPath $source -Destination $stage -Recurse -Force
  }
}

$deployArgs = @("pages", "deploy", $stage, "--project-name=yahsmisfits", "--branch=main")

if (Test-Path $nodeDir) {
  $env:PATH = "$nodeDir;$env:PATH"
}

if (Test-Path $localWrangler) {
  & $localWrangler @deployArgs
  exit $LASTEXITCODE
}

$wrangler = Get-Command wrangler -ErrorAction SilentlyContinue

if ($wrangler) {
  wrangler @deployArgs
  exit $LASTEXITCODE
}

throw "Wrangler is not installed. Run npm install, then try again."
