interface HeadacheCardProps {
  headache: boolean
  intensity: number
  onHeadacheChange: (val: boolean) => void
  onIntensityChange: (val: number) => void
}

export default function HeadacheCard({
  headache,
  intensity,
  onHeadacheChange,
  onIntensityChange,
}: HeadacheCardProps) {
  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
          Headache
        </h2>
        <button
          onClick={() => onHeadacheChange(!headache)}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
            headache
              ? 'bg-red-100 text-red-700'
              : 'bg-slate-100 text-slate-500'
          }`}
        >
          {headache ? 'Yes' : 'No'}
        </button>
      </div>

      {headache && (
        <div className="px-2">
          <div className="flex justify-between text-xs text-slate-400 mb-2 px-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <span
                key={n}
                className={
                  n === intensity
                    ? 'bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold'
                    : ''
                }
              >
                {n}
              </span>
            ))}
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={intensity}
            onChange={(e) => onIntensityChange(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer"
            style={{
              background:
                'linear-gradient(to right, #bfdbfe, #fbcfe8, #fca5a5)',
            }}
          />
        </div>
      )}
    </div>
  )
}
