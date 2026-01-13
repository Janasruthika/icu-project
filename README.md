# 🏥 ICU CarePro - AI-Powered Patient Monitoring System

A professional ICU patient deterioration prediction system using machine learning, built with Next.js and FastAPI.

![ICU CarePro](https://img.shields.io/badge/Status-Production%20Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green)
![Python](https://img.shields.io/badge/Python-3.11-blue)

---

## ✨ Features

- 🤖 **AI-Powered Predictions** - Real-time patient deterioration risk assessment
- 📊 **Interactive Dashboard** - Beautiful, responsive UI with live data visualization
- ⚡ **Real-Time Monitoring** - Instant updates as vital signs change
- 📈 **Trend Analysis** - 20-minute historical vital signs monitoring
- 🎨 **Modern UI/UX** - Professional dark theme with gradient effects
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🔒 **Production Ready** - Optimized for deployment on Vercel and Render

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.11+
- **Git**

### Local Development

#### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd icu-project
```

#### 2. Backend Setup

```bash
# Navigate to API directory
cd api

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`
API Docs: `http://localhost:8000/docs`

#### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Create environment file
cp env.example .env.local

# Run development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## 🌐 Deployment

### Free Hosting Options:
- **Frontend:** Vercel (recommended)
- **Backend:** Render (recommended)

### Quick Deployment:

1. **Deploy Backend to Render:**
   - Connect your GitHub repository
   - Root Directory: `api`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2. **Deploy Frontend to Vercel:**
   - Connect your GitHub repository
   - Root Directory: `frontend`
   - Add Environment Variable: `NEXT_PUBLIC_API_URL=https://your-backend.onrender.com`

📖 **Detailed deployment guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🏗️ Project Structure

```
icu-project/
├── api/                      # FastAPI Backend
│   ├── main.py              # Main API application
│   ├── requirements.txt     # Python dependencies
│   └── render.yaml          # Render deployment config
├── frontend/                 # Next.js Frontend
│   ├── app/
│   │   ├── page.tsx         # Main dashboard
│   │   ├── components/      # React components
│   │   │   ├── VitalInputs.tsx
│   │   │   ├── PredictionDisplay.tsx
│   │   │   └── TrendChart.tsx
│   │   ├── globals.css      # Global styles
│   │   └── layout.tsx       # Root layout
│   ├── package.json         # Node dependencies
│   ├── vercel.json          # Vercel config
│   └── env.example          # Environment template
├── icu_rf_model.pkl         # Trained ML model
├── DEPLOYMENT.md            # Deployment guide
└── README.md                # This file
```

---

## 🔧 Configuration

### Environment Variables

#### Backend (api/.env or Render):
```env
PYTHON_VERSION=3.11.0
ALLOW_ALL_ORIGINS=true
FRONTEND_URL=https://your-app.vercel.app
```

#### Frontend (frontend/.env.local or Vercel):
```env
NEXT_PUBLIC_API_URL=http://localhost:8000  # Local
# NEXT_PUBLIC_API_URL=https://your-api.onrender.com  # Production
```

---

## 📊 API Endpoints

### Base URL: `http://localhost:8000`

#### Health Check
```http
GET /health
```
Response:
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

#### Predict Patient Risk
```http
POST /predict
Content-Type: application/json

{
  "mean_value": 80,
  "max_value": 120,
  "min_value": 60,
  "count": 10
}
```

Response:
```json
{
  "risk": 0,
  "probability": 0.23,
  "risk_level": "stable"
}
```

Risk Levels:
- **stable**: probability < 40%
- **warning**: 40% ≤ probability < 70%
- **critical**: probability ≥ 70%

---

## 🎨 UI Components

### 1. **Patient Vitals Input**
- Interactive sliders for vital signs
- Real-time status indicators
- Color-coded warnings (Normal, Warning, Critical)
- Summary statistics

### 2. **AI Risk Analysis**
- Real-time deterioration probability
- Risk level classification
- Clinical recommendations
- Animated status indicators

### 3. **Vital Signs Monitoring**
- 20-minute trend chart
- Statistical metrics (Current, Average, Variability)
- Trend direction indicator
- Interactive tooltips

### 4. **Professional Header**
- System status indicator
- User profile
- Live monitoring badge

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Icons:** Lucide React
- **Deployment:** Vercel

### Backend
- **Framework:** FastAPI
- **Language:** Python 3.11
- **ML Library:** scikit-learn
- **Data Processing:** pandas, numpy
- **Model Format:** joblib (pickle)
- **Deployment:** Render

---

## 🎯 Key Features in Detail

### AI Prediction Engine
- Random Forest classification model
- Trained on ICU patient data
- Real-time risk assessment
- Probability-based risk stratification

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-optimized controls
- Professional dark theme

### User Experience
- Smooth animations and transitions
- Visual feedback on all interactions
- Loading states and error handling
- Accessible color schemes

---

## 🔒 Security & Best Practices

- ✅ CORS properly configured
- ✅ Environment variables for sensitive data
- ✅ Input validation on API
- ✅ Error handling throughout
- ✅ Type safety with TypeScript
- ✅ Modern security headers

---

## 📈 Performance

### Frontend
- Optimized bundle size
- Server-side rendering (SSR)
- Static optimization
- Image optimization
- Code splitting

### Backend
- Fast API response times (<100ms typical)
- Model loaded at startup
- Efficient data processing
- Health check endpoints

---

## 🐛 Troubleshooting

### Common Issues:

**"Failed to fetch prediction"**
- Ensure backend is running
- Check CORS configuration
- Verify API URL in frontend

**"Model not found"**
- Ensure `icu_rf_model.pkl` is in root directory
- Check file permissions

**Backend cold start (Render free tier)**
- First request after inactivity takes 30-60 seconds
- Use UptimeRobot to keep warm

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📝 License

This project is for educational and demonstration purposes.

---

## 👨‍💻 Author

**Janasruthika**
- Role: Administrator
- System: ICU CarePro Predictive Analytics Platform

---

## 🙏 Acknowledgments

- Built with Next.js, FastAPI, and modern web technologies
- Inspired by the need for better ICU patient monitoring
- Designed for healthcare professionals

---

## 📞 Support

For deployment help, see [DEPLOYMENT.md](DEPLOYMENT.md)

For technical documentation:
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8000/docs`

---

**Made with ❤️ for better patient care**

