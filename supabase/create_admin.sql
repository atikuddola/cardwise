-- Run this in Supabase SQL Editor to create admin table and add admin user

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert admin user (password: admin123)
-- Using bcrypt hash - $2b$10$KbQiQ8rW0lP3yQKZ7zqW4u is a sample hash for 'admin123'
-- You should generate your own bcrypt hash for production
INSERT INTO admins (email, password) 
VALUES ('shaon@cardwise.com', '$2a$12$nDlzqJk1R8z5YTX8fG4Zt.99bi723YMMZhSE7ln8tW4j9uGyP.z32')
ON CONFLICT (email) DO NOTHING;

INSERT INTO admins (email, password) 
VALUES ('shams@cardwise.com', '$2a$12$SZ5z0vCFpwiLaIT7vF6CNO5CQLLJi0EB/mvJxnK5ngoPBAjEkSV7m')
ON CONFLICT (email) DO NOTHING;

-- Verify
SELECT id, email, created_at FROM admins;
