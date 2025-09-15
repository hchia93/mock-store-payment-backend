-- Demo data: 10 users
INSERT INTO users (id, username, password_hash, email, created_at) VALUES
(1, 'sunny_farm', 'hash_pw_123', 'sunny_farm@example.com', NOW()),
(2, 'blueberry_lover', 'hash_pw_234', 'blueberry_lover@example.com', NOW()),
(3, 'ironminer', 'hash_pw_345', 'ironminer@example.com', NOW()),
(4, 'carrot_top', 'hash_pw_456', 'carrot_top@example.com', NOW()),
(5, 'orchid_girl', 'hash_pw_567', 'orchid_girl@example.com', NOW()),
(6, 'lobster_king', 'hash_pw_678', 'lobster_king@example.com', NOW()),
(7, 'pickaxe_pro', 'hash_pw_789', 'pickaxe_pro@example.com', NOW()),
(8, 'gold_digger', 'hash_pw_890', 'gold_digger@example.com', NOW()),
(9, 'berryhunter', 'hash_pw_901', 'berryhunter@example.com', NOW()),
(10, 'mushroom_boy', 'hash_pw_012', 'mushroom_boy@example.com', NOW());

-- todo: password to use bcrypt hash. 