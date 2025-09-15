INSERT INTO bundles (id, name, description) VALUES
(1, 'Farmer Starter Pack', 'Essential crops for beginners'),
(2, 'Fruit Basket', 'A sweet collection of fruits'),
(3, 'Seafood Feast', 'Fresh catches from the water'),
(4, 'Miner’s Kit', 'Resources for mining and crafting'),
(5, 'Toolbox', 'Basic farming tools'),
(6, 'Berry Delight', 'Assorted berries from the valley'),
(7, 'Veggie Pack', 'Popular vegetables for cooking'),
(8, 'Luxury Feast', 'Premium mix of delicacies'),
(9, 'Flower Bouquet', 'A bundle of beautiful flowers'),
(10, 'Tropical Mix', 'Exotic fruits from distant lands');

INSERT INTO bundle_items (bundle_id, product_id) VALUES
-- 1: Farmer Starter Pack
(1, 1), (1, 2), (1, 3), (1, 16), (1, 17),
-- 2: Fruit Basket
(2, 4), (2, 5), (2, 6), (2, 23), (2, 24),
-- 3: Seafood Feast
(3, 7), (3, 8), (3, 9), (3, 27), (3, 28),
-- 4: Miner’s Kit
(4, 10), (4, 11), (4, 12), (4, 31), (4, 32),
-- 5: Toolbox
(5, 13), (5, 14), (5, 15), (5, 36), (5, 37),
-- 6: Berry Delight
(6, 4), (6, 5), (6, 24), (6, 99), (6, 100),
-- 7: Veggie Pack
(7, 18), (7, 19), (7, 81), (7, 82), (7, 83),
-- 8: Luxury Feast
(8, 35), (8, 9), (8, 67), (8, 74), (8, 80),
-- 9: Flower Bouquet
(9, 56), (9, 57), (9, 58), (9, 59), (9, 60),
-- 10: Tropical Mix
(10, 73), (10, 76), (10, 77), (10, 78), (10, 79);