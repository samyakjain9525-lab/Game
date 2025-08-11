#!/bin/bash

# Water Sort Game Development Deployment Script
echo "🎮 Starting Water Sort Game in Development Mode..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
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

# Build and start the application in development mode
echo "🏗️  Building and starting the application in development mode..."
if command -v docker-compose &> /dev/null; then
    docker-compose -f docker-compose.dev.yml down
    docker-compose -f docker-compose.dev.yml build
    docker-compose -f docker-compose.dev.yml up
else
    docker compose -f docker-compose.dev.yml down
    docker compose -f docker-compose.dev.yml build
    docker compose -f docker-compose.dev.yml up
fi