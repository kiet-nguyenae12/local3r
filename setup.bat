@echo off
REM Local3R - Setup Script for Windows
REM Automatic setup for both frontend and backend

echo 🚀 Welcome to Local3R Setup!
echo ==============================

REM Check Node.js installation
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i

echo ✅ Node.js %NODE_VERSION% is installed
echo ✅ npm %NPM_VERSION% is installed

REM Setup Frontend
echo.
echo 📦 Setting up Frontend...
cd frontend
copy .env.example .env.local
call npm install
echo ✅ Frontend setup complete!

REM Setup Backend
echo.
echo 🔧 Setting up Backend...
cd ..\backend
copy .env.example .env
call npm install
echo ✅ Backend setup complete!

echo.
echo ==============================
echo ✨ Setup Complete!
echo.
echo 📝 Next Steps:
echo 1. Update .env file in backend\ with your MongoDB connection
echo 2. Start MongoDB: mongod
echo 3. Start Backend: cd backend ^&^& npm run dev
echo 4. Start Frontend: cd frontend ^&^& npm run dev
echo.
echo 🌐 Access the app at:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:5000
echo    Admin:    http://localhost:3000/admin
echo.
pause
