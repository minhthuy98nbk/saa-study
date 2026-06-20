import { FileText, HelpCircle, Brain, CheckCircle, Circle, Languages } from 'lucide-react'
import type { Lesson, LessonProgress } from '@/types'
import { cn, scoreBg } from '@/lib/utils'

interface LessonHeaderProps {
  lesson: Lesson
  progress: LessonProgress | undefined
  bilingual: boolean
  onToggleBilingual: () => void
  onOpenQuiz: () => void
  onToggleDone: () => void
}

export function LessonHeader({
  lesson,
  progress,
  bilingual,
  onToggleBilingual,
  onOpenQuiz,
  onToggleDone,
}: LessonHeaderProps) {
  const isDone = progress?.done ?? false
  const lastPct = progress?.quizHistory?.[0]?.pct ?? null

  return (
    <div className="bg-card border-b border-border px-5 py-3 flex-shrink-0 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        {/* Trái: tiêu đề + meta */}
        <div className="min-w-0">
          <p className="text-[10px] text-text-faint uppercase tracking-wider font-semibold mb-0.5">
            Chapter {lesson.id.split('-')[0]} · Lesson
          </p>
          <h2 className="text-[16px] font-bold text-text truncate mb-1">{lesson.title}</h2>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-text-faint">
              <FileText size={11} />
              {lesson.sections.length} sections
            </span>
            <span className="flex items-center gap-1 text-[11px] text-text-faint">
              <HelpCircle size={11} />
              {lesson.quiz.length} questions
            </span>
          </div>
        </div>

        {/* Phải: action buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={onToggleBilingual}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded border text-[11.5px] transition-all ${
              bilingual
                ? 'bg-light-blue text-brand-blue border-brand-blue'
                : 'bg-white text-text-muted border-border hover:bg-secondary'
            }`}
          >
            <Languages size={12} />
            Bilingual
          </button>

          {/* Nút Làm bài tập — tích hợp score lần trước nếu có */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 bg-brand-blue text-white px-2.5 py-1.5 rounded text-[11.5px] font-semibold hover:bg-blue-700 transition-all"
          >
            <Brain size={12} />
            Practice Quiz
            {lastPct !== null && (
              <span className={cn('text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none', scoreBg(lastPct))}>
                {lastPct}%
              </span>
            )}
          </button>

          <button
            onClick={onToggleDone}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded border text-[11.5px] font-medium transition-all whitespace-nowrap ${
              isDone
                ? 'bg-light-green text-brand-green border-brand-green'
                : 'text-brand-green border-brand-green hover:bg-light-green'
            }`}
          >
            {isDone ? <CheckCircle size={12} /> : <Circle size={12} />}
            {isDone ? 'Done' : 'Mark done'}
          </button>
        </div>
      </div>
    </div>
  )
}
