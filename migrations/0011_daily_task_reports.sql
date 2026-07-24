CREATE TABLE IF NOT EXISTS daily_task_reports (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  client_email TEXT NOT NULL,
  client_name TEXT NOT NULL,
  report_date TEXT NOT NULL,
  completed_tasks TEXT NOT NULL DEFAULT '',
  progress_notes TEXT NOT NULL DEFAULT '',
  blockers TEXT NOT NULL DEFAULT '',
  next_steps TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_daily_task_reports_client_date
ON daily_task_reports (client_email, report_date DESC, created_at DESC);
