import { Monitor } from 'lucide-react'

interface ScreenTimeCardProps {
  screenTime: number
  onScreenTimeChange: (val: number) => void
}

export default function ScreenTimeCard({
  screenTime,
  onScreenTimeChange,
}: ScreenTimeCardProps) {
  return (
    <div className="bg-[#F0E6FA] rounded-[2rem] p-8 shadow-sm">
      <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-6">
        Screen Time
      </h3>
      <div className="flex items-center gap-4">
        <Monitor className="text-purple-400 shrink-0" size={24} />
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-3">
            <input
              type="number"
              min={0}
              max={24}
              step={0.5}
              value={screenTime}
              onChange={(e) => onScreenTimeChange(Number(e.target.value))}
              className="w-20 px-3 py-2 rounded-xl border border-slate-200 text-lg font-bold text-slate-700 bg-white/70 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <span className="text-sm text-slate-500">hours</span>
          </div>
          <input
            type="range"
            min={0}
            max={16}
            step={0.5}
            value={screenTime}
            onChange={(e) => onScreenTimeChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-purple-200"
          />
        </div>
      </div>
    </div>
  )
}
