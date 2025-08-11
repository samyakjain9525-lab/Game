#!/bin/bash

# Water Sort Game Deployment Script
echo "🎮 Deploying Water Sort Game..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    sudo usermod -aG docker $USER
    echo "✅ Docker installed. Please log out and log back in, then run this script again."
    exit 1
fi

# Check if Docker Compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose."
    exit 1
fi

# Create environment file if it doesn't exist
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend environment file..."
    cp .env.example backend/.env
fi

# Build and start the application
echo "🏗️  Building and starting the application..."
if command -v docker-compose &> /dev/null; then
    docker-compose down
    docker-compose build
    docker-compose up -d
else
    docker compose down
    docker compose build
    docker compose up -d
fi

echo "✅ Deployment complete!"
echo "🌐 Frontend: http://localhost"
echo "🔧 Backend API: http://localhost:8000"
echo "📊 API Docs: http://localhost:8000/docs"
echo ""
echo "To stop the application, run:"
if command -v docker-compose &> /dev/null; then
    echo "  docker-compose down"
else
    echo "  docker compose down"
fi