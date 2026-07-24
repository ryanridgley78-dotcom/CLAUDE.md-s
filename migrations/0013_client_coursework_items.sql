CREATE TABLE IF NOT EXISTS client_coursework_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_email TEXT NOT NULL,
  client_name TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('course', 'assignment', 'daily_report', 'journal', 'dream')),
  title TEXT NOT NULL,
  instructions TEXT NOT NULL DEFAULT '',
  due_date TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'assigned',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_client_coursework_items_client
ON client_coursework_items (client_email, updated_at DESC, created_at DESC);
