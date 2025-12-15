@echo off
echo 🌱 Rafola Deployment Setup
echo ========================

echo.
echo Step 1: Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    echo Then run this script again.
    pause
    exit /b 1
)
echo ✅ Git is installed!

echo.
echo Step 2: Initializing Git repository...
if not exist .git (
    git init
    echo ✅ Git repository initialized!
) else (
    echo ✅ Git repository already exists!
)

echo.
echo Step 3: Adding files to Git...
git add .
echo ✅ Files added to Git!

echo.
echo Step 4: Creating initial commit...
git commit -m "Initial commit - Rafola mental health platform"
echo ✅ Initial commit created!

echo.
echo 🎉 Setup complete!
echo.
echo Next steps:
echo 1. Create a GitHub repository at: https://github.com/new
echo 2. Name it: rafola
echo 3. Make it Public
echo 4. Copy the repository URL
echo 5. Run: git remote add origin YOUR_GITHUB_URL
echo 6. Run: git push -u origin main
echo.
echo Then follow the DEPLOYMENT_GUIDE.md for full deployment!
echo.
pause