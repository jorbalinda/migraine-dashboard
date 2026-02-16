interface CalendarCardProps {
  cycleDay: number | null
  onCycleDayChange: (val: number | null) => void
  selectedDate: string
}

export default function CalendarCard({
  cycleDay,
  onCycleDayChange,
  selectedDate,
}: CalendarCardProps) {
  const date = new Date(selectedDate + 'T00:00:00')
  const year = date.getFullYear()
  const month = date.getMonth()
  const today = date.getDate()

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const monthName = date.toLocaleString('default', { month: 'long', year: 'numeric' })

  const days: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  return (
    <div className="bg-[#FFF0F5] rounded-[2rem] p-6 shadow-sm">
      <div className="bg-white rounded-2xl p-6 flex flex-col">
        <h3 className="text-center font-bold text-slate-700 mb-4 tracking-widest text-sm uppercase">
          {monthName}
        </h3>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-2">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
            <span key={d} className={d === 'SUN' || d === 'SAT' ? 'text-red-300' : ''}>
              {d}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-sm">
          {days.map((day, i) => (
            <div
              key={i}
              className={`h-8 flex items-center justify-center rounded-lg ${
                day === today
                  ? 'bg-pink-200 text-pink-800 font-bold'
                  : day
                  ? 'text-slate-600 hover:bg-pink-50'
                  : ''
              }`}
            >
              {day ?? ''}
            </div>
          ))}
        </div>

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
