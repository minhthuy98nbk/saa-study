import { useMemo } from 'react'
import { ExamScreen } from '@/components/exam/ExamScreen'
import { buildChapterExam } from '@/hooks/useExam'
import type { Lesson } from '@/types'
import chapter1 from '@/data/chapters/chapter-1.json'
import chapter2 from '@/data/chapters/chapter-2.json'

const allLessons: Lesson[] = [
  ...(chapter1 as { lessons: Lesson[] }).lessons,
  ...(chapter2 as { lessons: Lesson[] }).lessons,
]

export function ChapterTestPage() {
  const questions = useMemo(
    () => buildChapterExam(allLessons.map(l => l.quiz)),
    []
  )

  return (
    <ExamScreen
      type="chapter"
      chapterId="1"
      title="Chapter 1 Test"
      description="20 random questions from all lessons. Questions and answer order are shuffled each attempt."
      icon="📋"
      questions={questions}
      passScore={72}
      color="blue"
    />
  )
}
