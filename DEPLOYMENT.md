# 🎮 Water Sort Game - Deployment Guide

This guide provides multiple deployment options for the Water Sort puzzle game, which consists of a React frontend and FastAPI backend with MongoDB database.

## 🏗️ Architecture

- **Frontend**: React app with Tailwind CSS and Radix UI components
- **Backend**: FastAPI server with MongoDB integration
- **Database**: MongoDB for storing game progress and status

## 🚀 Deployment Options

### Option 1: Docker Deployment (Recommended)

#### Prerequisites
- Docker and Docker Compose installed
- 4GB+ RAM recommended

#### Quick Start
```bash
# Make scripts executable
chmod +x deploy.sh deploy-dev.sh

# For production deployment
./deploy.sh

# For development with hot reloading
./deploy-dev.sh
```

#### Manual Docker Deployment
```bash
# 1. Create environment file
cp .env.example backend/.env

# 2. Build and start services
docker-compose up -d

# 3. Access the application
# Frontend: http://localhost
# Backend: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

#### Stop the application
```bash
docker-compose down
```

### Option 2: Cloud Deployment

#### Frontend Deployment (Choose one)

**Vercel (Recommended)**
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend: `cd frontend`
3. Deploy: `vercel --prod`
4. Update `vercel.json` with your backend URL

**Netlify**
1. Connect your GitHub repository to Netlify
2. Set build directory to `frontend/build`
3. Set build command to `cd frontend && yarn build`
4. Update `netlify.toml` with your backend URL

#### Backend Deployment (Choose one)

**Railway (Recommended)**
1. Install Railway CLI: `npm i -g @railway/cli`
2. Login: `railway login`
3. Deploy: `railway up`
4. Add MongoDB addon in Railway dashboard
5. Update environment variables in Railway dashboard

**Heroku**
1. Install Heroku CLI
2. Create app: `heroku create your-app-name`
3. Add MongoDB addon: `heroku addons:create mongolab:sandbox`
4. Deploy: `git push heroku main`

**DigitalOcean App Platform**
1. Connect GitHub repository
2. Configure build settings:
   - Build command: `cd backend && pip install -r requirements.txt`
   - Run command: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
3. Add MongoDB database component

### Option 3: Local Development (Without Docker)

#### Prerequisites
- Node.js 18+ and Yarn
- Python 3.11+
- MongoDB (local or cloud)

#### Setup
```bash
# Install frontend dependencies
cd frontend
yarn install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt

# Set up environment variables
cp ../.env.example .env
# Edit .env with your MongoDB connection string

# Start MongoDB (if running locally)
mongod

# Start backend (in one terminal)
cd backend
uvicorn server:app --reload

# Start frontend (in another terminal)
cd frontend
yarn start
```

## 🔧 Configuration

### Environment Variables

**Backend (.env file in backend directory)**
```
MONGO_URL=mongodb://username:password@host:port/database
DB_NAME=watersort
CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.com
```

**Frontend**
```
REACT_APP_API_URL=http://localhost:8000  # or your backend URL
```

### MongoDB Setup

**Local MongoDB**
```bash
# Install MongoDB
sudo apt-get install mongodb

# Start MongoDB
sudo systemctl start mongodb
```

**MongoDB Atlas (Cloud)**
1. Create account at mongodb.com
2. Create cluster
3. Get connection string
4. Update MONGO_URL in backend/.env

## 🌐 Access URLs

After deployment:
- **Frontend**: http://localhost (Docker) or your deployed URL
- **Backend API**: http://localhost:8000 (Docker) or your deployed URL
- **API Documentation**: http://localhost:8000/docs

## 🔍 Troubleshooting

### Common Issues

1. **Port conflicts**: Change ports in docker-compose.yml if needed
2. **MongoDB connection**: Ensure MongoDB is running and accessible
3. **CORS errors**: Update CORS_ORIGINS environment variable
4. **Build failures**: Check Node.js/Python versions

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongo
```

## 📊 Monitoring

### Health Checks
- Backend health: `GET /api/`
- Database connection: `GET /api/status`

### Performance
- Frontend is optimized for production with code splitting
- Backend uses async/await for database operations
- MongoDB indexes can be added for better performance

## 🔄 Updates

To update the deployment:
```bash
# Pull latest changes
git pull

# Rebuild and restart
docker-compose down
docker-compose build
docker-compose up -d
```

## 🛡️ Security Notes

- Change default MongoDB credentials in production
- Use environment variables for sensitive data
- Configure proper CORS origins
- Consider adding rate limiting for production
- Use HTTPS in production

## 📱 Mobile Considerations

The game is responsive and works on mobile devices. For PWA features:
- Service worker is included (`public/sw.js`)
- Manifest file is configured (`public/manifest.json`)
- Consider adding app icons for different platforms