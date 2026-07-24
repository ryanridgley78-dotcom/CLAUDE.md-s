CREATE TABLE IF NOT EXISTS portal_password_resets (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_portal_password_resets_email_created
ON portal_password_resets (email, created_at DESC);
