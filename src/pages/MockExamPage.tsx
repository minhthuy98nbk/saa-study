import { useMemo } from 'react'
import { ExamScreen } from '@/components/exam/ExamScreen'
import { buildMockExam } from '@/hooks/useExam'
import type { Lesson } from '@/types'
import chapter1 from '@/data/chapters/chapter-1.json'

const allLessons: Lesson[] = (chapter1 as { lessons: Lesson[] }).lessons

export function MockExamPage() {
  const questions = useMemo(
    () => buildMockExam(allLessons.map(l => l.quiz)),
    []
  )

  return (
    <ExamScreen
      type="mock"
      title="SAA-C03 Mock Exam"
      description="65 câu hỏi theo cấu trúc đề thi SAA thật. Random từ tất cả bài đã học. Điểm đậu: 72% (47/65 câu)."
      icon="🎓"
      questions={questions}
      passScore={72}
      color="purple"
    />
  )
}
