interface WorkoutCardProps {
  cardio: boolean
  upper: boolean
  lower: boolean
  onCardioChange: (val: boolean) => void
  onUpperChange: (val: boolean) => void
  onLowerChange: (val: boolean) => void
}

export default function WorkoutCard({
  cardio,
  upper,
  lower,
  onCardioChange,
  onUpperChange,
  onLowerChange,
}: WorkoutCardProps) {
  const Toggle = ({
    label,
    active,
    onClick,
  }: {
    label: string
    active: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${
        active
          ? 'bg-blue-200/70 text-blue-800 shadow-sm'
          : 'bg-white text-slate-500 shadow-sm hover:bg-blue-50'
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="bg-[#E6F0FA] rounded-[2rem] p-8 shadow-sm">
      <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-6">
        Workout
      </h3>
      <div className="flex flex-wrap gap-3">
        <Toggle label="CARDIO" active={cardio} onClick={() => onCardioChange(!cardio)} />
        <Toggle label="UPPER BODY" active={upper} onClick={() => onUpperChange(!upper)} />
        <Toggle label="LOWER BODY" active={lower} onClick={() => onLowerChange(!lower)} />
      </div>
    </div>
  )
}
