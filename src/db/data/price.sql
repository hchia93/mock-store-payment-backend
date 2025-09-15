-- Insert product versions
-- v1 price for all 100 product. 
-- Price range referencing stardew valley
-- Vegetables: 10–30, Fruits: 20–60, Seafood: 50–150,
-- Ores/Gems: 40–200, Tools: 100–500, Flowers: 20–80,
-- Animal/Artisan goods: 30–150, Forage: 15–70

INSERT INTO product_price_version (product_id, version, price) VALUES
(1, 1, 15.00),  -- Turnip
(2, 1, 12.00),  -- Carrot
(3, 1, 20.00),  -- Potato
(4, 1, 50.00),  -- Strawberry
(5, 1, 45.00),  -- Blueberry
(6, 1, 40.00),  -- Apple
(7, 1, 120.00), -- Salmon
(8, 1, 90.00),  -- Crab
(9, 1, 140.00), -- Lobster
(10, 1, 40.00), -- Copper Ore
(11, 1, 60.00), -- Iron Ore
(12, 1, 100.00),-- Gold Ore
(13, 1, 200.00),-- Axe
(14, 1, 250.00),-- Pickaxe
(15, 1, 150.00),-- Hoe
(16, 1, 15.00), -- Wheat
(17, 1, 18.00), -- Corn
(18, 1, 25.00), -- Tomato
(19, 1, 40.00), -- Pumpkin
(20, 1, 55.00), -- Melon
(21, 1, 45.00), -- Peach
(22, 1, 35.00), -- Pear
(23, 1, 30.00), -- Cherry
(24, 1, 32.00), -- Grapes
(25, 1, 40.00), -- Banana
(26, 1, 50.00), -- Coconut
(27, 1, 80.00), -- Shrimp
(28, 1, 110.00),-- Tuna
(29, 1, 60.00), -- Clam
(30, 1, 55.00), -- Mussel
(31, 1, 20.00), -- Coal
(32, 1, 90.00), -- Silver Ore
(33, 1, 120.00),-- Amethyst
(34, 1, 150.00),-- Emerald
(35, 1, 200.00),-- Diamond
(36, 1, 180.00),-- Hammer
(37, 1, 220.00),-- Fishing Rod
(38, 1, 160.00),-- Watering Can
(39, 1, 140.00),-- Scythe
(40, 1, 60.00), -- Milk
(41, 1, 30.00), -- Egg
(42, 1, 70.00), -- Wool
(43, 1, 90.00), -- Cheese
(44, 1, 50.00), -- Mayonnaise
(45, 1, 80.00), -- Honey
(46, 1, 120.00),-- Wine
(47, 1, 100.00),-- Beer
(48, 1, 90.00), -- Cloth
(49, 1, 70.00), -- Maple Syrup
(50, 1, 40.00), -- Pine Resin
(51, 1, 60.00), -- Oak Resin
(52, 1, 15.00), -- Stone
(53, 1, 25.00), -- Wood
(54, 1, 20.00), -- Clay
(55, 1, 18.00), -- Fiber
(56, 1, 40.00), -- Sunflower
(57, 1, 35.00), -- Tulip
(58, 1, 60.00), -- Rose
(59, 1, 75.00), -- Orchid
(60, 1, 30.00), -- Daffodil
(61, 1, 25.00), -- Seaweed
(62, 1, 100.00),-- Eel
(63, 1, 130.00),-- Octopus
(64, 1, 110.00),-- Squid
(65, 1, 70.00), -- Trout
(66, 1, 50.00), -- Carp
(67, 1, 180.00),-- Sturgeon
(68, 1, 40.00), -- Anchovy
(69, 1, 45.00), -- Herring
(70, 1, 35.00), -- Sardine
(71, 1, 28.00), -- Plum
(72, 1, 30.00), -- Apricot
(73, 1, 60.00), -- Mango
(74, 1, 80.00), -- Pomegranate
(75, 1, 55.00), -- Kiwi
(76, 1, 70.00), -- Papaya
(77, 1, 50.00), -- Guava
(78, 1, 65.00), -- Lychee
(79, 1, 90.00), -- Dragonfruit
(80, 1, 100.00),-- Starfruit
(81, 1, 20.00), -- Onion
(82, 1, 22.00), -- Garlic
(83, 1, 25.00), -- Cabbage
(84, 1, 18.00), -- Lettuce
(85, 1, 24.00), -- Spinach
(86, 1, 28.00), -- Radish
(87, 1, 30.00), -- Beet
(88, 1, 20.00), -- Parsnip
(89, 1, 26.00), -- Broccoli
(90, 1, 32.00), -- Cauliflower
(91, 1, 25.00), -- Bell Pepper
(92, 1, 30.00), -- Chili Pepper
(93, 1, 28.00), -- Eggplant
(94, 1, 22.00), -- Zucchini
(95, 1, 24.00), -- Cucumber
(96, 1, 35.00), -- Mushroom
(97, 1, 150.00),-- Truffle
(98, 1, 40.00), -- Hazelnut
(99, 1, 25.00), -- Blackberry
(100, 1, 45.00);-- Spice Berry

-- Bundle v1 prices
INSERT INTO bundle_price_version (bundle_id, version, price) VALUES
(1, 1, 80.00),   -- Farmer Starter Pack (Turnip+Carrot+Potato+Wheat+Corn)
(2, 1, 197.00),  -- Fruit Basket (Strawberry+Blueberry+Apple+Cherry+Grapes)
(3, 1, 460.00),  -- Seafood Feast (Salmon+Crab+Lobster+Shrimp+Tuna)
(4, 1, 310.00),  -- Miner’s Kit (Copper+Iron+Gold+Coal+Silver)
(5, 1, 1010.00), -- Toolbox (Axe+Pickaxe+Hoe+Hammer+Fishing Rod)
(6, 1, 256.00),  -- Berry Delight (Strawberry+Blueberry+Grapes+Blackberry+Spice Berry)
(7, 1, 135.00),  -- Veggie Pack (Tomato+Pumpkin+Onion+Garlic+Cabbage)
(8, 1, 715.00),  -- Luxury Feast (Diamond+Lobster+Sturgeon+Pomegranate+Starfruit)
(9, 1, 240.00),  -- Flower Bouquet (Sunflower+Tulip+Rose+Orchid+Daffodil)
(10, 1, 385.00); -- Tropical Mix (Mango+Papaya+Guava+Lychee+Dragonfruit)
