@echo off
REM Change to project root directory (4 levels up from src/db/operation/)
cd /d "%~dp0..\..\.."

call src\db\db-config.bat
if errorlevel 1 exit /b 1

echo ========================================
echo RESETTING DATABASE COMPLETELY
echo ========================================

echo Step 1: Dropping and recreating database...
%PSQL_CMD% -d postgres -c "DROP DATABASE IF EXISTS %DB_NAME%;"
if errorlevel 1 (
    echo FAILED: Could not drop database
    pause
    exit /b 1
)

%PSQL_CMD% -d postgres -c "CREATE DATABASE %DB_NAME%;"
if errorlevel 1 (
    echo FAILED: Could not create database
    pause
    exit /b 1
)

echo Step 2: Creating schema...
%PSQL_CMD% -d %DB_NAME% -f migrations\schema\account.sql
%PSQL_CMD% -d %DB_NAME% -f migrations\schema\product.sql
%PSQL_CMD% -d %DB_NAME% -f migrations\schema\price.sql
%PSQL_CMD% -d %DB_NAME% -f migrations\schema\purchase.sql
if errorlevel 1 (
    echo FAILED: Could not create schema
    pause
    exit /b 1
)

echo Step 3: Loading sample data...
%PSQL_CMD% -d %DB_NAME% -f src\db\data\account-data.sql
%PSQL_CMD% -d %DB_NAME% -f src\db\data\product-data.sql
%PSQL_CMD% -d %DB_NAME% -f src\db\data\price-data.sql
%PSQL_CMD% -d %DB_NAME% -f src\db\data\purchase-data.sql
if errorlevel 1 (
    echo FAILED: Could not load sample data
    pause
    exit /b 1
)

echo ========================================
echo DATABASE RESET COMPLETE!
echo ========================================
pause