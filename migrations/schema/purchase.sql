CREATE TABLE IF NOT EXISTS purchase (
    id SERIAL PRIMARY KEY,
    account_id INT NOT NULL REFERENCES account(id),
    is_bundle BOOLEAN DEFAULT FALSE,

    product_id INT REFERENCES product(id),
    product_version INT,

    bundle_id INT REFERENCES bundle(id),
    bundle_version INT,

    amount DECIMAL(10,2) NOT NULL,

    purchase_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_product_version FOREIGN KEY (product_id, product_version)
        REFERENCES product_price_version(product_id, version),

    CONSTRAINT fk_bundle_version FOREIGN KEY (bundle_id, bundle_version)
        REFERENCES bundle_price_version(bundle_id, version)
);
