interface StressCardProps {
  mentalStress: number
  physicalStress: number
  onMentalChange: (val: number) => void
  onPhysicalChange: (val: number) => void
}

export default function StressCard({
  mentalStress,
  physicalStress,
  onMentalChange,
  onPhysicalChange,
}: StressCardProps) {
  const circumference = 2 * Math.PI * 28

  const Ring = ({
    value,
    color,
    label,
  }: {
    value: number
    color: string
    label: string
  }) => {
    const percent = value * 10
    const colors: Record<string, { track: string; fill: string }> = {
      indigo: { track: '#c7d2fe', fill: '#818cf8' },
      green: { track: '#bbf7d0', fill: '#4ade80' },
    }
    const c = colors[color]

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-20 h-20">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 72 72">
            <circle
              cx="36"
              cy="36"
              r="28"
              fill="none"
              stroke={c.track}
              strokeWidth="7"
            />
            <circle
              cx="36"
              cy="36"
              r="28"
              fill="none"
              stroke={c.fill}
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * percent) / 100}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-slate-700">{value}</span>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-medium uppercase">
          {label}
        </span>
      </div>
    )
  }

  return (
    <div className="bg-[#FFF0E6] rounded-[2rem] p-8 shadow-sm">
      <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-6">
        Stress Levels
      </h3>
      <div className="flex justify-around items-center px-4 mb-6">
        <Ring value={mentalStress} color="indigo" label="Mental" />
        <Ring value={physicalStress} color="green" label="Physical" />
      </div>
      <div className="space-y-3 px-2">
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Mental: {mentalStress}
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={mentalStress}
            onChange={(e) => onMentalChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-indigo-200"
          />
        </div>
        <div>
          <label className="text-xs text-slate-500 mb-1 block">
            Physical: {physicalStress}
          </label>
          <input
            type="range"
            min={1}
            max={10}
            value={physicalStress}
            onChange={(e) => onPhysicalChange(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer bg-green-200"
          />
        </div>
      </div>
    </div>
  )
}
