# Quick Deployment Guide

Choose your preferred deployment method:

## 🚀 Option 1: Local Development (Recommended for testing)

```bash
# Run the local deployment script
./deploy-local.sh
```

This will start both frontend and backend locally.

## 🌐 Option 2: Railway (Free cloud hosting)

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway:**
   ```bash
   railway login
   ```

3. **Deploy:**
   ```bash
   railway up
   ```

4. **Set environment variables in Railway dashboard:**
   - `MONGO_URL`: Your MongoDB connection string
   - `DB_NAME`: game_db
   - `CORS_ORIGINS`: Your frontend URL

## 🎯 Option 3: Heroku

1. **Install Heroku CLI:**
   ```bash
   # Follow instructions at: https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku app:**
   ```bash
   heroku create your-game-app
   ```

3. **Add MongoDB addon:**
   ```bash
   heroku addons:create mongolab:sandbox
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

## ☁️ Option 4: Vercel (Frontend) + Railway (Backend)

### Deploy Frontend to Vercel:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy frontend:**
   ```bash
   cd frontend
   vercel
   ```

### Deploy Backend to Railway:
Follow Option 2 above.

## 🔧 Option 5: Manual Setup

### Backend Setup:
```bash
cd backend
python3 -m pip install -r requirements.txt
python3 -m uvicorn server:app --host 0.0.0.0 --port 8000
```

### Frontend Setup:
```bash
cd frontend
yarn install
yarn start
```

## 📊 Database Setup

For MongoDB, you can use:
- **MongoDB Atlas** (Free tier available)
- **Railway MongoDB** (Free tier available)
- **Heroku MongoDB** (Free tier available)

## 🔗 Environment Variables

Set these environment variables for your backend:

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=game_db
CORS_ORIGINS=https://your-frontend-domain.com
```

## 🎮 Access Your Game

After deployment, your game will be available at:
- **Local**: http://localhost:3000 (frontend) + http://localhost:8000 (backend)
- **Railway**: https://your-app.railway.app
- **Heroku**: https://your-app.herokuapp.com
- **Vercel**: https://your-app.vercel.app

## 🆘 Need Help?

1. Check the logs for errors
2. Verify environment variables are set correctly
3. Ensure MongoDB connection is working
4. Check CORS settings match your frontend URL

Happy gaming! 🎮