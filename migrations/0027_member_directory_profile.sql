ALTER TABLE portal_users ADD COLUMN public_location_state TEXT NOT NULL DEFAULT '';
ALTER TABLE portal_users ADD COLUMN public_location_enabled INTEGER NOT NULL DEFAULT 0;
