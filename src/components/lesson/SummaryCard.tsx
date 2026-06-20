import { Bookmark } from 'lucide-react'

interface SummaryCardProps {
  items: string[]
  itemsVi?: string[]
  bilingual?: boolean
}

export function SummaryCard({ items, itemsVi, bilingual }: SummaryCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 mt-1 mb-2.5">
      <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-text-faint uppercase tracking-wider mb-3">
        <Bookmark size={12} />
        Lesson Summary
      </div>
      {items.map((item, i) => (
        <div key={i} className="mb-2">
          <div className="flex items-start gap-2 text-[13px] text-text leading-relaxed">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-blue flex-shrink-0 mt-1.5" />
            <span>{item}</span>
          </div>
          {bilingual && itemsVi?.[i] && (
            <div className="flex items-start gap-2 text-[12.5px] text-text-muted leading-relaxed mt-0.5 pl-3.5">
              <span className="text-[10px] flex-shrink-0 mt-0.5">🇻🇳</span>
              <span>{itemsVi[i]}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
