'use client'

import { useState, useEffect } from 'react'
import { Activity, TrendingUp, User, Shield, Wifi, Sparkles, BarChart2, Brain, Zap, RefreshCw } from 'lucide-react'
import VitalInputs from './components/VitalInputs'
import PredictionDisplay from './components/PredictionDisplay'
import TrendChart from './components/TrendChart'

export default function ICUDashboard() {
  const [vitals, setVitals] = useState({
    mean_value: 80,
    max_value: 120,
    min_value: 60,
    count: 10
  })

  const [prediction, setPrediction] = useState<{
    risk: number
    probability: number
    risk_level: string
  } | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [apiStatus, setApiStatus] = useState<'connected' | 'disconnected'>('disconnected')

  // Get API URL from environment variable (defaults to localhost for development)
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

  const fetchPrediction = async (vitalsData = vitals) => {
    setIsLoading(true)
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vitalsData)
      })
      
      if (!response.ok) throw new Error('API request failed')
      
      const data = await response.json()
      setPrediction(data)
      setLastUpdate(new Date())
      setApiStatus('connected')
    } catch (error) {
      console.error('Prediction error:', error)
      setApiStatus('disconnected')
      alert(`Failed to fetch prediction from ${API_URL}. Make sure the API is running and accessible.`)
    } finally {
      setIsLoading(false)
    }
  }

  // Initial prediction on mount
  useEffect(() => {
    fetchPrediction()
  }, [])

  const handleSimulateUpdate = () => {
    fetchPrediction()
  }

  return (
    <div className="h-screen bg-gradient-to-br from-[#020617] via-[#0A0F1E] to-[#0F1729] flex flex-col overflow-hidden">
      {/* Professional Enterprise Header */}
      <header className="bg-gradient-to-r from-[#0A0F1E]/98 via-[#0F1729]/95 to-[#0A0F1E]/98 backdrop-blur-xl border-b border-slate-800/40 shadow-2xl flex-shrink-0 relative overflow-hidden">
        {/* Animated top border accent */}
        <div className="absolute top-0 left-0 right-0 h-[2px]">
          <div className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-60 animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 blur-sm"></div>
        </div>
        
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        
        <div className="mx-auto px-2 sm:px-3 lg:px-4 relative z-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            
            {/* Left: Branding Section */}
            <div className="flex items-center gap-4 lg:gap-6 flex-1">
              {/* Professional Logo with Animation */}
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="relative group">
                  {/* Animated outer glow */}
                  <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
                  
                  {/* Logo container */}
                  <div className="relative bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600 p-2.5 rounded-xl shadow-2xl border-2 border-cyan-400/40 group-hover:border-cyan-400/60 transition-all duration-300">
                    <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-white drop-shadow-lg" strokeWidth={2.5} />
                    {/* Inner shine effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
                
                {/* Brand Identity */}
                <div className="hidden sm:flex flex-col">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg lg:text-xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent">
                      ICU CarePro
                    </h1>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-cyan-300 bg-gradient-to-r from-cyan-600/30 to-teal-600/30 rounded-md border border-cyan-500/40 uppercase tracking-wider shadow-lg">
                      <Brain className="w-3 h-3" />
                      <span className="hidden lg:inline">AI</span>
                    </span>
                  </div>
                  <p className="text-[11px] lg:text-xs text-slate-400 font-medium tracking-wide flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-500/60" />
                    Predictive Analytics Platform
                  </p>
                </div>
              </div>
              
              {/* Divider */}
              <div className="hidden lg:block w-px h-10 bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
              
              {/* Page Title & Status */}
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900/40 rounded-lg border border-slate-700/50">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-cyan-500 animate-ping"></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-200">Live Monitoring</span>
                </div>
              </div>
            </div>
            
            {/* Right: Status & User Section */}
            <div className="flex items-center gap-3 lg:gap-4">
              
              {/* System Status - Professional Badge */}
              <div className="hidden lg:flex items-center gap-3">
                <div className={`flex items-center gap-2.5 px-4 py-2 rounded-xl border-2 transition-all shadow-lg ${
                  apiStatus === 'connected' 
                    ? 'bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border-emerald-500/40 shadow-emerald-500/20' 
                    : 'bg-gradient-to-r from-red-500/10 to-red-600/5 border-red-500/40 shadow-red-500/20'
                }`}>
                  <div className="relative flex items-center justify-center">
                    <div className={`w-2.5 h-2.5 rounded-full ${
                      apiStatus === 'connected' ? 'bg-emerald-400' : 'bg-red-400'
                    }`}></div>
                    <div className={`absolute inset-0 w-2.5 h-2.5 rounded-full ${
                      apiStatus === 'connected' ? 'bg-emerald-400' : 'bg-red-400'
                    } animate-ping`}></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-medium">System</span>
                    <span className={`text-xs font-bold uppercase tracking-wide ${
                      apiStatus === 'connected' ? 'text-emerald-300' : 'text-red-300'
                    }`}>
                      {apiStatus === 'connected' ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <Wifi className={`w-4 h-4 ${apiStatus === 'connected' ? 'text-emerald-400' : 'text-red-400'}`} />
                </div>
              </div>
              
              {/* Mobile Status - Compact */}
              <div className={`lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
                apiStatus === 'connected' 
                  ? 'bg-emerald-500/10 border-emerald-500/40' 
                  : 'bg-red-500/10 border-red-500/40'
              }`}>
                <div className="relative">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    apiStatus === 'connected' ? 'bg-emerald-400' : 'bg-red-400'
                  }`}></div>
                  <div className={`absolute inset-0 w-1.5 h-1.5 rounded-full ${
                    apiStatus === 'connected' ? 'bg-emerald-400' : 'bg-red-400'
                  } animate-ping`}></div>
                </div>
                <span className={`text-[10px] font-bold uppercase ${
                  apiStatus === 'connected' ? 'text-emerald-300' : 'text-red-300'
                }`}>
                  {apiStatus === 'connected' ? 'ON' : 'OFF'}
                </span>
              </div>
              
              {/* Vertical Divider */}
              <div className="hidden md:block w-px h-10 bg-gradient-to-b from-transparent via-slate-700 to-transparent"></div>
              
              {/* User Profile - Professional */}
              <button className="flex items-center gap-2.5 px-3 py-2 bg-gradient-to-br from-slate-900/80 to-slate-900/60 hover:from-slate-800/80 hover:to-slate-900/90 rounded-xl transition-all border border-slate-700/60 hover:border-cyan-500/40 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 group">
                <div className="relative">
                  {/* Animated glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full blur-md opacity-40 group-hover:opacity-70 transition-opacity"></div>
                  
                  {/* Avatar with gradient border */}
                  <div className="relative w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-cyan-500 via-cyan-600 to-teal-600 flex items-center justify-center shadow-xl border-2 border-[#0A0F1E] group-hover:scale-110 transition-transform">
                    <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-sm font-bold text-white leading-tight">Janasruthika</span>
                  <div className="flex items-center gap-1">
                    <Shield className="w-2.5 h-2.5 text-cyan-400" />
                    <span className="text-[10px] text-cyan-400 font-semibold">Administrator</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom shadow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent"></div>
      </header>

      <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#020617]/40 to-transparent relative">
        {/* Subtle background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="mx-auto px-2 sm:px-3 lg:px-4 py-4 md:py-6 pb-6 min-h-full relative z-10">
          {/* Mobile & Tablet: Single Column, Desktop: 3 Columns */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 lg:h-[calc(100vh-100px)] min-h-fit">
            {/* Left Sidebar - Vital Inputs */}
            <div className="lg:col-span-1 flex flex-col gap-2 sm:gap-3 flex-shrink-0 lg:flex-shrink lg:h-full">
              <div className="flex-shrink-0 lg:flex-1 lg:overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
                <VitalInputs vitals={vitals} setVitals={setVitals} onSliderRelease={fetchPrediction} />
              </div>
              
              {/* Quick Actions */}
              <div className="flex-shrink-0">
                <button
                  onClick={handleSimulateUpdate}
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-600 hover:from-cyan-500 hover:via-teal-500 hover:to-cyan-500 disabled:from-slate-700 disabled:to-slate-800 text-white font-bold py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 disabled:shadow-none transform hover:scale-[1.02] disabled:scale-100 text-sm sm:text-base border border-cyan-400/20 hover:border-cyan-400/40"
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  
                  {/* Icon */}
                  <div className="relative">
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  
                  {/* Text */}
                  <span className="relative hidden sm:inline font-extrabold tracking-wide">
                    {isLoading ? 'Analyzing Data...' : 'Run Prediction'}
                  </span>
                  <span className="relative sm:hidden font-extrabold">
                    {isLoading ? 'Loading...' : 'Predict'}
                  </span>
                </button>
              </div>
            </div>

            {/* Main Content - Prediction & Trends */}
            <div className="lg:col-span-2 flex flex-col gap-2 sm:gap-3 md:gap-4 flex-shrink-0 lg:flex-shrink lg:h-full lg:overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
              {/* Prediction Display */}
              <div className="flex-shrink-0">
                <PredictionDisplay 
                  prediction={prediction} 
                  isLoading={isLoading}
                  lastUpdate={lastUpdate}
                />
              </div>

              {/* Vital Trends Chart - Visible on All Devices */}
              <div className="flex-shrink-0 h-[300px] sm:h-[340px] md:h-[380px] lg:flex-1 lg:h-auto lg:min-h-[350px]">
                <TrendChart meanValue={vitals.mean_value} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

