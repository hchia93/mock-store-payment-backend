@echo off
REM Change to project root directory (4 levels up from src/db/operation/)
cd /d "%~dp0..\..\.."

call src\db\db-config.bat
if errorlevel 1 exit /b 1

echo ========================================
echo RESETTING DATA ONLY
echo ========================================

echo Step 1: Truncating all tables...
%PSQL_CMD% -d %DB_NAME% -f src/db/operation/reset-data.sql
if errorlevel 1 (
    echo FAILED: Could not truncate tables
    pause
    exit /b 1
)

echo Step 2: Reloading sample data...
%PSQL_CMD% -d %DB_NAME% -f src\db\data\product.sql
%PSQL_CMD% -d %DB_NAME% -f src\db\data\account.sql
%PSQL_CMD% -d %DB_NAME% -f src\db\data\order.sql
if errorlevel 1 (
    echo FAILED: Could not load sample data
    pause
    exit /b 1
)

echo ========================================
echo DATA RESET COMPLETE!
echo ========================================
pause