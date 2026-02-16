export type Page = 'dashboard' | 'trends' | 'reports'

interface GlassHeaderProps {
  currentPage: Page
  onPageChange: (page: Page) => void
  selectedDate: string
  onDateChange: (date: string) => void
}

export default function GlassHeader({
  currentPage,
  onPageChange,
  selectedDate,
  onDateChange,
}: GlassHeaderProps) {
  return (
    <header
      className="w-full max-w-6xl mx-auto flex items-center justify-between px-10 py-5 rounded-[30px] border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
      style={{
        background: 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div>
        <span className="text-xs font-bold uppercase tracking-[1.5px] text-[#fbc2ab]">
          Migraine Tracker
        </span>
        <h1 className="text-xl font-medium text-[#4a4a4a] -tracking-wide m-0">
          Allie's Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-8">
        {currentPage === 'dashboard' && (
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-white/60 text-sm text-[#4a4a4a] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#a1c4fd]/50"
          />
        )}

        <nav className="flex gap-6">
          {(['dashboard', 'trends', 'reports'] as Page[]).map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`text-sm font-medium capitalize transition-opacity ${
                currentPage === page
                  ? 'text-[#a1c4fd] opacity-100'
                  : 'text-[#4a4a4a] opacity-60 hover:opacity-100'
              }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
