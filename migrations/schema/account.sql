CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    handle_name VARCHAR(50) UNIQUE NOT NULL,
    display_name VARCHAR(50) NOT NULL,
    password_hash TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES account(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES product(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1,
    product_version INT NOT NULL,
    price_snapshot DECIMAL(10,2) NOT NULL, -- Price at the time of adding to cart
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(account_id, product_id)
);

-- Trigger for auto-updating updated_at
CREATE OR REPLACE FUNCTION update_cart_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_cart_timestamp
BEFORE UPDATE ON cart
FOR EACH ROW
EXECUTE FUNCTION update_cart_timestamp();