#!/bin/bash

# Game Deployment Script
set -e

echo "🎮 Starting game deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker-compose down --remove-orphans

# Build and start services
echo "🔨 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Test the API
echo "🧪 Testing API endpoints..."
if curl -f http://localhost:8000/api/ > /dev/null 2>&1; then
    echo "✅ Backend API is running"
else
    echo "❌ Backend API is not responding"
fi

# Test the frontend
echo "🧪 Testing frontend..."
if curl -f http://localhost:80 > /dev/null 2>&1; then
    echo "✅ Frontend is running"
else
    echo "❌ Frontend is not responding"
fi

# Test the reverse proxy (if enabled)
if docker-compose ps nginx | grep -q "Up"; then
    echo "🧪 Testing reverse proxy..."
    if curl -f http://localhost:8080/health > /dev/null 2>&1; then
        echo "✅ Reverse proxy is running"
    else
        echo "❌ Reverse proxy is not responding"
    fi
fi

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📱 Access your game at:"
echo "   Frontend: http://localhost:80"
echo "   Backend API: http://localhost:8000"
echo "   Reverse Proxy: http://localhost:8080"
echo ""
echo "📊 MongoDB: localhost:27017"
echo "   Username: admin"
echo "   Password: password123"
echo "   Database: game_db"
echo ""
echo "🔧 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Update and redeploy: ./deploy.sh"