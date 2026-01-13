# 🚀 Deployment Guide

Complete guide to deploy your ICU Prediction System on Vercel (frontend) and Render (backend).

---

## 📋 Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Render account (sign up at [render.com](https://render.com))
- Git installed locally

---

## 🔧 Part 1: Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. **Ensure the model file is in the repository:**
   ```bash
   # The file icu_rf_model.pkl should be in the root directory
   ls icu_rf_model.pkl
   ```

2. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy on Render

1. **Go to [render.com](https://render.com)** and sign in
2. Click **"New +"** → **"Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name:** `icu-prediction-api` (or your preferred name)
   - **Region:** Choose closest to your users
   - **Branch:** `main`
   - **Root Directory:** `api`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`

5. **Set Environment Variables:**
   - Click **"Advanced"** → **"Add Environment Variable"**
   - Add:
     ```
     ALLOW_ALL_ORIGINS=true
     PYTHON_VERSION=3.11.0
     ```

6. **Click "Create Web Service"**

7. **Wait for deployment** (usually 3-5 minutes)

8. **Copy your backend URL** (e.g., `https://icu-prediction-api.onrender.com`)

### Step 3: Test Your Backend

Visit: `https://your-backend-url.onrender.com/docs`

You should see the FastAPI interactive documentation.

---

## 🎨 Part 2: Frontend Deployment (Vercel)

### Step 1: Configure Environment Variables Locally

1. **Create `.env.local` file in the `frontend` directory:**
   ```bash
   cd frontend
   cp env.example .env.local
   ```

2. **Edit `.env.local`:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

### Step 2: Test Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` and ensure everything works.

### Step 3: Deploy on Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. Click **"Add New"** → **"Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)

5. **Add Environment Variable:**
   - Click **"Environment Variables"**
   - Add:
     - **Name:** `NEXT_PUBLIC_API_URL`
     - **Value:** Your Render backend URL (e.g., `https://icu-prediction-api.onrender.com`)
     - **Environments:** Check all (Production, Preview, Development)

6. **Click "Deploy"**

7. **Wait for deployment** (usually 1-2 minutes)

8. **Copy your frontend URL** (e.g., `https://your-app.vercel.app`)

---

## 🔄 Part 3: Update CORS Configuration

### Option A: Use Environment Variable (Recommended)

1. **Go back to Render dashboard**
2. **Select your backend service**
3. **Environment** → **Add Environment Variable:**
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
4. **Save** (service will auto-redeploy)

### Option B: Allow All Origins (Simpler, Less Secure)

The current configuration already allows all origins when `ALLOW_ALL_ORIGINS=true` is set.

---

## ✅ Part 4: Verify Deployment

### Test Backend:
```bash
curl https://your-backend-url.onrender.com/health
```

Expected response:
```json
{"status":"healthy","model_loaded":true}
```

### Test Frontend:
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Adjust the vital signs sliders
3. Click "Run Prediction"
4. Verify the prediction results appear

---

## 🎯 Important Notes

### Free Tier Limitations

**Render Free Tier:**
- ✅ 750 hours/month (enough for 24/7)
- ⚠️ **Spins down after 15 minutes of inactivity**
- 🐌 **Cold starts take ~30-60 seconds**
- 💡 **Solution:** Use [UptimeRobot](https://uptimerobot.com) (free) to ping your API every 5 minutes

**Vercel Free Tier:**
- ✅ Unlimited personal projects
- ✅ 100 GB bandwidth/month
- ✅ No sleep/cold starts
- ✅ Global CDN

### Model File Size

If your `icu_rf_model.pkl` is larger than 100MB:
1. Use **Git LFS** (Large File Storage):
   ```bash
   git lfs install
   git lfs track "*.pkl"
   git add .gitattributes
   git add icu_rf_model.pkl
   git commit -m "Add model with Git LFS"
   git push
   ```

### Keep Backend Awake (Optional)

**Using UptimeRobot:**
1. Sign up at [uptimerobot.com](https://uptimerobot.com)
2. Add new monitor:
   - **Type:** HTTP(s)
   - **URL:** `https://your-backend-url.onrender.com/health`
   - **Interval:** 5 minutes
3. This keeps your backend warm and responsive!

---

## 🔄 Continuous Deployment

Both Vercel and Render support automatic deployments:

- **Push to `main` branch** → Automatic production deployment
- **Push to feature branch** → Automatic preview deployment (Vercel only)

---

## 🛠️ Troubleshooting

### Issue: "Failed to fetch prediction"

**Check:**
1. Backend is running: Visit `https://your-backend-url.onrender.com/docs`
2. CORS is configured correctly
3. Environment variable `NEXT_PUBLIC_API_URL` is set in Vercel
4. If backend was sleeping, wait 30-60 seconds and try again

### Issue: "Model not found"

**Check:**
1. `icu_rf_model.pkl` is in your repository
2. File is not in `.gitignore`
3. Check Render logs for model loading errors

### Issue: Build fails on Render

**Check:**
1. `requirements.txt` has all dependencies
2. Python version compatibility
3. Check build logs for specific errors

### Issue: Frontend shows old API URL

**Solution:**
1. Update environment variable in Vercel
2. Trigger a new deployment (Settings → Deployments → Redeploy)

---

## 📊 Monitoring

### Backend Logs (Render):
Dashboard → Your Service → Logs

### Frontend Logs (Vercel):
Dashboard → Your Project → Deployments → [Latest] → Runtime Logs

### Performance Monitoring:
- Vercel provides built-in analytics (Analytics tab)
- Render shows resource usage in dashboard

---

## 🎉 Success!

Your ICU Prediction System is now live!

- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://your-backend-url.onrender.com
- **API Docs:** https://your-backend-url.onrender.com/docs

---

## 📝 Custom Domain (Optional)

### Vercel Custom Domain:
1. Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

### Render Custom Domain:
1. Dashboard → Your Service → Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

---

## 🔐 Environment Variables Reference

### Backend (Render):
```
PYTHON_VERSION=3.11.0
ALLOW_ALL_ORIGINS=true
FRONTEND_URL=https://your-app.vercel.app (optional)
```

### Frontend (Vercel):
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

---

## 💡 Pro Tips

1. **Use preview deployments**: Every PR gets a unique URL on Vercel
2. **Monitor your app**: Set up UptimeRobot for backend health checks
3. **Check logs regularly**: Both platforms provide excellent logging
4. **Enable analytics**: Vercel Analytics provides insights into usage
5. **Backup your model**: Keep `icu_rf_model.pkl` in a safe location

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **FastAPI Docs:** https://fastapi.tiangolo.com

---

**Happy Deploying! 🚀**

