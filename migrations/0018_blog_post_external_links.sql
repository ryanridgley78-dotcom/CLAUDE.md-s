ALTER TABLE blog_posts ADD COLUMN post_type TEXT NOT NULL DEFAULT 'internal';
ALTER TABLE blog_posts ADD COLUMN external_url TEXT NOT NULL DEFAULT '';
ALTER TABLE blog_posts ADD COLUMN source_name TEXT NOT NULL DEFAULT '';
