interface QuizProgressProps {
  current: number
  total: number
}

export function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0
  return (
    <div className="mb-3.5">
      <div className="flex justify-between text-[11px] text-text-faint font-medium mb-1.5">
        <span>Câu {current + 1} / {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-1 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-blue rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
