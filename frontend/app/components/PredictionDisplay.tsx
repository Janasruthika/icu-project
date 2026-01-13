'use client'

import { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, Clock, AlertTriangle, Shield, Zap, Brain } from 'lucide-react'

interface PredictionDisplayProps {
  prediction: {
    risk: number
    probability: number
    risk_level: string
  } | null
  isLoading: boolean
  lastUpdate: Date
}

export default function PredictionDisplay({ prediction, isLoading, lastUpdate }: PredictionDisplayProps) {
  const [formattedTime, setFormattedTime] = useState('')

  // Format time on client side only to avoid hydration mismatch
  useEffect(() => {
    setFormattedTime(lastUpdate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}))
  }, [lastUpdate])
  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-br from-[#0F1729]/95 to-[#0A0F1E]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-cyan-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}></div>
        </div>
        
        <div className="relative flex flex-col items-center justify-center gap-3 sm:gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-40 animate-pulse"></div>
            <div className="animate-spin rounded-full h-12 w-12 sm:h-14 sm:w-14 border-4 border-slate-800/50 border-t-cyan-500 border-r-teal-500 relative shadow-xl"></div>
          </div>
          <div className="text-center">
            <p className="text-white text-sm sm:text-base font-bold mb-1">Analyzing Patient Data</p>
            <p className="text-slate-400 text-xs sm:text-sm font-medium flex items-center gap-2 justify-center">
              <Brain className="w-3.5 h-3.5 animate-pulse" />
              AI Processing...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!prediction) {
    return (
      <div className="relative bg-gradient-to-br from-[#0F1729]/95 to-[#0A0F1E]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-800/50 p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-center gap-3">
          <Zap className="w-5 h-5 text-cyan-400 animate-pulse" />
          <p className="text-slate-300 text-center text-sm sm:text-base font-semibold">Initializing AI Prediction Engine...</p>
        </div>
      </div>
    )
  }

  const isHighRisk = prediction.risk === 1
  const probability = prediction.probability * 100
  
  // Determine risk level based on probability
  let riskLevel = 'stable'
  let riskIcon = <Shield className="w-8 h-8" />
  let riskBgColor = 'from-emerald-500/10 to-emerald-500/5'
  let riskBorderColor = 'border-emerald-500/50'
  let riskTextColor = 'text-emerald-400'
  let riskGlowColor = 'bg-emerald-500'
  let progressColor = 'bg-gradient-to-r from-emerald-500 to-emerald-400'
  
  if (probability >= 70) {
    riskLevel = 'critical'
    riskIcon = <AlertCircle className="w-8 h-8" />
    riskBgColor = 'from-red-500/20 to-red-500/5'
    riskBorderColor = 'border-red-500/70'
    riskTextColor = 'text-red-400'
    riskGlowColor = 'bg-red-500'
    progressColor = 'bg-gradient-to-r from-red-600 to-red-500'
  } else if (probability >= 40) {
    riskLevel = 'warning'
    riskIcon = <AlertTriangle className="w-8 h-8" />
    riskBgColor = 'from-yellow-500/20 to-yellow-500/5'
    riskBorderColor = 'border-yellow-500/70'
    riskTextColor = 'text-yellow-400'
    riskGlowColor = 'bg-yellow-500'
    progressColor = 'bg-gradient-to-r from-yellow-500 to-yellow-400'
  }

  return (
    <div className={`relative bg-gradient-to-br from-[#0F1729]/95 to-[#0A0F1E]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border-2 ${riskBorderColor} p-3 sm:p-4 shadow-2xl transition-all duration-500 overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-40 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-cyan-600 to-teal-600 p-2 rounded-lg">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              AI Risk Analysis
              <span className="px-2 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-500/10 rounded border border-cyan-500/30 uppercase">Real-time</span>
            </h2>
            <p className="text-[10px] text-slate-400">Machine Learning Prediction Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 text-xs text-slate-400 bg-slate-900/70 px-2.5 py-1.5 rounded-lg border border-slate-700/50">
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span className="text-[10px] sm:text-xs font-semibold">{formattedTime || '--:--'}</span>
        </div>
      </div>

      {/* Main Risk Status Card */}
      <div className={`bg-gradient-to-br ${riskBgColor} border-2 ${riskBorderColor} rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 relative overflow-hidden`}>
        {/* Animated Background Glow */}
        <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 ${riskGlowColor} opacity-10 blur-3xl animate-pulse`}></div>
        
        <div className="relative flex items-start gap-2 sm:gap-3">
          <div className={`${riskTextColor} relative flex-shrink-0`}>
            <div className="w-5 h-5 sm:w-6 sm:h-6">
              {riskLevel === 'critical' ? <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" /> : 
               riskLevel === 'warning' ? <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" /> : 
               <Shield className="w-5 h-5 sm:w-6 sm:h-6" />}
            </div>
            {riskLevel === 'critical' && (
              <div className="absolute inset-0 bg-red-500 blur-lg opacity-50 animate-pulse"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            {isHighRisk ? (
              <>
                <h3 className={`text-sm sm:text-lg font-bold ${riskTextColor} mb-0.5 flex items-center gap-1.5 sm:gap-2`}>
                  <span className="truncate">HIGH RISK DETECTED</span>
                  <span className="inline-flex items-center justify-center w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full animate-pulse flex-shrink-0"></span>
                </h3>
                <p className="text-red-300/90 text-[10px] sm:text-xs font-medium">
                  Immediate clinical review recommended
                </p>
              </>
            ) : (
              <>
                <h3 className={`text-sm sm:text-lg font-bold ${riskTextColor} mb-0.5 truncate`}>
                  {riskLevel === 'warning' ? 'MODERATE RISK' : 'PATIENT STABLE'}
                </h3>
                <p className={`text-[10px] sm:text-xs font-medium ${riskLevel === 'warning' ? 'text-yellow-300/90' : 'text-emerald-300/90'}`}>
                  {riskLevel === 'warning' 
                    ? 'Continue monitoring closely'
                    : 'Vitals within acceptable parameters'
                  }
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Risk Probability Meter */}
      <div className="space-y-2 sm:space-y-3">
        <div>
          <div className="flex justify-between items-baseline mb-1.5 sm:mb-2">
            <span className="text-slate-300 font-semibold text-[10px] sm:text-xs">Deterioration Probability</span>
            <div className="flex items-baseline gap-0.5">
              <span className={`text-2xl sm:text-3xl font-bold ${riskTextColor}`}>
                {probability.toFixed(1)}
              </span>
              <span className={`text-base sm:text-lg font-semibold ${riskTextColor}`}>%</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative w-full bg-slate-900/50 rounded-full h-4 sm:h-5 overflow-hidden border border-slate-700/50 shadow-inner">
            <div
              className={`h-full ${progressColor} transition-all duration-1000 ease-out relative overflow-hidden`}
              style={{ width: `${probability}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            
            {/* Percentage label inside bar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] sm:text-[10px] font-bold text-white drop-shadow-lg">
                {probability >= 10 ? `${probability.toFixed(1)}%` : ''}
              </span>
            </div>
          </div>
          
          {/* Scale markers */}
          <div className="flex justify-between text-[9px] sm:text-[10px] text-slate-500 mt-1 px-1">
            <span>0%</span>
            <span className="hidden sm:inline">25%</span>
            <span>50%</span>
            <span className="hidden sm:inline">75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Risk Level Indicators */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 pt-2 sm:pt-3 border-t border-slate-700/50">
          <div className={`text-center p-1.5 sm:p-2 rounded-lg transition-all ${riskLevel === 'stable' ? 'bg-emerald-500/10 border-2 border-emerald-500/50' : 'bg-slate-900/30 border border-slate-700/30'}`}>
            <Shield className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 ${riskLevel === 'stable' ? 'text-emerald-400' : 'text-slate-600'}`} />
            <p className={`text-[9px] sm:text-[10px] font-semibold ${riskLevel === 'stable' ? 'text-emerald-400' : 'text-slate-600'}`}>Stable</p>
            <p className="text-[8px] sm:text-[9px] text-slate-500">&lt;40%</p>
          </div>
          
          <div className={`text-center p-1.5 sm:p-2 rounded-lg transition-all ${riskLevel === 'warning' ? 'bg-yellow-500/10 border-2 border-yellow-500/50' : 'bg-slate-900/30 border border-slate-700/30'}`}>
            <AlertTriangle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 ${riskLevel === 'warning' ? 'text-yellow-400' : 'text-slate-600'}`} />
            <p className={`text-[9px] sm:text-[10px] font-semibold ${riskLevel === 'warning' ? 'text-yellow-400' : 'text-slate-600'}`}>Warning</p>
            <p className="text-[8px] sm:text-[9px] text-slate-500">40-70%</p>
          </div>
          
          <div className={`text-center p-1.5 sm:p-2 rounded-lg transition-all ${riskLevel === 'critical' ? 'bg-red-500/10 border-2 border-red-500/50' : 'bg-slate-900/30 border border-slate-700/30'}`}>
            <AlertCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mx-auto mb-0.5 ${riskLevel === 'critical' ? 'text-red-400' : 'text-slate-600'}`} />
            <p className={`text-[9px] sm:text-[10px] font-semibold ${riskLevel === 'critical' ? 'text-red-400' : 'text-slate-600'}`}>Critical</p>
            <p className="text-[8px] sm:text-[9px] text-slate-500">&gt;70%</p>
          </div>
        </div>
      </div>
    </div>
  )
}
