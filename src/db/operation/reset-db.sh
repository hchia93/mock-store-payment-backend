#!/bin/bash
# reset-db.sh
# Fully reset mock_store_db (drop, recreate, load schema, load sample data)
# Equivalent to Windows reset-db.bat

set -e  # Stop on first error

DB_NAME="mock_store_db"
DB_USER="postgres"
DB_HOST="localhost"

echo "========================================"
echo "RESETTING DATABASE COMPLETELY"
echo "========================================"

echo "Step 1: Dropping and recreating database..."
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"

echo "Step 2: Creating schema..."
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f migrations/schema/account.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f migrations/schema/product.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f migrations/schema/price.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f migrations/schema/purchase.sql

echo "Step 3: Loading sample data..."
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/data/account-data.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/data/product-data.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/data/price-data.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/data/purchase-data.sql

echo "========================================"
echo "✅ DATABASE RESET COMPLETE!"
echo "========================================"
