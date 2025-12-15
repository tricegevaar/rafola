# 🚀 Rafola Deployment Guide

This guide will help you deploy Rafola to get a live link you can share with others.

## 📋 Prerequisites

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Follow the installation wizard

2. **Create accounts** (free):
   - GitHub: https://github.com
   - Vercel: https://vercel.com (for frontend)
   - Railway: https://railway.app (for backend & database)

## 🔧 Step 1: Upload to GitHub

1. **Install Git** and restart your terminal
2. **Initialize repository**:
```bash
git init
git add .
git commit -m "Initial commit - Rafola mental health platform"
```

3. **Create GitHub repository**:
   - Go to https://github.com/new
   - Repository name: `rafola`
   - Description: `Mental health support platform - Healing Together`
   - Make it Public (so others can see it)
   - Click "Create repository"

4. **Push to GitHub**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/rafola.git
git branch -M main
git push -u origin main
```

## 🗄️ Step 2: Deploy Backend (Railway)

1. **Sign up for Railway**: https://railway.app
2. **Create new project** → "Deploy from GitHub repo"
3. **Select your rafola repository**
4. **Configure backend**:
   - Root directory: `backend`
   - Build command: `npm run build`
   - Start command: `npm run start`

5. **Add environment variables**:
```
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=https://your-vercel-app.vercel.app
PORT=3001
```

6. **Railway will provide**:
   - PostgreSQL database (automatic)
   - Backend URL (e.g., `https://rafola-backend.railway.app`)

## 🌐 Step 3: Deploy Frontend (Vercel)

1. **Sign up for Vercel**: https://vercel.com
2. **Import project** → Select your GitHub repository
3. **Configure deployment**:
   - Framework: Next.js
   - Root directory: `.` (root)
   - Build command: `npm run build`
   - Output directory: `.next`

4. **Add environment variables**:
```
NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app
NEXT_PUBLIC_SOCKET_URL=https://your-railway-backend.railway.app
```

5. **Deploy** → Vercel will give you a live URL!

## 🔗 Step 4: Update Backend URL

1. **Copy your Railway backend URL**
2. **Update Vercel environment variables**:
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` with your Railway URL
   - Redeploy the project

## ✅ Step 5: Test Your Live Site

Your live URLs will be:
- **Frontend**: `https://rafola-username.vercel.app`
- **Backend**: `https://rafola-backend.railway.app`

Test these features:
- [ ] Landing page loads
- [ ] Registration works
- [ ] Login works
- [ ] Dashboard displays
- [ ] Admin panel accessible

## 🎯 Alternative: Quick Deploy Options

### Option A: Netlify (Frontend Alternative)
1. Go to https://netlify.com
2. Drag and drop your project folder
3. Add environment variables in Site Settings

### Option B: Heroku (Backend Alternative)
1. Install Heroku CLI
2. `heroku create rafola-backend`
3. `git subtree push --prefix backend heroku main`

## 🔧 Environment Variables Reference

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.com
```

### Backend (.env)
```bash
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
FRONTEND_URL=https://your-frontend-url.com
PORT=3001
```

## 🚨 Troubleshooting

### Common Issues:

1. **"Git not recognized"**
   - Install Git from https://git-scm.com
   - Restart terminal/command prompt

2. **Build fails on Vercel**
   - Check environment variables are set
   - Ensure all dependencies are in package.json

3. **Backend connection fails**
   - Verify Railway backend is running
   - Check environment variables match
   - Ensure CORS is configured for your frontend URL

4. **Database connection issues**
   - Railway provides PostgreSQL automatically
   - Copy the DATABASE_URL from Railway dashboard

## 📱 Sharing Your Live Site

Once deployed, you can share:
- **Live URL**: `https://rafola-yourusername.vercel.app`
- **GitHub Repository**: `https://github.com/yourusername/rafola`
- **Demo credentials** (if needed for testing)

## 🎉 Success!

Your Rafola platform is now live and accessible to anyone with the URL! 

**Next steps:**
- Share the link with friends and testers
- Monitor usage through Vercel/Railway dashboards
- Collect feedback and iterate
- Consider custom domain (optional)

---

**Need help?** Create an issue in your GitHub repository or check the deployment platform documentation.

**Rafola - Healing Together** 🌱