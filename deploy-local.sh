#!/bin/bash

# Local Game Deployment Script (No Docker Required)
set -e

echo "🎮 Starting local game deployment..."

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is not installed. Please install Python3 first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if yarn is installed
if ! command -v yarn &> /dev/null; then
    echo "❌ Yarn is not installed. Please install Yarn first."
    exit 1
fi

# Function to cleanup background processes
cleanup() {
    echo "🛑 Stopping all services..."
    pkill -f "uvicorn server:app" || true
    pkill -f "yarn start" || true
    pkill -f "python3 -m http.server" || true
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

echo "📦 Installing backend dependencies..."
cd backend
python3 -m pip install -r requirements.txt

echo "📦 Installing frontend dependencies..."
cd ../frontend
yarn install

echo "🔨 Building frontend..."
yarn build

echo "🚀 Starting backend server..."
cd ../backend
# Set environment variables for local development
export MONGO_URL="mongodb://localhost:27017/"
export DB_NAME="game_db"
export CORS_ORIGINS="http://localhost:3000,http://localhost:80,http://localhost:8080"

# Start backend in background
python3 -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

echo "🚀 Starting frontend server..."
cd ../frontend
# Start frontend in background
yarn start &
FRONTEND_PID=$!

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 5

# Check if services are running
echo "🔍 Checking service status..."

# Test backend
if curl -f http://localhost:8000/api/ > /dev/null 2>&1; then
    echo "✅ Backend API is running on http://localhost:8000"
else
    echo "❌ Backend API is not responding"
fi

# Test frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is running on http://localhost:3000"
else
    echo "❌ Frontend is not responding"
fi

echo ""
echo "🎉 Local deployment completed successfully!"
echo ""
echo "📱 Access your game at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Documentation: http://localhost:8000/docs"
echo ""
echo "⚠️  Note: This is a development setup without MongoDB."
echo "   For full functionality, you'll need to set up MongoDB separately."
echo ""
echo "🔧 Useful commands:"
echo "   View backend logs: tail -f backend/logs/app.log"
echo "   Stop services: Ctrl+C"
echo "   Restart backend: pkill -f uvicorn && cd backend && python3 -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload &"
echo "   Restart frontend: pkill -f 'yarn start' && cd frontend && yarn start &"
echo ""
echo "Press Ctrl+C to stop all services"

# Keep script running
wait