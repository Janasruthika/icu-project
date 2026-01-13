# ICU Prediction System - Next.js Migration

## Architecture

**Backend (FastAPI)**: Python API serving ML model predictions  
**Frontend (Next.js)**: Modern React dashboard with Tailwind CSS

## Quick Start

### 1. Start the API Server
```bash
cd api
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2. Start the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## API Endpoints

- `GET /` - API info
- `POST /predict` - Get deterioration prediction
- `GET /health` - Health check

## Features

✅ Real-time vital sign monitoring  
✅ ML-powered deterioration predictions  
✅ Interactive sliders for vital inputs  
✅ Live trend visualization  
✅ Responsive design with dark theme  
✅ Glassmorphism UI effects
