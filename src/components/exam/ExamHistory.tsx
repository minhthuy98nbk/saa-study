import { Trophy } from 'lucide-react'
import type { ExamAttempt } from '@/types'
import { scoreColor, formatDate, cn } from '@/lib/utils'

interface ExamHistoryProps {
  history: ExamAttempt[]
  onViewDetail: (attempt: ExamAttempt, index: number) => void
}

export function ExamHistory({ history, onViewDetail }: ExamHistoryProps) {
  if (history.length === 0) {
    return (
      <p className="text-center text-text-faint text-[13px] py-6">Chưa có lịch sử thi.</p>
    )
  }

  const best = Math.max(...history.map(h => h.pct))
  const bestIndex = history.findIndex(h => h.pct === best)

  return (
    <div>
      <div className="flex items-center gap-1.5 text-[12px] text-text-muted mb-3">
        <Trophy size={13} className="text-brand-amber" />
        Điểm cao nhất:
        <span className="bg-light-amber text-brand-amber px-2 py-0.5 rounded-full text-[11px] font-bold">{best}%</span>
      </div>
      <div className="grid gap-1.5">
        {history.map((attempt, i) => (
          <div
            key={i}
            onClick={() => onViewDetail(attempt, i)}
            className="bg-page border border-border rounded px-3.5 py-3 cursor-pointer hover:border-brand-blue hover:bg-light-blue transition-all"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={cn('text-[19px] font-black', scoreColor(attempt.pct))}>
                {attempt.pct}%
              </span>
              {i === bestIndex && (
                <span className="text-[10.5px] bg-light-amber text-brand-amber px-2 py-0.5 rounded-full font-bold">Tốt nhất</span>
              )}
              <span className="text-[11px] text-text-faint ml-auto">{formatDate(attempt.date)}</span>
            </div>
            <p className="text-[11.5px] text-text-muted">
              {attempt.okCount}/{attempt.total} câu đúng · Bấm để xem chi tiết →
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
