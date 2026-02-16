import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'
import type { DailyEntry } from '../hooks/useDailyEntry'

interface ReportsPageProps {
  entries: DailyEntry[]
}

export default function ReportsPage({ entries }: ReportsPageProps) {
  // Group by month
  const monthlyMap = new Map<string, DailyEntry[]>()
  entries.forEach((e) => {
    const key = e.date.slice(0, 7) // "2025-11"
    if (!monthlyMap.has(key)) monthlyMap.set(key, [])
    monthlyMap.get(key)!.push(e)
  })

  const monthlyStats = Array.from(monthlyMap.entries()).map(([month, days]) => {
    const headacheDays = days.filter((d) => d.headache).length
    const avgIntensity = headacheDays
      ? (days.filter((d) => d.headache).reduce((s, d) => s + d.headache_intensity, 0) / headacheDays).toFixed(1)
      : '0'
    const avgSleep = (days.reduce((s, d) => s + d.sleep_score, 0) / days.length).toFixed(1)
    const avgMental = (days.reduce((s, d) => s + d.mental_stress, 0) / days.length).toFixed(1)
    const avgPhysical = (days.reduce((s, d) => s + d.physical_stress, 0) / days.length).toFixed(1)
    const avgScreen = (days.reduce((s, d) => s + d.screen_time, 0) / days.length).toFixed(1)
    const workoutDays = days.filter((d) => d.workout_cardio || d.workout_upper || d.workout_lower).length
    const routineDays = days.filter((d) => d.routine_read && d.routine_meditate && d.routine_bath).length

    const monthLabel = new Date(month + '-01T00:00:00').toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    })

    return {
      month,
      monthLabel,
      totalDays: days.length,
      headacheDays,
      avgIntensity,
      avgSleep,
      avgMental,
      avgPhysical,
      avgScreen,
      workoutDays,
      routineDays,
    }
  })

  // Cycle-based analysis
  const cyclePhases = {
    menstrual: { label: 'Menstrual (Days 1-5)', days: [] as DailyEntry[] },
    follicular: { label: 'Follicular (Days 6-13)', days: [] as DailyEntry[] },
    ovulation: { label: 'Ovulation (Days 14-16)', days: [] as DailyEntry[] },
    luteal: { label: 'Luteal (Days 17-28)', days: [] as DailyEntry[] },
  }

  entries.forEach((e) => {
    if (!e.cycle_day) return
    if (e.cycle_day <= 5) cyclePhases.menstrual.days.push(e)
    else if (e.cycle_day <= 13) cyclePhases.follicular.days.push(e)
    else if (e.cycle_day <= 16) cyclePhases.ovulation.days.push(e)
    else cyclePhases.luteal.days.push(e)
  })

  const cycleData = Object.values(cyclePhases).map((phase) => {
    const total = phase.days.length
    const headaches = phase.days.filter((d) => d.headache).length
    const rate = total ? Math.round((headaches / total) * 100) : 0
    const avgIntensity = headaches
      ? (phase.days.filter((d) => d.headache).reduce((s, d) => s + d.headache_intensity, 0) / headaches).toFixed(1)
      : '0'
    const avgSleep = total
      ? (phase.days.reduce((s, d) => s + d.sleep_score, 0) / total).toFixed(1)
      : '0'
    const avgMental = total
      ? (phase.days.reduce((s, d) => s + d.mental_stress, 0) / total).toFixed(1)
      : '0'

    return {
      phase: phase.label,
      shortName: phase.label.split(' ')[0],
      totalDays: total,
      headaches,
      rate,
      avgIntensity,
      avgSleep,
      avgMental,
    }
  })

  const pieColors = ['#f9a8d4', '#93c5fd', '#fde68a', '#c4b5fd']

  // Monthly comparison bar chart data
  const monthlyBarData = monthlyStats.map((m) => ({
    month: m.monthLabel.split(' ')[0].slice(0, 3),
    headaches: m.headacheDays,
    avgSleep: Number(m.avgSleep),
    avgStress: ((Number(m.avgMental) + Number(m.avgPhysical)) / 2).toFixed(1),
  }))

  return (
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-slate-800">Reports</h2>

      {/* Monthly Summaries */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-6">
          Monthly Summary
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {monthlyStats.map((m) => (
            <div
              key={m.month}
              className="bg-slate-50 rounded-2xl p-5 grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              <div className="col-span-2 lg:col-span-4">
                <h4 className="font-bold text-slate-700 text-lg">{m.monthLabel}</h4>
                <span className="text-xs text-slate-400">{m.totalDays} days tracked</span>
              </div>
              <MiniStat label="Headache Days" value={`${m.headacheDays}`} color="text-pink-600" />
              <MiniStat label="Avg Intensity" value={m.avgIntensity} color="text-red-500" />
              <MiniStat label="Avg Sleep" value={`${m.avgSleep}/10`} color="text-green-600" />
              <MiniStat label="Avg Screen" value={`${m.avgScreen}h`} color="text-purple-600" />
              <MiniStat label="Mental Stress" value={`${m.avgMental}/10`} color="text-indigo-600" />
              <MiniStat label="Physical Stress" value={`${m.avgPhysical}/10`} color="text-emerald-600" />
              <MiniStat label="Workout Days" value={`${m.workoutDays}`} color="text-blue-600" />
              <MiniStat label="Full Routine" value={`${m.routineDays} days`} color="text-amber-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Comparison Chart */}
      <div className="bg-[#FFF0F5] rounded-[2rem] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
          Monthly Headache Comparison
        </h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyBarData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="headaches" fill="#f9a8d4" radius={[8, 8, 0, 0]} name="Headache Days" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Cycle-Based Analysis */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-6">
          Cycle Phase Analysis
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="flex flex-col items-center">
            <p className="text-xs text-slate-500 mb-3 uppercase tracking-wider font-bold">
              Headache Distribution by Phase
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={cycleData}
                  dataKey="headaches"
                  nameKey="shortName"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ shortName, rate }) => `${shortName} ${rate}%`}
                >
                  {cycleData.map((_, i) => (
                    <Cell key={i} fill={pieColors[i]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Phase Details */}
          <div className="flex flex-col gap-3">
            {cycleData.map((phase, i) => (
              <div
                key={phase.phase}
                className="rounded-xl p-4 flex items-center gap-4"
                style={{ backgroundColor: `${pieColors[i]}30` }}
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: pieColors[i] }}
                />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-slate-700">
                    {phase.phase}
                  </div>
                  <div className="text-xs text-slate-500">
                    {phase.totalDays} days tracked
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-700">
                    {phase.rate}% migraine
                  </div>
                  <div className="text-xs text-slate-400">
                    avg intensity: {phase.avgIntensity}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cycle Phase Sleep & Stress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#E8F3E8] rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
            Sleep Score by Cycle Phase
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cycleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="shortName" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="avgSleep" fill="#86efac" radius={[8, 8, 0, 0]} name="Avg Sleep Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#FFF0E6] rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
            Mental Stress by Cycle Phase
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cycleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="shortName" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="avgMental" fill="#fbbf24" radius={[8, 8, 0, 0]} name="Avg Mental Stress" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function MiniStat({
  label,
  value,
  color,
}: {
  label: string
  value: string
  color: string
}) {
  return (
    <div>
      <div className="text-xs text-slate-400 uppercase tracking-wider">{label}</div>
      <div className={`text-lg font-bold ${color}`}>{value}</div>
    </div>
  )
}
