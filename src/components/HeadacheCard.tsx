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
    <div className="bg-[#FFF0F5] rounded-[2rem] p-8 shadow-sm">
      <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-6">
        Headache Today?
      </h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => onHeadacheChange(true)}
          className={`flex-1 py-4 rounded-2xl text-lg font-bold transition-all cursor-pointer ${
            headache
              ? 'bg-red-400 text-white shadow-lg scale-[1.02]'
              : 'bg-white/70 text-slate-400 hover:bg-white hover:shadow-md'
          }`}
        >
          Yes
        </button>
        <button
          onClick={() => onHeadacheChange(false)}
          className={`flex-1 py-4 rounded-2xl text-lg font-bold transition-all cursor-pointer ${
            !headache
              ? 'bg-green-400 text-white shadow-lg scale-[1.02]'
              : 'bg-white/70 text-slate-400 hover:bg-white hover:shadow-md'
          }`}
        >
          No
        </button>
      </div>

      {headache && (
        <div className="bg-white rounded-2xl p-6">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
            Intensity Level
          </h3>
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
