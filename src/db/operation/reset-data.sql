-- Reset all data while preserving schema
-- Order matters due to foreign key constraints

TRUNCATE TABLE bundle_item RESTART IDENTITY CASCADE;
TRUNCATE TABLE bundle RESTART IDENTITY CASCADE;
TRUNCATE TABLE bundles_price_version RESTART IDENTITY CASCADE;
TRUNCATE TABLE product_price_version RESTART IDENTITY CASCADE; 
TRUNCATE TABLE product RESTART IDENTITY CASCADE;

TRUNCATE TABLE users RESTART IDENTITY CASCADE;
TRUNCATE TABLE purchase RESTART IDENTITY CASCADE;

-- Optional: Reset sequences to ensure clean IDs
-- This is already handled by RESTART IDENTITY above