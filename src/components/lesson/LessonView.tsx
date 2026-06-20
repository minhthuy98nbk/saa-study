import { useState, useRef, useEffect } from 'react'
import type { Lesson, LessonProgress } from '@/types'
import { LessonHeader } from './LessonHeader'
import { ContentBlock } from './ContentBlock'
import { SummaryCard } from './SummaryCard'
import { MarkDoneButton } from './MarkDoneButton'
import { translateWord } from '@/lib/translate'
import { QuizModal } from '@/components/quiz/QuizModal'
import { LastResultModal } from '@/components/quiz/LastResultModal'

interface LessonViewProps {
  lesson: Lesson
  progress: LessonProgress | undefined
  onMarkDone: () => void
  onMarkUndone: () => void
  onQuizComplete: (pct: number, okCount: number, total: number, answers: { questionId: string; chosen: number[]; ok: boolean }[]) => void
}

interface TranslatePopup {
  word: string
  x: number
  y: number
  translation: string | null
  loading: boolean
}

interface SelectionPopup {
  text: string
  x: number
  y: number
}

export function LessonView({ lesson, progress, onMarkDone, onMarkUndone, onQuizComplete }: LessonViewProps) {
  const [bilingual, setBilingual] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [lastResultOpen, setLastResultOpen] = useState(false)

  function handleOpenQuiz() {
    if (progress?.quizHistory?.length) {
      setLastResultOpen(true)
    } else {
      setQuizOpen(true)
    }
  }
  const [dictPopup, setDictPopup] = useState<TranslatePopup | null>(null)
  const [selPopup, setSelPopup] = useState<SelectionPopup | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const isDone = progress?.done ?? false

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [lesson.id])

  useEffect(() => {
    function handleMouseUp(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.closest('[data-quiz-modal]') || target.closest('[data-dict-popup]') || target.closest('[data-sel-popup]')) return
      const sel = window.getSelection()
      const txt = sel?.toString().trim() ?? ''
      if (txt.length > 1 && txt.length < 250) {
        const range = sel!.getRangeAt(0).getBoundingClientRect()
        setSelPopup({ text: txt, x: range.left + range.width / 2, y: range.top - 10 })
      } else {
        setSelPopup(null)
      }
    }
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!target.closest('[data-dict-popup]')) setDictPopup(null)
      if (!target.closest('[data-sel-popup]')) setSelPopup(null)
    }
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  async function handleWordClick(word: string, x: number, y: number) {
    setDictPopup({ word, x, y, translation: null, loading: true })
    const translation = await translateWord(word)
    setDictPopup({ word, x, y, translation, loading: false })
  }

  function openGoogleTranslate() {
    if (!selPopup) return
    window.open(`https://translate.google.com/?sl=en&tl=vi&text=${encodeURIComponent(selPopup.text)}`, '_blank')
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <LessonHeader
        lesson={lesson}
        progress={progress}
        bilingual={bilingual}
        onToggleBilingual={() => setBilingual(b => !b)}
        onOpenQuiz={handleOpenQuiz}
        onToggleDone={isDone ? onMarkUndone : onMarkDone}
      />

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-page">
        <div className="max-w-[860px] mx-auto px-4 py-4 pb-10">
          {/* Overview */}
          <div className="bg-gradient-to-br from-light-blue to-light-purple rounded-lg border border-blue-200 p-4 mb-3.5">
            <p className="text-[10px] text-brand-blue uppercase tracking-widest font-bold mb-1.5">What you'll learn</p>
            <p className="text-[13px] leading-relaxed text-[#1A2A3A]">{lesson.overview}</p>
            {bilingual && lesson.overviewVi && (
              <div className="mt-2.5 pt-2.5 border-t border-dashed border-blue-200">
                <p className="text-[10px] text-brand-blue/70 font-semibold mb-1">🇻🇳 Bài này học gì?</p>
                <p className="text-[13px] leading-relaxed text-[#1A2A3A]/80">{lesson.overviewVi}</p>
              </div>
            )}
          </div>

          {/* Content sections */}
          {lesson.sections.map((section, i) => (
            <ContentBlock
              key={i}
              section={section}
              bilingual={bilingual}
              onWordClick={handleWordClick}
            />
          ))}

          <SummaryCard items={lesson.summary} itemsVi={lesson.summaryVi} bilingual={bilingual} />
          <MarkDoneButton done={isDone} onToggle={isDone ? onMarkUndone : onMarkDone} />
        </div>
      </div>

      {/* Translation popup */}
      {dictPopup && (
        <div
          data-dict-popup
          style={{ position: 'fixed', left: dictPopup.x + 14, top: dictPopup.y + 14, zIndex: 400 }}
          className="bg-card border border-border rounded-lg px-3 py-2.5 shadow-xl max-w-[200px]"
        >
          <p className="font-bold text-[13px] text-brand-blue leading-tight">{dictPopup.word}</p>
          {dictPopup.loading ? (
            <p className="text-[11px] text-text-faint mt-1 italic">Đang dịch...</p>
          ) : dictPopup.translation ? (
            <p className="text-[12.5px] text-text mt-1 leading-snug">{dictPopup.translation}</p>
          ) : (
            <p className="text-[11px] text-text-faint mt-1">Không tìm thấy bản dịch</p>
          )}
          <p className="text-[10px] text-text-faint mt-1.5 pt-1.5 border-t border-border">
            Bôi đen để dịch cụm từ
          </p>
        </div>
      )}

      {/* Selection translate popup */}
      {selPopup && (
        <button
          data-sel-popup
          style={{ position: 'fixed', left: selPopup.x, top: selPopup.y - 30, transform: 'translateX(-50%)', zIndex: 401 }}
          onClick={openGoogleTranslate}
          className="bg-brand-blue text-white text-[11.5px] px-3 py-1 rounded flex items-center gap-1 shadow-lg hover:bg-blue-700"
        >
          🌐 Dịch
        </button>
      )}

      {/* Last result modal */}
      {lastResultOpen && progress?.quizHistory?.[0] && (
        <LastResultModal
          attempt={progress.quizHistory[0]}
          questions={lesson.quiz}
          onClose={() => setLastResultOpen(false)}
          onRetryAll={() => { setLastResultOpen(false); setQuizOpen(true) }}
        />
      )}

      {/* Quiz modal */}
      {quizOpen && (
        <QuizModal
          questions={lesson.quiz}
          title={lesson.title}
          onClose={() => setQuizOpen(false)}
          onComplete={(pct, okCount, total, answers) => {
            onQuizComplete(pct, okCount, total, answers)
            setQuizOpen(false)
          }}
        />
      )}
    </div>
  )
}
