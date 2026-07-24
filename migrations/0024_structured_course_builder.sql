ALTER TABLE account_paths ADD COLUMN course_code TEXT NOT NULL DEFAULT '';
ALTER TABLE account_paths ADD COLUMN course_status TEXT NOT NULL DEFAULT 'draft';
ALTER TABLE account_paths ADD COLUMN learning_objectives TEXT NOT NULL DEFAULT '';
ALTER TABLE account_paths ADD COLUMN completion_requirements TEXT NOT NULL DEFAULT '';
ALTER TABLE account_paths ADD COLUMN modules_json TEXT NOT NULL DEFAULT '[]';
