import type { DailyEntry } from '../hooks/useDailyEntry'

interface CalendarCardProps {
  cycleDay: number | null
  onCycleDayChange: (val: number | null) => void
  selectedDate: string
  onDateChange: (date: string) => void
  allEntries: DailyEntry[]
}

export default function CalendarCard({
  cycleDay,
  onCycleDayChange,
  selectedDate,
  onDateChange,
  allEntries,
}: CalendarCardProps) {
  const date = new Date(selectedDate + 'T00:00:00')
  const year = date.getFullYear()
  const month = date.getMonth()
  const selectedDay = date.getDate()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' })

  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  // Build a map of entries for this month
  const entryMap = new Map<number, DailyEntry>()
  allEntries.forEach((e) => {
    const d = new Date(e.date + 'T00:00:00')
    if (d.getFullYear() === year && d.getMonth() === month) {
      entryMap.set(d.getDate(), e)
    }
  })

  const handleDayClick = (day: number) => {
    const m = String(month + 1).padStart(2, '0')
    const d = String(day).padStart(2, '0')
    onDateChange(`${year}-${m}-${d}`)
  }

  const handlePrevMonth = () => {
    const prev = new Date(year, month - 1, 1)
    const m = String(prev.getMonth() + 1).padStart(2, '0')
    onDateChange(`${prev.getFullYear()}-${m}-01`)
  }

  const handleNextMonth = () => {
    const next = new Date(year, month + 1, 1)
    const m = String(next.getMonth() + 1).padStart(2, '0')
    onDateChange(`${next.getFullYear()}-${m}-01`)
  }

  return (
    <div className="bg-[#FFF0F5] rounded-[2rem] p-6 shadow-sm">
      <div className="bg-white rounded-2xl p-6 flex flex-col">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className="w-8 h-8 rounded-full bg-pink-50 text-pink-400 hover:bg-pink-100 flex items-center justify-center font-bold cursor-pointer transition-colors"
          >
            &lt;
          </button>
          <h3 className="font-bold text-slate-700 tracking-widest text-sm uppercase">
            {monthName}
          </h3>
          <button
            onClick={handleNextMonth}
            className="w-8 h-8 rounded-full bg-pink-50 text-pink-400 hover:bg-pink-100 flex items-center justify-center font-bold cursor-pointer transition-colors"
          >
            &gt;
          </button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-2">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
            <span key={d} className={d === 'SUN' || d === 'SAT' ? 'text-red-300' : ''}>
              {d}
            </span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {days.map((day, i) => {
            if (!day) return <div key={i} />

            const entry = entryMap.get(day)
            const isSelected = day === selectedDay
            const hasHeadache = entry?.headache
            const hasCycle = entry?.cycle_day != null && entry.cycle_day > 0

            return (
              <button
                key={i}
                onClick={() => handleDayClick(day)}
                className={`h-9 w-full flex items-center justify-center rounded-lg cursor-pointer transition-all relative ${
                  isSelected
                    ? 'bg-pink-400 text-white font-bold shadow-md'
                    : hasHeadache
                    ? 'bg-red-100 text-red-700 font-semibold hover:bg-red-200'
                    : hasCycle
                    ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    : 'text-slate-600 hover:bg-pink-50'
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>

        {/* Cycle Day Input */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Cycle Day
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={45}
              value={cycleDay ?? ''}
              placeholder="—"
              onChange={(e) =>
                onCycleDayChange(e.target.value ? Number(e.target.value) : null)
              }
              className="w-20 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
            <span className="text-xs text-slate-400">of current cycle</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-3 flex gap-2">
          <span className="text-xs bg-indigo-50 text-indigo-400 px-3 py-1 rounded-full">
            Cycle Days
          </span>
          <span className="text-xs bg-red-50 text-red-400 px-3 py-1 rounded-full">
            Migraine Days
          </span>
        </div>
      </div>
    </div>
  )
}
