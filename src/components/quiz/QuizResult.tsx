import { RefreshCw, AlertCircle } from 'lucide-react'
import type { AnswerRecord, ShuffledQuestion } from '@/types'
import { scoreColor, cn } from '@/lib/utils'

interface QuizResultProps {
  pct: number
  okCount: number
  total: number
  results: AnswerRecord[]
  questions: ShuffledQuestion[]
  onRetryAll: () => void
  onRetryWrong: () => void
}

export function QuizResult({ pct, okCount, total, results, questions, onRetryAll, onRetryWrong }: QuizResultProps) {
  const wrongCount = total - okCount

  // Xây wrong answers từ results + original questions
  const wrongItems = results.filter(r => !r.ok).map(r => {
    const sq = questions.find(q => q.original.id === r.questionId)
    if (!sq) return null
    const chosenText = r.chosen.map(i => sq.original.options[i] || '?').join(', ')
    const correctText = sq.original.correctAnswers.map(i => sq.original.options[i] || '?').join(', ')
    return { sq, chosenText, correctText, explanation: sq.original.explanation, question: sq.original.question }
  }).filter(Boolean) as NonNullable<ReturnType<typeof results.filter>[0] & { sq: ShuffledQuestion; chosenText: string; correctText: string; explanation: string; question: string }>[]

  return (
    <div>
      {/* Score */}
      <div className="text-center pb-4 mb-4 border-b border-border">
        <div className={cn('text-5xl font-black mb-1', scoreColor(pct))}>{pct}%</div>
        <p className="text-[13.5px] text-text-muted mb-4">
          {okCount}/{total} correct · {pct >= 80 ? 'Excellent! 🎉' : pct >= 60 ? 'Good job 💪' : 'Keep studying 📖'}
        </p>

        {/* Stats row */}
        <div className="flex gap-2 justify-center mb-4">
          {[
            { label: 'Correct', value: okCount, color: 'text-brand-green' },
            { label: 'Wrong', value: wrongCount, color: 'text-brand-red' },
            { label: 'Total', value: total, color: 'text-text' },
          ].map(s => (
            <div key={s.label} className="bg-page border border-border rounded px-4 py-2.5 text-center min-w-[64px]">
              <div className={cn('text-[22px] font-bold', s.color)}>{s.value}</div>
              <div className="text-[10.5px] text-text-faint mt-0.5 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={onRetryAll}
            className="flex items-center gap-1.5 bg-brand-blue text-white px-3.5 py-2 rounded text-[12.5px] font-semibold hover:bg-blue-700 transition-colors"
          >
            <RefreshCw size={13} /> Retry all
          </button>
          {wrongCount > 0 && (
            <button
              onClick={onRetryWrong}
              className="flex items-center gap-1.5 bg-light-amber text-brand-amber border border-[#FAC775] px-3.5 py-2 rounded text-[12.5px] font-semibold hover:bg-amber-100 transition-colors"
            >
              <AlertCircle size={13} /> Wrong only ({wrongCount})
            </button>
          )}
        </div>
      </div>

      {/* Wrong answers review */}
      {wrongItems.length > 0 && (
        <div>
          <h4 className="text-[11px] font-bold text-text-faint uppercase tracking-wider mb-2">Incorrect answers:</h4>
          {wrongItems.map((item, i) => (
            <div key={i} className="bg-page border border-border rounded px-3 py-2.5 mb-2 text-[12.5px]">
              <p className="font-semibold text-text mb-1.5 leading-snug">{item.question}</p>
              <p className="text-brand-red mb-0.5">✗ Your answer: {item.chosenText}</p>
              <p className="text-brand-green mb-1.5">✓ Correct: {item.correctText}</p>
              <p className="text-text-muted leading-snug">{item.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
