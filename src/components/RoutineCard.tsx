import { CheckCircle2, Circle } from 'lucide-react'

interface RoutineCardProps {
  read: boolean
  meditate: boolean
  bath: boolean
  onReadChange: (val: boolean) => void
  onMeditateChange: (val: boolean) => void
  onBathChange: (val: boolean) => void
}

export default function RoutineCard({
  read,
  meditate,
  bath,
  onReadChange,
  onMeditateChange,
  onBathChange,
}: RoutineCardProps) {
  return (
    <div className="bg-[#FFFFEE] rounded-[2rem] p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
        Nightly Routine
      </h3>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onReadChange(!read)}
          className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-800 transition-colors"
        >
          {read ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : (
            <Circle size={20} className="text-orange-300" />
          )}
          <span className={read ? 'line-through text-slate-400' : ''}>
            Read
          </span>
        </button>
        <button
          onClick={() => onMeditateChange(!meditate)}
          className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-800 transition-colors"
        >
          {meditate ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : (
            <Circle size={20} className="text-blue-300" />
          )}
          <span className={meditate ? 'line-through text-slate-400' : ''}>
            Meditate
          </span>
        </button>
        <button
          onClick={() => onBathChange(!bath)}
          className="flex items-center gap-3 text-sm text-slate-600 hover:text-slate-800 transition-colors"
        >
          {bath ? (
            <CheckCircle2 size={20} className="text-green-500" />
          ) : (
            <Circle size={20} className="text-purple-300" />
          )}
          <span className={bath ? 'line-through text-slate-400' : ''}>
            Bath
          </span>
        </button>
      </div>
    </div>
  )
}
