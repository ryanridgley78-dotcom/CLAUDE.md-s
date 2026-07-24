CREATE TABLE portal_users_new (
  email TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'elder', 'member', 'client')),
  status TEXT NOT NULL DEFAULT 'active',
  password_iterations INTEGER NOT NULL,
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO portal_users_new (
  email,
  name,
  role,
  status,
  password_iterations,
  password_salt,
  password_hash,
  created_at,
  updated_at
)
SELECT
  email,
  name,
  role,
  status,
  password_iterations,
  password_salt,
  password_hash,
  created_at,
  updated_at
FROM portal_users;

DROP TABLE portal_users;
ALTER TABLE portal_users_new RENAME TO portal_users;

CREATE TABLE portal_invites_new (
  token_hash TEXT PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'editor', 'elder', 'member', 'client')),
  status TEXT NOT NULL DEFAULT 'active',
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO portal_invites_new (
  token_hash,
  email,
  name,
  role,
  status,
  expires_at,
  used_at,
  created_at
)
SELECT
  token_hash,
  email,
  name,
  role,
  status,
  expires_at,
  used_at,
  created_at
FROM portal_invites;

DROP TABLE portal_invites;
ALTER TABLE portal_invites_new RENAME TO portal_invites;
