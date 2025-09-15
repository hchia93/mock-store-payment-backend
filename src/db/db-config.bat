@echo off
REM Database configuration - modify these variables as needed
set DB_HOST=localhost
set DB_PORT=5432
set DB_USER=postgres
set DB_NAME=mock_store_db

REM Change to project root directory (2 levels up from src/db/)
REM Note: This script should be called when already at project root
echo DEBUG: db-config.bat called from: %CD%

REM Set environment variables for psql
set PGPASSFILE=%APPDATA%\postgresql\pgpass.conf

REM Check if pgpass file exists
if not exist "%PGPASSFILE%" (
    echo ERROR: pgpass.conf not found at %PGPASSFILE%
    echo Please run setup-pgpass.bat first
    pause
    exit /b 1
)

REM Common psql command template
set PSQL_CMD=psql -h %DB_HOST% -p %DB_PORT% -U %DB_USER% -v ON_ERROR_STOP=1

echo DEBUG: Configuration loaded successfully
echo DEBUG: PSQL_CMD = %PSQL_CMD%
echo DEBUG: DB_NAME = %DB_NAME%