import { useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import { CheckCircle, Circle, Star, Trophy, ClipboardCheck, GraduationCap } from 'lucide-react'
import type { Chapter, Lesson, Progress } from '@/types'

interface SidebarProps {
  chapters: Chapter[]
  lessons: Lesson[]
  progress: Progress
  chTestBest: number | null
  mockBest: number | null
}

export function Sidebar({ chapters, lessons, progress, chTestBest, mockBest }: SidebarProps) {
  const [search, setSearch] = useState('')
  const location = useLocation()
  const { lessonId } = useParams()

  const doneCount = lessons.filter(l => progress[l.id]?.done).length
  const pct = lessons.length > 0 ? Math.round((doneCount / lessons.length) * 100) : 0

  const lessonsByChapter = chapters.map(ch => ({
    chapter: ch,
    lessons: lessons.filter(l =>
      ch.lessonIds.includes(l.id) &&
      (!search || l.title.toLowerCase().includes(search.toLowerCase()))
    ),
  }))

  let globalIndex = 0

  return (
    <aside className="w-[260px] bg-card border-r border-border flex flex-col flex-shrink-0 overflow-hidden">
      {/* Overall progress header */}
      <div className="p-3 pb-2.5 border-b border-border flex-shrink-0">
        <p className="text-[10px] text-text-faint uppercase tracking-widest font-semibold mb-0.5">AWS SAA-C03</p>
        <p className="text-[12.5px] font-semibold text-text leading-snug mb-2">Cert Prep</p>
        <div className="flex items-center gap-2 text-[11px] text-text-faint">
          <span>{doneCount}/{lessons.length} lessons</span>
          <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-blue rounded-full transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-2.5 py-2 flex-shrink-0">
        <input
          type="text"
          placeholder="Search lessons..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border border-border rounded px-2.5 py-1.5 text-xs bg-page text-text outline-none focus:border-brand-blue transition-colors"
        />
      </div>

      {/* Lesson list grouped by chapter */}
      <div className="overflow-y-auto flex-1 py-1">
        {lessonsByChapter.map(({ chapter, lessons: chLessons }, chIdx) => (
          <div key={chapter.id}>
            {chIdx > 0 && <div className="h-px bg-border mx-3 my-1" />}
            <p className="px-4 pt-2 pb-1 text-[10px] font-semibold text-text-faint uppercase tracking-widest">
              Chapter {chapter.id} · {chapter.title}
            </p>
            {chLessons.map(lesson => {
              const idx = globalIndex++
              const p = progress[lesson.id]
              const isDone = p?.done
              const quizBest = p?.quizBest ?? null
              const isActive = lessonId === lesson.id
              return (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.id}`}
                  className={`flex items-center gap-1.5 px-2.5 py-2 mx-1.5 mb-0.5 rounded text-xs leading-snug transition-colors ${
                    isActive
                      ? 'bg-light-blue text-brand-blue'
                      : isDone
                      ? 'bg-light-green-done text-text-muted hover:bg-light-green-done-hover'
                      : 'text-text-muted hover:bg-secondary'
                  }`}
                >
                  <span
                    className={`text-[10px] rounded px-1.5 py-0.5 font-semibold min-w-[19px] text-center flex-shrink-0 ${
                      isActive ? 'bg-brand-blue text-white' : isDone ? 'bg-light-green-done-num text-done-num-text' : 'bg-secondary text-text-faint'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="flex-1 truncate">{lesson.title}</span>
                  <span className="flex gap-0.5 items-center flex-shrink-0">
                    {isDone ? (
                      <CheckCircle size={12} className="text-brand-green" />
                    ) : (
                      <Circle size={12} className="text-border" />
                    )}
                    {quizBest === 100 && <Star size={12} className="text-yellow-500" />}
                    {quizBest !== null && quizBest < 100 && (
                      <Trophy size={12} className="text-brand-green" />
                    )}
                  </span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer links */}
      <div className="px-2 pb-2.5 flex-shrink-0">
        <div className="h-px bg-border my-1.5 mx-1" />
        <Link
          to="/chapter-test/1"
          className={`flex items-center gap-1.5 px-2.5 py-2 mx-1.5 rounded text-xs font-medium transition-colors ${
            location.pathname.startsWith('/chapter-test')
              ? 'bg-light-purple text-brand-purple'
              : 'text-text-muted hover:bg-secondary'
          }`}
        >
          <ClipboardCheck size={14} />
          <span className="flex-1">Chapter Test</span>
          {chTestBest !== null && (
            <span className="text-[10px] font-semibold text-brand-purple">{chTestBest}%</span>
          )}
        </Link>
        <Link
          to="/mock-exam"
          className={`flex items-center gap-1.5 px-2.5 py-2 mx-1.5 rounded text-xs font-medium transition-colors ${
            location.pathname === '/mock-exam'
              ? 'bg-light-amber text-brand-amber'
              : 'text-text-muted hover:bg-secondary'
          }`}
        >
          <GraduationCap size={14} />
          <span className="flex-1">SAA Mock Exam</span>
          {mockBest !== null && (
            <span className="text-[10px] font-semibold text-brand-amber">{mockBest}%</span>
          )}
        </Link>
      </div>
    </aside>
  )
}
