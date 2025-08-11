# Game Deployment Guide

This guide will help you deploy your game application using Docker and Docker Compose.

## 🚀 Quick Start

### Prerequisites

1. **Docker** - [Install Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose** - [Install Docker Compose](https://docs.docker.com/compose/install/)

### Local Deployment

1. **Clone and navigate to your project:**
   ```bash
   cd /workspace
   ```

2. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

3. **Access your game:**
   - Frontend: http://localhost:80
   - Backend API: http://localhost:8000
   - Reverse Proxy: http://localhost:8080

## 🏗️ Architecture

The deployment consists of four main services:

- **Frontend**: React application served by Nginx
- **Backend**: FastAPI Python server
- **MongoDB**: Database for storing game data
- **Nginx**: Reverse proxy (optional, for production)

## 📁 Deployment Files

- `Dockerfile.frontend` - Frontend container configuration
- `Dockerfile.backend` - Backend container configuration
- `docker-compose.yml` - Service orchestration
- `nginx.conf` - Frontend Nginx configuration
- `nginx-prod.conf` - Production reverse proxy configuration
- `mongo-init.js` - MongoDB initialization script
- `deploy.sh` - Automated deployment script

## 🔧 Manual Deployment

If you prefer to deploy manually:

```bash
# Build and start all services
docker-compose up --build -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🌐 Production Deployment

### Option 1: Cloud Deployment (AWS, GCP, Azure)

1. **Set up a cloud server** with Docker installed
2. **Copy your project files** to the server
3. **Update environment variables** in `docker-compose.yml`
4. **Run the deployment script**

### Option 2: VPS Deployment

1. **SSH into your VPS**
2. **Install Docker and Docker Compose**
3. **Clone your repository**
4. **Run the deployment script**

### Option 3: Platform as a Service

#### Heroku
```bash
# Create Heroku app
heroku create your-game-app

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main
```

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

## 🔒 Environment Variables

Create a `.env` file in the backend directory:

```env
MONGO_URL=mongodb://admin:password123@mongodb:27017/
DB_NAME=game_db
CORS_ORIGINS=http://localhost:3000,http://localhost:80,http://frontend:80
```

## 📊 Database Configuration

The deployment includes MongoDB with:
- **Username**: admin
- **Password**: password123
- **Database**: game_db
- **Port**: 27017

## 🔍 Monitoring and Logs

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mongodb

# Check service health
curl http://localhost:8000/api/
curl http://localhost:80/health
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in `docker-compose.yml`
2. **Build failures**: Check Dockerfile syntax and dependencies
3. **Database connection**: Verify MongoDB credentials and network
4. **CORS errors**: Update CORS_ORIGINS in environment variables

### Debug Commands

```bash
# Check container status
docker-compose ps

# Enter container shell
docker-compose exec backend bash
docker-compose exec frontend sh

# Check network connectivity
docker network ls
docker network inspect game-game-network
```

## 🔄 Updates and Maintenance

### Update Application
```bash
# Pull latest changes
git pull

# Rebuild and restart
./deploy.sh
```

### Backup Database
```bash
# Create backup
docker-compose exec mongodb mongodump --out /backup

# Copy backup to host
docker cp game-mongodb:/backup ./backup
```

### Scale Services
```bash
# Scale backend instances
docker-compose up -d --scale backend=3
```

## 📈 Performance Optimization

1. **Enable caching** in Nginx configuration
2. **Use CDN** for static assets
3. **Implement database indexing**
4. **Add load balancing** for high traffic
5. **Monitor resource usage**

## 🔐 Security Considerations

1. **Change default passwords**
2. **Use HTTPS in production**
3. **Implement rate limiting**
4. **Regular security updates**
5. **Backup strategy**

## 📞 Support

If you encounter issues:
1. Check the logs: `docker-compose logs -f`
2. Verify all prerequisites are installed
3. Ensure ports are not in use
4. Check network connectivity

Happy gaming! 🎮