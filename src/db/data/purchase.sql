-- Insert mock orders

SELECT setval('purchase_id_seq', (SELECT COALESCE(MAX(id), 0)+1 FROM purchase));