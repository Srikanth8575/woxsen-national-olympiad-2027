@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22 or 24 before starting this website.
  pause
  exit /b 1
)
if not exist "node_modules\next\package.json" (
  call npm ci
  if errorlevel 1 (
    pause
    exit /b 1
  )
)
echo Open http://127.0.0.1:3127 in your browser when Ready appears below.
call npm run dev -- --port 3127 --hostname 127.0.0.1
pause
