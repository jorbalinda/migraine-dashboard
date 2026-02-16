import { Trophy } from 'lucide-react'

interface CompetingCardProps {
  isCompeting: boolean
  onCompetingChange: (val: boolean) => void
}

export default function CompetingCard({
  isCompeting,
  onCompetingChange,
}: CompetingCardProps) {
  return (
    <div className="bg-[#FFF8E6] rounded-[2rem] p-6 shadow-sm">
      <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
        Competing
      </h3>
      <button
        onClick={() => onCompetingChange(!isCompeting)}
        className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold transition-colors w-full ${
          isCompeting
            ? 'bg-amber-200/70 text-amber-800'
            : 'bg-white text-slate-500 shadow-sm hover:bg-amber-50'
        }`}
      >
        <Trophy size={20} className={isCompeting ? 'text-amber-600' : 'text-slate-400'} />
        {isCompeting ? 'Competition Day' : 'Not Competing'}
      </button>
    </div>
  )
}
