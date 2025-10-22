-- Reset all data while preserving schema
-- Order matters due to foreign key constraints

TRUNCATE TABLE bundle_item RESTART IDENTITY CASCADE;
TRUNCATE TABLE bundle RESTART IDENTITY CASCADE;
TRUNCATE TABLE bundle_price_version RESTART IDENTITY CASCADE;
TRUNCATE TABLE product_price_version RESTART IDENTITY CASCADE; 
TRUNCATE TABLE product RESTART IDENTITY CASCADE;

TRUNCATE TABLE account RESTART IDENTITY CASCADE;
TRUNCATE TABLE cart RESTART IDENTITY CASCADE;
TRUNCATE TABLE purchase RESTART IDENTITY CASCADE;

-- Optional: Reset sequences to ensure clean IDs
-- This is already handled by RESTART IDENTITY above