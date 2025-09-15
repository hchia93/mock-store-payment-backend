@echo off
echo ===========================================
echo DEBUG SCRIPT - Testing paths and config
echo ===========================================

echo Current script location: %~dp0
echo Script full path: %0

echo.
echo Testing path navigation...
echo Before pushd: %CD%

REM From src/db/operation/ we need to go up 3 levels to reach project root
pushd "%~dp0..\..\..\"
if errorlevel 1 (
    echo ERROR: Cannot navigate to project root
    pause
    exit /b 1
)

echo After pushd: %CD%
echo.

echo Checking for required files:
if exist "migrations\init.sql" (
    echo ✓ migrations\init.sql found
) else (
    echo ✗ migrations\init.sql NOT FOUND
)

if exist "src\db\data\product.sql" (
    echo ✓ src\db\data\product.sql found
) else (
    echo ✗ src\db\data\product.sql NOT FOUND
)

if exist "src\db\data\account.sql" (
    echo ✓ src\db\data\account.sql found
) else (
    echo ✗ src\db\data\account.sql NOT FOUND
)

if exist "src\db\data\order.sql" (
    echo ✓ src\db\data\order.sql found
) else (
    echo ✗ src\db\data\order.sql NOT FOUND
)

echo.
echo Directory contents:
dir /b

echo.
echo Testing db-config.bat...
call "src\db\db-config.bat"
if errorlevel 1 (
    echo ERROR: db-config.bat failed
) else (
    echo SUCCESS: db-config.bat loaded
    echo PSQL_CMD: %PSQL_CMD%
    echo DB_NAME: %DB_NAME%
)

popd
pause