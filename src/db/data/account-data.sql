-- Demo data: 10 users
INSERT INTO account (id, handle_name, display_name, password_hash, email, created_at) VALUES
(1, 'sunny_farm', 'Sunny Farm' ,'hash_pw_123', 'sunny_farm@example.com', NOW()),
(2, 'blueberry_lover', 'Berry Good', 'hash_pw_234', 'blueberry_lover@example.com', NOW()),
(3, 'ironminer', 'Merci' ,'hash_pw_345', 'ironminer@example.com', NOW()),
(4, 'carrot_top', 'KaRRiot','hash_pw_456', 'carrot_top@example.com', NOW()),
(5, 'orchid_girl', 'Alice Wonderland','hash_pw_567', 'orchid_girl@example.com', NOW()),
(6, 'lobster_king', 'Mr Lobster','hash_pw_678', 'lobster_king@example.com', NOW()),
(7, 'pickaxe_pro', 'Mining Hill','hash_pw_789', 'pickaxe_pro@example.com', NOW()),
(8, 'gold_digger', 'Rosetta' ,'hash_pw_890', 'gold_digger@example.com', NOW()),
(9, 'berryhunter', 'Berry Not Good','hash_pw_901', 'berryhunter@example.com', NOW()),
(10, 'mushroom_boy', 'Mushy','hash_pw_012', 'mushroom_boy@example.com', NOW());

SELECT setval('account_id_seq', (SELECT COALESCE(MAX(id),0)+1 FROM account));