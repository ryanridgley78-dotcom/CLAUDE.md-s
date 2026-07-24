ALTER TABLE client_coursework_items ADD COLUMN module_index INTEGER NOT NULL DEFAULT -1;

CREATE TABLE IF NOT EXISTS client_module_progress (
  client_email TEXT NOT NULL,
  account_type TEXT NOT NULL,
  module_index INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'awaiting_review', 'complete', 'not_required')),
  elder_notes TEXT NOT NULL DEFAULT '',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (client_email, account_type, module_index)
);
