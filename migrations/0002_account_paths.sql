CREATE TABLE IF NOT EXISTS account_paths (
  account_type TEXT PRIMARY KEY CHECK (account_type IN ('Widows', 'Orphans', 'Patriarchs')),
  path_title TEXT NOT NULL,
  overview TEXT NOT NULL DEFAULT '',
  first_lesson TEXT NOT NULL DEFAULT '',
  first_assignment TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
