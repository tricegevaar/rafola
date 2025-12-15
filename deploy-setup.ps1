Write-Host "🌱 Rafola Deployment Setup" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host ""

Write-Host "Step 1: Checking if Git is installed..." -ForegroundColor Yellow
try {
    $gitVersion = git --version 2>$null
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Step 2: Initializing Git repository..." -ForegroundColor Yellow
if (-not (Test-Path ".git")) {
    git init
    Write-Host "✅ Git repository initialized!" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists!" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 3: Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added to Git!" -ForegroundColor Green

Write-Host ""
Write-Host "Step 4: Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit - Rafola mental health platform"
Write-Host "✅ Initial commit created!" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Create a GitHub repository at: https://github.com/new" -ForegroundColor White
Write-Host "2. Name it: rafola" -ForegroundColor White
Write-Host "3. Make it Public" -ForegroundColor White
Write-Host "4. Copy the repository URL" -ForegroundColor White
Write-Host "5. Run: git remote add origin YOUR_GITHUB_URL" -ForegroundColor White
Write-Host "6. Run: git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "Then follow the DEPLOYMENT_GUIDE.md for full deployment!" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to continue"