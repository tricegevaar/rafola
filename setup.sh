#!/bin/bash

# HealTogether Setup Script
# This script automates the initial setup process

set -e

echo "🏥 HealTogether Setup Script"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detected${NC}"

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo -e "${RED}⚠️  PostgreSQL not found. You'll need to set up a database manually.${NC}"
else
    echo -e "${GREEN}✅ PostgreSQL detected${NC}"
fi

echo ""
echo "📦 Installing dependencies..."
echo ""

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Set up environment files
echo "🔧 Setting up environment files..."

if [ ! -f .env.local ]; then
    cp .env.local.example .env.local
    echo -e "${GREEN}✅ Created .env.local${NC}"
else
    echo -e "${BLUE}ℹ️  .env.local already exists${NC}"
fi

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    
    # Generate JWT secret
    JWT_SECRET=$(openssl rand -base64 32)
    
    # Update JWT_SECRET in backend/.env
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/your-super-secret-jwt-key-change-this/$JWT_SECRET/" backend/.env
    else
        # Linux
        sed -i "s/your-super-secret-jwt-key-change-this/$JWT_SECRET/" backend/.env
    fi
    
    echo -e "${GREEN}✅ Created backend/.env with generated JWT secret${NC}"
else
    echo -e "${BLUE}ℹ️  backend/.env already exists${NC}"
fi

echo ""
echo "🗄️  Database setup..."
echo ""

# Ask if user wants to create database
read -p "Do you want to create the database now? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter database name (default: healtogether): " DB_NAME
    DB_NAME=${DB_NAME:-healtogether}
    
    read -p "Enter PostgreSQL username (default: postgres): " DB_USER
    DB_USER=${DB_USER:-postgres}
    
    # Try to create database
    if command -v createdb &> /dev/null; then
        createdb -U $DB_USER $DB_NAME 2>/dev/null && echo -e "${GREEN}✅ Database created${NC}" || echo -e "${BLUE}ℹ️  Database may already exist${NC}"
    else
        echo -e "${BLUE}ℹ️  Please create database manually: CREATE DATABASE $DB_NAME;${NC}"
    fi
    
    # Update DATABASE_URL in backend/.env
    DB_URL="postgresql://$DB_USER:postgres@localhost:5432/$DB_NAME"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' "s|DATABASE_URL=.*|DATABASE_URL=$DB_URL|" backend/.env
    else
        sed -i "s|DATABASE_URL=.*|DATABASE_URL=$DB_URL|" backend/.env
    fi
    
    echo ""
    echo "Running database migrations..."
    cd backend
    npm run prisma:migrate || echo -e "${RED}❌ Migration failed. Please check your database connection.${NC}"
    
    echo ""
    echo "Generating Prisma client..."
    npm run prisma:generate
    
    echo ""
    read -p "Do you want to seed the database with sample data? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm run prisma:seed
        echo -e "${GREEN}✅ Database seeded${NC}"
    fi
    
    cd ..
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API URLs (if different from defaults)"
echo "2. Update backend/.env with your database credentials (if needed)"
echo "3. Get a Daily.co API key for video features (optional): https://daily.co"
echo ""
echo "To start the development servers:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 (Frontend):"
echo "  npm run dev"
echo ""
echo "Then visit: http://localhost:3000"
echo ""
echo -e "${GREEN}Happy coding! 💙${NC}"
