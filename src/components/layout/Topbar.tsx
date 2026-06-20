import { Menu, Award } from 'lucide-react'

interface TopbarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function Topbar({ sidebarOpen, onToggleSidebar }: TopbarProps) {
  return (
    <header className="h-[50px] bg-card border-b border-border flex items-center px-4 gap-3 flex-shrink-0 z-50 shadow-sm">
      <button
        onClick={onToggleSidebar}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-sm border transition-all ${
          sidebarOpen
            ? 'bg-light-blue text-brand-blue border-brand-blue'
            : 'bg-white text-text-muted border-border hover:bg-secondary'
        }`}
      >
        <Menu size={14} />
      </button>
      <Award size={18} className="text-brand-blue" />
      <h1 className="text-sm font-semibold text-text whitespace-nowrap">AWS SAA-C03 Cert Prep</h1>
      <span className="bg-light-blue text-brand-blue text-[10.5px] px-2 py-0.5 rounded-full font-semibold tracking-wide">
        SAA-C03 Study
      </span>
    </header>
  )
}
