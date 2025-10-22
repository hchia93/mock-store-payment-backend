#!/bin/bash
# reset-data.sh
# Reset and reload sample data for mock_store_db on Linux

set -e  # Stop on first error

DB_NAME="mock_store_db"
DB_USER="postgres"
DB_HOST="localhost"

echo "========================================"
echo "RESETTING DATA ONLY"
echo "========================================"

echo "Step 1: Truncating all tables..."
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/operation/reset-data.sql

echo "Step 2: Reloading sample data..."
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/data/product-data.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/data/price-data.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/data/account-data.sql
psql -v ON_ERROR_STOP=1 -h "$DB_HOST" -U "$DB_USER" -d "$DB_NAME" -f src/db/data/purchase-data.sql

echo "========================================"
echo "✅ DATA RESET COMPLETE!"
echo "========================================"
