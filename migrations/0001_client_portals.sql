CREATE TABLE IF NOT EXISTS client_portals (
  client_email TEXT PRIMARY KEY,
  client_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('Widows', 'Orphans', 'Patriarchs')),
  portal_title TEXT NOT NULL,
  first_assignment TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
