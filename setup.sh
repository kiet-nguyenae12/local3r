#!/bin/bash

# Local3R - Setup Script
# Automatic setup for both frontend and backend

echo "🚀 Welcome to Local3R Setup!"
echo "=============================="

# Check Node.js installation
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js $(node -v) is installed"
echo "✅ npm $(npm -v) is installed"

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend
cp .env.example .env.local
npm install
echo "✅ Frontend setup complete!"

# Setup Backend
echo ""
echo "🔧 Setting up Backend..."
cd ../backend
cp .env.example .env
npm install
echo "✅ Backend setup complete!"

echo ""
echo "=============================="
echo "✨ Setup Complete!"
echo ""
echo "📝 Next Steps:"
echo "1. Update .env file in backend/ with your MongoDB connection"
echo "2. Start MongoDB: mongod"
echo "3. Start Backend: cd backend && npm run dev"
echo "4. Start Frontend: cd frontend && npm run dev"
echo ""
echo "🌐 Access the app at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo "   Admin:    http://localhost:3000/admin"
echo ""
