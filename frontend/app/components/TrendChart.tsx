'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { TrendingUp, Activity } from 'lucide-react'

interface TrendChartProps {
  meanValue: number
}

export default function TrendChart({ meanValue }: TrendChartProps) {
  const [trendData, setTrendData] = useState<Array<{
    time: string
    value: number
    timestamp: string
  }>>([])
  const [isClient, setIsClient] = useState(false)

  // Generate trend data only on client side to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true)
    
    const generateTrendData = () => {
      const data = []
      const now = new Date()
      
      for (let i = 9; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 2 * 60000) // 2-minute intervals
        // Use deterministic variance based on meanValue and index to avoid hydration issues
        const variance = Math.sin(i + meanValue / 10) * 3 + Math.cos(i * meanValue / 20) * 2
        const value = Math.max(40, Math.min(120, meanValue + variance - (i * 0.5)))
        
        data.push({
          time: i === 0 ? 'Now' : `-${i * 2}m`,
          value: Math.round(value * 10) / 10,
          timestamp: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
        })
      }
      
      return data
    }

    setTrendData(generateTrendData())
  }, [meanValue])

  // Show loading state during hydration
  if (!isClient || trendData.length === 0) {
    return (
      <div className="bg-gradient-to-br from-[#0F1729]/90 to-[#0A0F1E]/70 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-800/50 p-3 sm:p-4 shadow-2xl h-full flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading chart...</div>
      </div>
    )
  }

  const maxValue = Math.max(...trendData.map(d => d.value))
  const minValue = Math.min(...trendData.map(d => d.value))
  const avgValue = trendData.reduce((sum, d) => sum + d.value, 0) / trendData.length

  // Determine trend direction
  const trendDirection = trendData[trendData.length - 1].value > trendData[0].value ? 'up' : 'down'
  const trendColor = trendDirection === 'up' ? 'text-red-400' : 'text-emerald-400'

  return (
    <div className="relative bg-gradient-to-br from-[#0F1729]/95 to-[#0A0F1E]/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-slate-800/50 p-3 sm:p-4 shadow-2xl h-full flex flex-col overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-2 sm:mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500 blur-lg opacity-40 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-cyan-600 to-teal-600 p-2 rounded-lg">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <h2 className="text-sm sm:text-base md:text-lg font-bold text-white">
              <span className="hidden sm:inline">Vital Signs Monitoring</span>
              <span className="sm:hidden">Vital Trends</span>
            </h2>
            <p className="hidden sm:block text-[10px] text-slate-400">20-minute historical data</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border ${
          trendDirection === 'up' 
            ? 'bg-red-500/10 border-red-500/30' 
            : 'bg-emerald-500/10 border-emerald-500/30'
        }`}>
          <TrendingUp className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${trendColor}`} strokeWidth={2.5} />
          <span className={`text-[10px] sm:text-xs font-bold ${trendColor}`}>
            {trendDirection === 'up' ? '↑ Rising' : '↓ Falling'}
          </span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid grid-cols-3 gap-1.5 sm:gap-2 mb-2 sm:mb-3 flex-shrink-0">
        <div className="group relative bg-gradient-to-br from-cyan-500/10 to-transparent rounded-lg p-1.5 sm:p-2 border border-cyan-500/20 hover:border-cyan-500/40 shadow-md transition-all">
          <div className="absolute inset-0 bg-cyan-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="relative text-[9px] sm:text-[10px] text-slate-400 mb-0.5 font-semibold uppercase tracking-wider">Current</p>
          <p className="relative text-base sm:text-lg font-black text-cyan-400">{meanValue}</p>
          <p className="relative text-[8px] text-slate-500">bpm</p>
        </div>
        <div className="group relative bg-gradient-to-br from-emerald-500/10 to-transparent rounded-lg p-1.5 sm:p-2 border border-emerald-500/20 hover:border-emerald-500/40 shadow-md transition-all">
          <div className="absolute inset-0 bg-emerald-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="relative text-[9px] sm:text-[10px] text-slate-400 mb-0.5 font-semibold uppercase tracking-wider">Average</p>
          <p className="relative text-base sm:text-lg font-black text-emerald-400">{avgValue.toFixed(1)}</p>
          <p className="relative text-[8px] text-slate-500">bpm</p>
        </div>
        <div className="group relative bg-gradient-to-br from-purple-500/10 to-transparent rounded-lg p-1.5 sm:p-2 border border-purple-500/20 hover:border-purple-500/40 shadow-md transition-all">
          <div className="absolute inset-0 bg-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <p className="relative text-[9px] sm:text-[10px] text-slate-400 mb-0.5 font-semibold uppercase tracking-wider">Variability</p>
          <p className="relative text-base sm:text-lg font-black text-purple-400">{(maxValue - minValue).toFixed(1)}</p>
          <p className="relative text-[8px] text-slate-500">bpm</p>
        </div>
      </div>

      {/* Chart - Always Visible with Fixed Heights */}
      <div className="bg-[#0A0F1E]/60 rounded-lg sm:rounded-xl p-2 sm:p-3 border border-slate-800/50 flex-1 overflow-hidden shadow-inner">
        <div className="w-full h-full min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#64748b"
              style={{ fontSize: '9px', fontWeight: '500' }}
              tick={{ fill: '#94a3b8' }}
              height={30}
            />
            <YAxis 
              stroke="#64748b"
              style={{ fontSize: '9px', fontWeight: '500' }}
              tick={{ fill: '#94a3b8' }}
              domain={[40, 120]}
              width={35}
            />
             <Tooltip
               contentStyle={{
                 backgroundColor: '#0f172a',
                 border: '1px solid #334155',
                 borderRadius: '8px',
                 padding: '8px',
                 boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
                 fontSize: '11px'
               }}
               labelStyle={{ color: '#cbd5e1', fontWeight: '600', marginBottom: '2px', fontSize: '10px' }}
               itemStyle={{ color: '#06b6d4', fontWeight: '700', fontSize: '11px' }}
               formatter={(value?: number, name?: string, props?: any) => [
                 `${value || 0} bpm`,
                 `Heart Rate (${props?.payload?.timestamp || 'N/A'})`
               ]}
             />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={3}
              fill="url(#colorValue)"
              dot={{ 
                fill: '#06b6d4', 
                r: 4,
                strokeWidth: 2,
                stroke: '#0A0F1E'
              }}
              activeDot={{ 
                r: 6,
                fill: '#06b6d4',
                stroke: '#22d3ee',
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
        </div>
      </div>

      {/* Chart Footer Info */}
      <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-500 flex-shrink-0">
        <span className="hidden sm:inline">Updates every 2 minutes</span>
        <span className="sm:hidden">2min updates</span>
        <span className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
          <span className="hidden sm:inline">Heart Rate (bpm)</span>
          <span className="sm:hidden">HR (bpm)</span>
        </span>
      </div>
    </div>
  )
}
