:: Script: Launch Elevated PowerShell

@echo off
setlocal

:: Get absolute path of current script's parent folder (repo root)
cd /d "%~dp0"
cd ..
set "REPO_ROOT=%CD%"

:: Launch elevated PowerShell at repo root and run npm
powershell -NoProfile -Command ^
  "Start-Process powershell -Verb RunAs -ArgumentList '-NoExit','-ExecutionPolicy RemoteSigned','-WorkingDirectory \"%REPO_ROOT%\"','-Command npm run dev'"

endlocal
