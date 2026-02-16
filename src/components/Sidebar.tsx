import { Home, TrendingUp, Users, FileText } from 'lucide-react'

interface SidebarProps {
  selectedDate: string
  onDateChange: (date: string) => void
}

export default function Sidebar({ selectedDate, onDateChange }: SidebarProps) {
  return (
    <div className="w-64 bg-white rounded-[2rem] shadow-sm p-8 flex flex-col border border-slate-50 shrink-0">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Migraine</h1>
      <h2 className="text-lg text-slate-400 mb-6">Tracker</h2>

      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
        Date
      </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="mb-8 px-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-pink-200"
      />

      <nav className="flex flex-col gap-6 text-sm font-medium text-slate-500">
        <button className="flex items-center gap-4 text-slate-800 font-semibold">
          <Home size={20} /> Dashboard
        </button>
        <button className="flex items-center gap-4 hover:text-slate-800 cursor-not-allowed opacity-50">
          <TrendingUp size={20} /> Trends
        </button>
        <button className="flex items-center gap-4 hover:text-slate-800 cursor-not-allowed opacity-50">
          <Users size={20} /> Friends
        </button>
        <button className="flex items-center gap-4 hover:text-slate-800 cursor-not-allowed opacity-50">
          <FileText size={20} /> Reports
        </button>
      </nav>
    </div>
  )
}
