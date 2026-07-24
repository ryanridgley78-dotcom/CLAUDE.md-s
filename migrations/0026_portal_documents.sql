CREATE TABLE IF NOT EXISTS portal_documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  document_scope TEXT NOT NULL DEFAULT 'library' CHECK (document_scope IN ('library', 'client')),
  client_email TEXT NOT NULL DEFAULT '',
  client_name TEXT NOT NULL DEFAULT '',
  file_key TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL DEFAULT 'application/octet-stream',
  file_size INTEGER NOT NULL DEFAULT 0,
  uploaded_by_email TEXT NOT NULL DEFAULT '',
  uploaded_by_name TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_portal_documents_client
ON portal_documents (document_scope, client_email, created_at DESC);
