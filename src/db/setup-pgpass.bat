@echo off
echo Setting up PostgreSQL password file...

set PGPASS_DIR=%APPDATA%\postgresql
set PGPASS_FILE=%PGPASS_DIR%\pgpass.conf

if not exist "%PGPASS_DIR%" (
    echo Creating PostgreSQL config directory...
    mkdir "%PGPASS_DIR%"
)

set /p DB_PASS=Enter password for postgres user: 

echo Creating pgpass.conf file...
echo|set /p="localhost:5432:*:postgres:%DB_PASS%" > "%PGPASS_FILE%"

echo.
echo IMPORTANT: Edit the file at:
echo %PGPASS_FILE%
echo.
echo Edit pgpass.conf manually if needed.
echo.
pause