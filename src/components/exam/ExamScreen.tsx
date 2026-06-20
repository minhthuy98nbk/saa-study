import { useState } from 'react'
import type { Question, ExamAttempt, AnswerRecord } from '@/types'
import { useExam } from '@/hooks/useExam'
import { ExamHistory } from './ExamHistory'
import { ExamReview } from './ExamReview'
import { QuizModal } from '@/components/quiz/QuizModal'
import { scoreColor, cn } from '@/lib/utils'

interface ExamScreenProps {
  type: 'chapter' | 'mock'
  chapterId?: string
  title: string
  description: string
  icon: string
  questions: Question[]
  passScore: number
  color?: 'blue' | 'purple'
}

type View = 'landing' | 'history-detail'

export function ExamScreen({ type, chapterId, title, description, icon, questions, passScore, color = 'blue' }: ExamScreenProps) {
  const { getHistory, getBestScore, saveExamResult } = useExam()
  const [examOpen, setExamOpen] = useState(false)
  const [view, setView] = useState<View>('landing')
  const [selectedAttempt, setSelectedAttempt] = useState<ExamAttempt | null>(null)

  const history = getHistory(type, chapterId)
  const best = getBestScore(history)

  function handleExamComplete(pct: number, okCount: number, total: number, answers: AnswerRecord[]) {
    const attempt: ExamAttempt = {
      date: new Date().toISOString(),
      type,
      chapterId,
      pct,
      okCount,
      total,
      answers,
    }
    saveExamResult(attempt)
  }

  function handleViewDetail(attempt: ExamAttempt) {
    setSelectedAttempt(attempt)
    setView('history-detail')
  }

  const btnClass = color === 'purple'
    ? 'bg-brand-purple hover:bg-[#3C3489] shadow-purple-200'
    : 'bg-brand-blue hover:bg-blue-700 shadow-blue-200'

  return (
    <div className="flex-1 overflow-y-auto bg-page">
      <div className="max-w-[740px] mx-auto px-6 py-5 pb-10">
        {view === 'history-detail' && selectedAttempt ? (
          <ExamReview attempt={selectedAttempt} onBack={() => setView('landing')} />
        ) : (
          <>
            {/* Hero */}
            <div className="text-center pb-5 border-b border-border mb-4">
              <div className="text-3xl mb-2">{icon}</div>
              <h2 className="text-[18px] font-extrabold text-text mb-1.5">{title}</h2>
              <p className="text-[13px] text-text-muted leading-relaxed max-w-[440px] mx-auto mb-4">
                {description}
              </p>

              {/* Stats */}
              <div className="flex gap-2.5 justify-center mb-4 flex-wrap">
                <div className="bg-card border border-border rounded px-4 py-2.5 text-center">
                  <div className={cn('text-[21px] font-extrabold', best !== null ? scoreColor(best) : 'text-brand-blue')}>
                    {best !== null ? `${best}%` : '—'}
                  </div>
                  <div className="text-[10.5px] text-text-faint mt-0.5 font-medium">Best score</div>
                </div>
                <div className="bg-card border border-border rounded px-4 py-2.5 text-center">
                  <div className="text-[21px] font-extrabold text-brand-blue">{history.length}</div>
                  <div className="text-[10.5px] text-text-faint mt-0.5 font-medium">Attempts</div>
                </div>
                <div className="bg-card border border-border rounded px-4 py-2.5 text-center">
                  <div className="text-[21px] font-extrabold text-brand-blue">{questions.length}</div>
                  <div className="text-[10.5px] text-text-faint mt-0.5 font-medium">Questions</div>
                </div>
                <div className="bg-card border border-border rounded px-4 py-2.5 text-center">
                  <div className="text-[21px] font-extrabold text-brand-blue">{passScore}%</div>
                  <div className="text-[10.5px] text-text-faint mt-0.5 font-medium">Pass score</div>
                </div>
              </div>

              <button
                onClick={() => setExamOpen(true)}
                className={`text-white px-6 py-2.5 rounded text-[14px] font-bold transition-all shadow-lg ${btnClass}`}
              >
                ▶ Start exam
              </button>
            </div>

            {/* History */}
            <ExamHistory history={history} onViewDetail={handleViewDetail} />
          </>
        )}
      </div>

      {/* Exam modal */}
      {examOpen && (
        <QuizModal
          questions={questions}
          title={title}
          onClose={() => setExamOpen(false)}
          onComplete={(pct, okCount, total, answers) => {
            handleExamComplete(pct, okCount, total, answers)
            setExamOpen(false)
          }}
        />
      )}
    </div>
  )
}
