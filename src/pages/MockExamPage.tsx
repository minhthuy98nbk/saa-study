import { useMemo } from 'react'
import { ExamScreen } from '@/components/exam/ExamScreen'
import { buildMockExam } from '@/hooks/useExam'
import type { Lesson } from '@/types'
import chapter1 from '@/data/chapters/chapter-1.json'
import chapter2 from '@/data/chapters/chapter-2.json'

const allLessons: Lesson[] = [
  ...(chapter1 as { lessons: Lesson[] }).lessons,
  ...(chapter2 as { lessons: Lesson[] }).lessons,
]

export function MockExamPage() {
  const questions = useMemo(
    () => buildMockExam(allLessons.map(l => l.quiz)),
    []
  )

  return (
    <ExamScreen
      type="mock"
      title="SAA-C03 Mock Exam"
      description="65 questions following the real SAA exam structure. Randomly drawn from all lessons. Pass score: 72% (47/65)."
      icon="🎓"
      questions={questions}
      passScore={72}
      color="purple"
    />
  )
}
