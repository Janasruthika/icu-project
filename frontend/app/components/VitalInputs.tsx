'use client'

import { Heart, Activity, TrendingUp, TrendingDown, BarChart3, Zap, AlertCircle } from 'lucide-react'

interface VitalInputsProps {
  vitals: {
    mean_value: number
    max_value: number
    min_value: number
    count: number
  }
  setVitals: (vitals: any) => void
  onSliderRelease?: (vitals: any) => void
}

export default function VitalInputs({ vitals, setVitals, onSliderRelease }: VitalInputsProps) {
  const handleChange = (key: string, value: number) => {
    setVitals({ ...vitals, [key]: value })
  }

  const handleSliderRelease = () => {
    if (onSliderRelease) {
      onSliderRelease(vitals)
    }
  }

  const getVitalStatus = (value: number, min: number, max: number, optimal: number) => {
    if (value < optimal - 10 || value > optimal + 10) return { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', label: 'Critical' }
    if (value < optimal - 5 || value > optimal + 5) return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', label: 'Warning' }
    return { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', label: 'Normal' }
  }

  return (
    <div className="relative bg-gradient-to-br from-[#0F1729]/95 to-[#0A0F1E]/80 backdrop-blur-xl rounded-2xl border border-slate-800/60 p-4 sm:p-5 shadow-2xl h-full flex flex-col overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Professional Header */}
      <div className="relative flex items-center justify-between mb-4 sm:mb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-red-500 to-pink-600 p-2.5 rounded-xl shadow-xl border-2 border-red-400/30">
              <Heart className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              Patient Vitals
              <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 rounded border border-emerald-500/30 uppercase tracking-wider">Live</span>
            </h2>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-emerald-500" />
              Real-time monitoring active
            </p>
          </div>
        </div>
      </div>

      <div className="relative space-y-3 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900 pr-1">
        {/* Mean Heart Rate */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-teal-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-[#0A0F1E]/90 to-[#0F1729]/80 rounded-xl p-3 border border-slate-800/60 hover:border-cyan-500/60 transition-all shadow-xl group-hover:shadow-2xl group-hover:shadow-cyan-500/10">
            {/* Header with status */}
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-cyan-500/10 rounded-lg">
                  <Activity className="w-4 h-4 text-cyan-400" strokeWidth={2.5} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-200 block">Mean Heart Rate</label>
                  <span className="text-[10px] text-slate-500">Average BPM</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${getVitalStatus(vitals.mean_value, 40, 120, 80).bg} ${getVitalStatus(vitals.mean_value, 40, 120, 80).border} border`}>
                  <span className={getVitalStatus(vitals.mean_value, 40, 120, 80).color}>
                    {getVitalStatus(vitals.mean_value, 40, 120, 80).label}
                  </span>
                </div>
                <span className={`text-2xl font-black ${getVitalStatus(vitals.mean_value, 40, 120, 80).color}`}>
                  {vitals.mean_value}
                </span>
              </div>
            </div>
            
            {/* Slider */}
            <input
              type="range"
              min="40"
              max="120"
              value={vitals.mean_value}
              onChange={(e) => handleChange('mean_value', parseInt(e.target.value))}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="w-full slider-cyan touch-manipulation"
              style={{
                background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${((vitals.mean_value - 40) / (120 - 40)) * 100}%, #1e293b ${((vitals.mean_value - 40) / (120 - 40)) * 100}%, #1e293b 100%)`
              }}
            />
            
            {/* Range indicators */}
            <div className="flex justify-between items-center mt-2">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block">Min</span>
                <span className="text-xs font-bold text-slate-400">40</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium px-2 py-1 bg-slate-900/50 rounded">Optimal: 60-100</span>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block">Max</span>
                <span className="text-xs font-bold text-slate-400">120</span>
              </div>
            </div>
          </div>
        </div>

        {/* Peak Heart Rate */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-[#0A0F1E]/90 to-[#0F1729]/80 rounded-xl p-3 border border-slate-800/60 hover:border-red-500/60 transition-all shadow-xl group-hover:shadow-2xl group-hover:shadow-red-500/10">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-500/10 rounded-lg">
                  <TrendingUp className="w-4 h-4 text-red-400" strokeWidth={2.5} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-200 block">Peak Heart Rate</label>
                  <span className="text-[10px] text-slate-500">Maximum BPM</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${getVitalStatus(vitals.max_value, 60, 180, 120).bg} ${getVitalStatus(vitals.max_value, 60, 180, 120).border} border`}>
                  <span className={getVitalStatus(vitals.max_value, 60, 180, 120).color}>
                    {getVitalStatus(vitals.max_value, 60, 180, 120).label}
                  </span>
                </div>
                <span className={`text-2xl font-black ${getVitalStatus(vitals.max_value, 60, 180, 120).color}`}>
                  {vitals.max_value}
                </span>
              </div>
            </div>
            
            <input
              type="range"
              min="60"
              max="180"
              value={vitals.max_value}
              onChange={(e) => handleChange('max_value', parseInt(e.target.value))}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="w-full slider-red touch-manipulation"
              style={{
                background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((vitals.max_value - 60) / (180 - 60)) * 100}%, #1e293b ${((vitals.max_value - 60) / (180 - 60)) * 100}%, #1e293b 100%)`
              }}
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block">Min</span>
                <span className="text-xs font-bold text-slate-400">60</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium px-2 py-1 bg-slate-900/50 rounded">Target: &lt;150</span>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block">Max</span>
                <span className="text-xs font-bold text-slate-400">180</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimum Heart Rate */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-[#0A0F1E]/90 to-[#0F1729]/80 rounded-xl p-3 border border-slate-800/60 hover:border-emerald-500/60 transition-all shadow-xl group-hover:shadow-2xl group-hover:shadow-emerald-500/10">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500/10 rounded-lg">
                  <TrendingDown className="w-4 h-4 text-emerald-400" strokeWidth={2.5} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-200 block">Resting Heart Rate</label>
                  <span className="text-[10px] text-slate-500">Minimum BPM</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`px-2 py-1 rounded-md text-[10px] font-bold ${getVitalStatus(vitals.min_value, 30, 100, 60).bg} ${getVitalStatus(vitals.min_value, 30, 100, 60).border} border`}>
                  <span className={getVitalStatus(vitals.min_value, 30, 100, 60).color}>
                    {getVitalStatus(vitals.min_value, 30, 100, 60).label}
                  </span>
                </div>
                <span className={`text-2xl font-black ${getVitalStatus(vitals.min_value, 30, 100, 60).color}`}>
                  {vitals.min_value}
                </span>
              </div>
            </div>
            
            <input
              type="range"
              min="30"
              max="100"
              value={vitals.min_value}
              onChange={(e) => handleChange('min_value', parseInt(e.target.value))}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="w-full slider-emerald touch-manipulation"
              style={{
                background: `linear-gradient(to right, #10b981 0%, #10b981 ${((vitals.min_value - 30) / (100 - 30)) * 100}%, #1e293b ${((vitals.min_value - 30) / (100 - 30)) * 100}%, #1e293b 100%)`
              }}
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block">Min</span>
                <span className="text-xs font-bold text-slate-400">30</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium px-2 py-1 bg-slate-900/50 rounded">Ideal: 50-70</span>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block">Max</span>
                <span className="text-xs font-bold text-slate-400">100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Measurement Sample Size */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-br from-[#0A0F1E]/90 to-[#0F1729]/80 rounded-xl p-3 border border-slate-800/60 hover:border-purple-500/60 transition-all shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/10">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-500/10 rounded-lg">
                  <BarChart3 className="w-4 h-4 text-purple-400" strokeWidth={2.5} />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-200 block">Data Points</label>
                  <span className="text-[10px] text-slate-500">Sample Size</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 rounded-md text-[10px] font-bold bg-purple-500/10 border-purple-500/30 border">
                  <span className="text-purple-400">Samples</span>
                </div>
                <span className="text-2xl font-black text-purple-400">
                  {vitals.count}
                </span>
              </div>
            </div>
            
            <input
              type="range"
              min="1"
              max="50"
              value={vitals.count}
              onChange={(e) => handleChange('count', parseInt(e.target.value))}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="w-full slider-purple touch-manipulation"
              style={{
                background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${((vitals.count - 1) / (50 - 1)) * 100}%, #1e293b ${((vitals.count - 1) / (50 - 1)) * 100}%, #1e293b 100%)`
              }}
            />
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block">Min</span>
                <span className="text-xs font-bold text-slate-400">1</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium px-2 py-1 bg-slate-900/50 rounded">More = Better Accuracy</span>
              <div className="text-center">
                <span className="text-[10px] text-slate-500 block">Max</span>
                <span className="text-xs font-bold text-slate-400">50</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Summary Panel */}
      <div className="relative mt-3 pt-4 border-t border-slate-800/50 flex-shrink-0">
        <div className="grid grid-cols-3 gap-2">
          {/* Heart Rate Variability */}
          <div className="group relative bg-gradient-to-br from-cyan-500/10 to-transparent rounded-lg p-2.5 border border-cyan-500/30 hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-cyan-500/10">
            <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-1.5 mb-1">
              <div className="p-1 bg-cyan-500/20 rounded">
                <Activity className="w-3 h-3 text-cyan-400" strokeWidth={2.5} />
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Variability</span>
            </div>
            <p className="relative text-xl font-black text-cyan-400">{vitals.max_value - vitals.min_value}</p>
            <span className="relative text-[9px] text-slate-500 font-semibold">bpm range</span>
          </div>
          
          {/* Sample Count */}
          <div className="group relative bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg p-2.5 border border-purple-500/30 hover:border-purple-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-purple-500/10">
            <div className="absolute inset-0 bg-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-1.5 mb-1">
              <div className="p-1 bg-purple-500/20 rounded">
                <BarChart3 className="w-3 h-3 text-purple-400" strokeWidth={2.5} />
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Samples</span>
            </div>
            <p className="relative text-xl font-black text-purple-400">{vitals.count}</p>
            <span className="relative text-[9px] text-slate-500 font-semibold">data points</span>
          </div>
          
          {/* Status Indicator */}
          <div className="group relative bg-gradient-to-br from-emerald-500/10 to-transparent rounded-lg p-2.5 border border-emerald-500/30 hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-xl hover:shadow-emerald-500/10">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-1.5 mb-1">
              <div className="p-1 bg-emerald-500/20 rounded relative">
                <Zap className="w-3 h-3 text-emerald-400" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-emerald-400 blur-md opacity-30 animate-pulse"></div>
              </div>
              <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Monitor</span>
            </div>
            <p className="relative text-xl font-black text-emerald-400">Live</p>
            <span className="relative text-[9px] text-slate-500 font-semibold">streaming</span>
          </div>
        </div>
      </div>
    </div>
  )
}
