#!/bin/bash

echo "🎮 Starting your game..."

# Function to cleanup background processes
cleanup() {
    echo "🛑 Stopping all services..."
    pkill -f "uvicorn" || true
    pkill -f "yarn start" || true
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend
echo "🚀 Starting backend server..."
cd backend
source ../venv/bin/activate
python -m uvicorn server_simple:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🚀 Starting frontend server..."
cd ../frontend
yarn start &
FRONTEND_PID=$!

echo ""
echo "🎉 Your game is starting up!"
echo ""
echo "📱 Access your game at:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API Documentation: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all services"

# Wait for processes
wait