import { ArrowLeft } from 'lucide-react'
import type { ExamAttempt } from '@/types'
import { cn } from '@/lib/utils'

interface ExamReviewProps {
  attempt: ExamAttempt
  onBack: () => void
}

export function ExamReview({ attempt, onBack }: ExamReviewProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-brand-blue text-[13px] font-semibold mb-3.5 hover:text-blue-700"
      >
        <ArrowLeft size={14} /> Back to history
      </button>

      {/* Stats row */}
      <div className="flex gap-2 mb-4">
        {[
          { label: 'Correct', value: attempt.okCount, color: 'text-brand-green' },
          { label: 'Wrong', value: attempt.total - attempt.okCount, color: 'text-brand-red' },
          { label: 'Total', value: attempt.total, color: 'text-text' },
        ].map(s => (
          <div key={s.label} className="bg-page border border-border rounded px-4 py-2 text-center min-w-[60px]">
            <div className={cn('text-xl font-bold', s.color)}>{s.value}</div>
            <div className="text-[10.5px] text-text-faint font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Question review */}
      {attempt.answers.map((a, i) => (
        <div key={i} className="bg-page border border-border rounded px-3.5 py-3 mb-2.5">
          <p className="text-[13px] font-semibold text-text mb-2 leading-snug">
            {i + 1}. {a.questionId}
          </p>
          {a.ok ? (
            <p className="text-[11.5px] text-brand-green">✓ Correct — selected {a.chosen.join(', ')}</p>
          ) : (
            <>
              <p className="text-[11.5px] text-brand-red mb-1">✗ Wrong — selected {a.chosen.join(', ')}</p>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
