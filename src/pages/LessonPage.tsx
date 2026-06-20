import { useParams, Navigate } from 'react-router-dom'
import { LessonView } from '@/components/lesson/LessonView'
import { useProgressContext } from '@/contexts/ProgressContext'
import type { Lesson } from '@/types'
import chapter1 from '@/data/chapters/chapter-1.json'
import chapter2 from '@/data/chapters/chapter-2.json'

const allLessons: Lesson[] = [
  ...(chapter1 as { lessons: Lesson[] }).lessons,
  ...(chapter2 as { lessons: Lesson[] }).lessons,
]

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>()
  const { progress, markDone, markUndone, saveQuizResult } = useProgressContext()

  const lesson = allLessons.find(l => l.id === lessonId)
  if (!lesson) return <Navigate to="/lesson/1-1" replace />

  function handleQuizComplete(pct: number, okCount: number, total: number, answers: { questionId: string; chosen: number[]; ok: boolean }[]) {
    saveQuizResult(lesson!.id, {
      date: new Date().toISOString(),
      pct,
      okCount,
      total,
      answers,
    })
  }

  return (
    <LessonView
      lesson={lesson}
      progress={progress[lesson.id]}
      onMarkDone={() => markDone(lesson.id)}
      onMarkUndone={() => markUndone(lesson.id)}
      onQuizComplete={handleQuizComplete}
    />
  )
}
