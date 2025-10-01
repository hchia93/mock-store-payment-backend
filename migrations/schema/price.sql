CREATE TABLE IF NOT EXISTS product_price_version (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES product(id),
    version INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, version)
);


CREATE TABLE IF NOT EXISTS bundle_price_version (
    id SERIAL PRIMARY KEY,
    bundle_id INT NOT NULL REFERENCES bundle(id) ON DELETE CASCADE,
    version INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (bundle_id, version)
);