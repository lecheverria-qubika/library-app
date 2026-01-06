-- Script to initialize users with hashed passwords
-- This script should be executed after creating the database
-- The hashed passwords correspond to "password123"

USE library_db;

-- Delete sample users if they exist
DELETE FROM users WHERE username IN ('admin', 'user');

-- Insert sample users
INSERT INTO users (username, password, role) VALUES
('admin', '$2a$10$1vwz6wpxpy.fC//AgbpoP.3jApXOZfGZR8jZtllo7mg58LD4Aru.C', 'admin'),
('user', '$2a$10$1vwz6wpxpy.fC//AgbpoP.3jApXOZfGZR8jZtllo7mg58LD4Aru.C', 'regular');

