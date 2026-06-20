import { Bookmark } from 'lucide-react'

interface SummaryCardProps {
  items: string[]
}

export function SummaryCard({ items }: SummaryCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 mt-1 mb-2.5">
      <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-text-faint uppercase tracking-wider mb-3">
        <Bookmark size={12} />
        Tóm tắt bài học
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2 text-[13px] text-text leading-relaxed mb-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-1.5" />
          <span>{item}</span>
        </div>
      ))}
    </div>
  )
}
