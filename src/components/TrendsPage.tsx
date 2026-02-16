import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, AreaChart, Area,
} from 'recharts'
import type { DailyEntry } from '../hooks/useDailyEntry'

interface TrendsPageProps {
  entries: DailyEntry[]
}

export default function TrendsPage({ entries }: TrendsPageProps) {
  const totalDays = entries.length
  const headacheDays = entries.filter((e) => e.headache).length
  const avgSleep = totalDays
    ? (entries.reduce((s, e) => s + e.sleep_score, 0) / totalDays).toFixed(1)
    : '—'
  const avgMental = totalDays
    ? (entries.reduce((s, e) => s + e.mental_stress, 0) / totalDays).toFixed(1)
    : '—'
  const avgPhysical = totalDays
    ? (entries.reduce((s, e) => s + e.physical_stress, 0) / totalDays).toFixed(1)
    : '—'
  const avgScreen = totalDays
    ? (entries.reduce((s, e) => s + e.screen_time, 0) / totalDays).toFixed(1)
    : '—'
  const workoutDays = entries.filter(
    (e) => e.workout_cardio || e.workout_upper || e.workout_lower
  ).length
  const routineComplete = entries.filter(
    (e) => e.routine_read && e.routine_meditate && e.routine_bath
  ).length

  const chartData = entries.map((e) => ({
    date: e.date.slice(5),
    headache: e.headache_intensity,
    sleep: e.sleep_score,
    mental: e.mental_stress,
    physical: e.physical_stress,
    screen: e.screen_time,
  }))

  // Weekly headache frequency
  const weeklyData: { week: string; headaches: number; total: number }[] = []
  for (let i = 0; i < entries.length; i += 7) {
    const weekEntries = entries.slice(i, i + 7)
    const startDate = weekEntries[0]?.date.slice(5) ?? ''
    weeklyData.push({
      week: startDate,
      headaches: weekEntries.filter((e) => e.headache).length,
      total: weekEntries.length,
    })
  }

  return (
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-slate-800">Trends</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Headache Days" value={`${headacheDays}/${totalDays}`} sub="days" color="bg-[#FFF0F5]" />
        <StatCard label="Avg Sleep Score" value={avgSleep} sub="out of 10" color="bg-[#E8F3E8]" />
        <StatCard label="Avg Mental Stress" value={avgMental} sub="out of 10" color="bg-[#FFF0E6]" />
        <StatCard label="Avg Physical Stress" value={avgPhysical} sub="out of 10" color="bg-[#E6F0FA]" />
        <StatCard label="Workout Days" value={`${workoutDays}/${totalDays}`} sub="days" color="bg-[#E6F0FA]" />
        <StatCard label="Avg Screen Time" value={`${avgScreen}h`} sub="per day" color="bg-[#F0E6FA]" />
        <StatCard label="Full Routine" value={`${routineComplete}/${totalDays}`} sub="days" color="bg-[#FFFFEE]" />
        <StatCard
          label="Headache Rate"
          value={`${totalDays ? Math.round((headacheDays / totalDays) * 100) : 0}%`}
          sub="of all days"
          color="bg-[#FFF0F5]"
        />
      </div>

      {/* Headache Intensity Over Time */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-50">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
          Headache Intensity Over Time
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="headacheGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fca5a5" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#fca5a5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <Tooltip />
            <Area type="monotone" dataKey="headache" stroke="#f87171" fill="url(#headacheGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Weekly Headache Frequency */}
      <div className="bg-[#FFF0F5] rounded-[2rem] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
          Weekly Headache Frequency
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
            <XAxis dataKey="week" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis domain={[0, 7]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="headaches" fill="#f9a8d4" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Sleep & Stress Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#E8F3E8] rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
            Sleep Score Trend
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="sleep" stroke="#4ade80" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-[#FFF0E6] rounded-[2rem] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
            Stress Levels
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#fed7aa" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="mental" stroke="#818cf8" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="physical" stroke="#4ade80" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Screen Time */}
      <div className="bg-[#F0E6FA] rounded-[2rem] p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
          Daily Screen Time
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
            <Tooltip />
            <Bar dataKey="screen" fill="#c4b5fd" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  sub,
  color,
}: {
  label: string
  value: string
  sub: string
  color: string
}) {
  return (
    <div className={`${color} rounded-2xl p-5 shadow-sm`}>
      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      <div className="text-xs text-slate-400 mt-1">{sub}</div>
    </div>
  )
}
