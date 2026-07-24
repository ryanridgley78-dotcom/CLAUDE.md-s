CREATE TABLE IF NOT EXISTS client_reflections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_email TEXT NOT NULL,
  client_name TEXT NOT NULL,
  reflection_type TEXT NOT NULL CHECK (reflection_type IN ('journal', 'dream')),
  reflection_date TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  elder_notes TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_client_reflections_type_date
ON client_reflections (reflection_type, reflection_date DESC, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_client_reflections_client_date
ON client_reflections (client_email, reflection_date DESC, created_at DESC);
