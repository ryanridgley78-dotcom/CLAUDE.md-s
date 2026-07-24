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
);

CREATE INDEX IF NOT EXISTS idx_patriarch_referrals_code
ON patriarch_referrals (referral_code, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_patriarch_referrals_application
ON patriarch_referrals (application_id, updated_at DESC);
