-- Schema for mock_store_db (run with -d mock_store_db)

-- Accounts
CREATE TABLE IF NOT EXISTS account (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products
CREATE TABLE IF NOT EXISTS product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product versions
CREATE TABLE IF NOT EXISTS product_price_version (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL REFERENCES product(id),
    version INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, version)
);

CREATE TABLE IF NOT EXISTS bundle (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bundle_item (
    bundle_id INT NOT NULL REFERENCES bundle(id) ON DELETE CASCADE,
    product_id INT NOT NULL REFERENCES product(id),
    PRIMARY KEY (bundle_id, product_id)
);

CREATE TABLE IF NOT EXISTS bundle_price_version (
    id SERIAL PRIMARY KEY,
    bundle_id INT NOT NULL REFERENCES bundle(id) ON DELETE CASCADE,
    version INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (bundle_id, version)
);

CREATE TABLE IF NOT EXISTS purchase (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES account(id),
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
