import { X } from 'lucide-react'
import type { AttemptRecord, Question, ShuffledQuestion } from '@/types'
import { QuizResult } from './QuizResult'
import { formatDate } from '@/lib/utils'

interface LastResultModalProps {
  attempt: AttemptRecord
  questions: Question[]
  onClose: () => void
  onRetryAll: () => void
}

// Convert Question[] → ShuffledQuestion[] với identity indexMap
// (chosen trong AttemptRecord đã là original indices)
function toIdentityShuffled(q: Question): ShuffledQuestion {
  return {
    original: q,
    shuffledOptions: q.options,
    indexMap: q.options.map((_, i) => i),
  }
}

export function LastResultModal({ attempt, questions, onClose, onRetryAll }: LastResultModalProps) {
  const shuffledQuestions = questions.map(toIdentityShuffled)

  function handleRetryAll() {
    onClose()
    onRetryAll()
  }

  function handleRetryWrong() {
    onClose()
    onRetryAll()
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 z-[300] flex items-start justify-center pt-12 px-4 pb-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-card rounded-xl shadow-2xl w-full max-w-[560px] flex flex-col max-h-[calc(100vh-80px)]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border flex-shrink-0">
          <div>
            <p className="text-[13.5px] font-bold text-text">Last attempt</p>
            <p className="text-[11px] text-text-faint mt-0.5">{formatDate(attempt.date)}</p>
          </div>
          <button onClick={onClose} className="text-text-faint hover:text-text p-1 rounded">
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-5 py-4">
          <QuizResult
            pct={attempt.pct}
            okCount={attempt.okCount}
            total={attempt.total}
            results={attempt.answers}
            questions={shuffledQuestions}
            onRetryAll={handleRetryAll}
            onRetryWrong={handleRetryWrong}
          />
        </div>
      </div>
    </div>
  )
}
