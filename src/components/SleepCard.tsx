import { Moon, Clock } from 'lucide-react'

interface SleepCardProps {
  sleepTime: string
  wakeTime: string
  sleepScore: number
  onSleepTimeChange: (val: string) => void
  onWakeTimeChange: (val: string) => void
  onSleepScoreChange: (val: number) => void
}

export default function SleepCard({
  sleepTime,
  wakeTime,
  sleepScore,
  onSleepTimeChange,
  onWakeTimeChange,
  onSleepScoreChange,
}: SleepCardProps) {
  const scorePercent = sleepScore * 10
  const circumference = 2 * Math.PI * 40

  return (
    <div className="bg-[#E8F3E8] rounded-[2rem] p-8 shadow-sm flex justify-between items-center gap-6">
      <div className="flex flex-col gap-5">
        <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
          Sleep & Recovery
        </h3>

        <div className="flex items-center gap-4">
          <Moon className="text-slate-500 shrink-0" size={22} />
          <div>
            <div className="text-xs text-slate-500 mb-1">SLEEP TIME</div>
            <input
              type="time"
              value={sleepTime}
              onChange={(e) => onSleepTimeChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Clock className="text-slate-500 shrink-0" size={22} />
          <div>
            <div className="text-xs text-slate-500 mb-1">WAKE TIME</div>
            <input
              type="time"
              value={wakeTime}
              onChange={(e) => onWakeTimeChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-sm text-slate-700 bg-white/70 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="relative w-24 h-24">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="8"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="#86efac"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * scorePercent) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-slate-500">SLEEP</span>
            <span className="text-lg font-bold text-slate-700">
              {sleepScore}/10
            </span>
          </div>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          value={sleepScore}
          onChange={(e) => onSleepScoreChange(Number(e.target.value))}
          className="w-20 h-1.5 rounded-full appearance-none cursor-pointer bg-green-200"
        />
      </div>
    </div>
  )
}
