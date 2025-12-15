# HealTogether Setup Script for Windows PowerShell
# Run with: .\setup.ps1

Write-Host "🏥 HealTogether Setup Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check if PostgreSQL is installed
try {
    $null = Get-Command psql -ErrorAction Stop
    Write-Host "✅ PostgreSQL detected" -ForegroundColor Green
} catch {
    Write-Host "⚠️  PostgreSQL not found. You'll need to set up a database manually." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
Write-Host ""

# Install frontend dependencies
Write-Host "Installing frontend dependencies..."
npm install

# Install backend dependencies
Write-Host "Installing backend dependencies..."
Set-Location backend
npm install
Set-Location ..

Write-Host "✅ Dependencies installed" -ForegroundColor Green
Write-Host ""

# Set up environment files
Write-Host "🔧 Setting up environment files..." -ForegroundColor Cyan

if (-not (Test-Path .env.local)) {
    Copy-Item .env.local.example .env.local
    Write-Host "✅ Created .env.local" -ForegroundColor Green
} else {
    Write-Host "ℹ️  .env.local already exists" -ForegroundColor Blue
}

if (-not (Test-Path backend\.env)) {
    Copy-Item backend\.env.example backend\.env
    
    # Generate JWT secret
    $bytes = New-Object byte[] 32
    [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    $JWT_SECRET = [Convert]::ToBase64String($bytes)
    
    # Update JWT_SECRET in backend\.env
    $envContent = Get-Content backend\.env
    $envContent = $envContent -replace 'your-super-secret-jwt-key-change-this', $JWT_SECRET
    $envContent | Set-Content backend\.env
    
    Write-Host "✅ Created backend\.env with generated JWT secret" -ForegroundColor Green
} else {
    Write-Host "ℹ️  backend\.env already exists" -ForegroundColor Blue
}

Write-Host ""
Write-Host "🗄️  Database setup..." -ForegroundColor Cyan
Write-Host ""

$createDb = Read-Host "Do you want to create the database now? (y/n)"
if ($createDb -eq 'y' -or $createDb -eq 'Y') {
    $dbName = Read-Host "Enter database name (default: healtogether)"
    if ([string]::IsNullOrWhiteSpace($dbName)) { $dbName = "healtogether" }
    
    $dbUser = Read-Host "Enter PostgreSQL username (default: postgres)"
    if ([string]::IsNullOrWhiteSpace($dbUser)) { $dbUser = "postgres" }
    
    # Try to create database
    try {
        & createdb -U $dbUser $dbName 2>$null
        Write-Host "✅ Database created" -ForegroundColor Green
    } catch {
        Write-Host "ℹ️  Database may already exist or createdb not available" -ForegroundColor Blue
    }
    
    # Update DATABASE_URL in backend\.env
    $dbUrl = "postgresql://${dbUser}:postgres@localhost:5432/${dbName}"
    $envContent = Get-Content backend\.env
    $envContent = $envContent -replace 'DATABASE_URL=.*', "DATABASE_URL=$dbUrl"
    $envContent | Set-Content backend\.env
    
    Write-Host ""
    Write-Host "Running database migrations..."
    Set-Location backend
    try {
        npm run prisma:migrate
    } catch {
        Write-Host "❌ Migration failed. Please check your database connection." -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "Generating Prisma client..."
    npm run prisma:generate
    
    Write-Host ""
    $seedDb = Read-Host "Do you want to seed the database with sample data? (y/n)"
    if ($seedDb -eq 'y' -or $seedDb -eq 'Y') {
        npm run prisma:seed
        Write-Host "✅ Database seeded" -ForegroundColor Green
    }
    
    Set-Location ..
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Update .env.local with your API URLs (if different from defaults)"
Write-Host "2. Update backend\.env with your database credentials (if needed)"
Write-Host "3. Get a Daily.co API key for video features (optional): https://daily.co"
Write-Host ""
Write-Host "To start the development servers:"
Write-Host ""
Write-Host "Terminal 1 (Backend):"
Write-Host "  cd backend"
Write-Host "  npm run dev"
Write-Host ""
Write-Host "Terminal 2 (Frontend):"
Write-Host "  npm run dev"
Write-Host ""
Write-Host "Then visit: http://localhost:3000"
Write-Host ""
Write-Host "Happy coding! 💙" -ForegroundColor Green
