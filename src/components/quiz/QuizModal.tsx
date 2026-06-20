import { X, SendHorizontal } from 'lucide-react'
import type { Question, AnswerRecord } from '@/types'
import { useQuiz } from '@/hooks/useQuiz'
import { QuizProgress } from './QuizProgress'
import { QuizQuestion } from './QuizQuestion'
import { QuizResult } from './QuizResult'

interface QuizModalProps {
  questions: Question[]
  title: string
  onClose: () => void
  onComplete: (pct: number, okCount: number, total: number, answers: AnswerRecord[]) => void
}

export function QuizModal({ questions, title, onClose, onComplete }: QuizModalProps) {
  const quiz = useQuiz(questions)

  const isFinished = quiz.phase === 'finished'
  const okCount = quiz.results.filter(r => r.ok).length
  const pct = quiz.total > 0 ? Math.round((okCount / quiz.total) * 100) : 0

  function handleClose() {
    if (isFinished) {
      onComplete(pct, okCount, quiz.total, quiz.results)
    }
    onClose()
  }

  function handleForceFinish() {
    quiz.forceFinish()
  }

  return (
    <div data-quiz-modal className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[500] flex items-center justify-center p-3.5">
      <div className="bg-card rounded-lg w-full max-w-[640px] max-h-[90vh] overflow-y-auto border border-border shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-5 py-3.5 flex items-center gap-2 z-10">
          <span className="flex-1 text-[13.5px] font-bold text-text">
            {isFinished ? 'Results' : `${title} · Question ${quiz.currentIndex + 1}/${quiz.total}`}
          </span>
          {!isFinished && (
            <button
              onClick={handleForceFinish}
              className="flex items-center gap-1 text-[11.5px] text-text-muted border border-border rounded px-2.5 py-1 hover:bg-secondary transition-colors"
            >
              <SendHorizontal size={12} />
              Submit
            </button>
          )}
          <button onClick={handleClose} className="text-text-faint hover:text-text transition-colors ml-1">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {isFinished ? (
            <QuizResult
              pct={pct}
              okCount={okCount}
              total={quiz.total}
              results={quiz.results}
              questions={quiz.questions}
              onRetryAll={quiz.retryAll}
              onRetryWrong={quiz.retryWrong}
            />
          ) : (
            <>
              <QuizProgress current={quiz.currentIndex} total={quiz.total} />
              {quiz.currentQ && (
                <QuizQuestion
                  shuffledQ={quiz.currentQ}
                  selectedOptions={quiz.selectedOptions}
                  phase={quiz.phase}
                  shuffledCorrectIndices={quiz.shuffledCorrectIndices}
                  onSelectOption={quiz.selectOption}
                  onSubmit={quiz.submitAnswer}
                  onNext={quiz.nextQuestion}
                  isLast={quiz.currentIndex === quiz.total - 1}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
