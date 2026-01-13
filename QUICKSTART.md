# ⚡ Quick Start - Deploy in 10 Minutes!

Fast-track deployment guide for ICU CarePro.

---

## 🎯 Backend (Render) - 5 Minutes

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Deploy on Render
1. Go to [render.com](https://render.com) → Sign In
2. **New +** → **Web Service**
3. **Connect GitHub** → Select your repo
4. **Configure:**
   - Name: `icu-prediction-api`
   - Root Directory: `api`
   - Runtime: `Python 3`
   - Build: `pip install -r requirements.txt`
   - Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables:**
   - `ALLOW_ALL_ORIGINS` = `true`
   - `PYTHON_VERSION` = `3.11.0`
6. Click **"Create Web Service"**
7. ⏱️ Wait 3-5 minutes
8. ✅ Copy your URL: `https://icu-prediction-api-XXXX.onrender.com`

---

## 🎨 Frontend (Vercel) - 5 Minutes

### 1. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign In
2. **Add New** → **Project**
3. **Import** your GitHub repo
4. **Configure:**
   - Framework: Next.js ✅ (auto-detected)
   - Root Directory: `frontend`
5. **Environment Variables:**
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://icu-prediction-api-XXXX.onrender.com` (your Render URL)
   - ✅ Check all environments
6. Click **"Deploy"**
7. ⏱️ Wait 1-2 minutes
8. ✅ Done! Visit your app

---

## ✅ Verify

### Test Backend:
Open: `https://your-backend.onrender.com/docs`

### Test Frontend:
Open: `https://your-app.vercel.app`

---

## 🚨 Important Notes

1. **First Load Delay:** Render free tier sleeps after 15 min. First request takes 30-60 seconds.

2. **Keep Backend Awake (Optional):**
   - Use [UptimeRobot](https://uptimerobot.com) (free)
   - Ping `https://your-backend.onrender.com/health` every 5 minutes

3. **Model File:** Ensure `icu_rf_model.pkl` is in your repository root!

---

## 📝 Environment Variables Summary

### Render (Backend):
```
ALLOW_ALL_ORIGINS=true
PYTHON_VERSION=3.11.0
```

### Vercel (Frontend):
```
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
```

---

## 🎉 You're Done!

**Full documentation:** See [DEPLOYMENT.md](DEPLOYMENT.md)

**Need help?** Check the troubleshooting section in DEPLOYMENT.md

