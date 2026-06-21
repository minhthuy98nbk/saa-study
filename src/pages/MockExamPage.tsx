import { useMemo } from 'react'
import { ExamScreen } from '@/components/exam/ExamScreen'
import { shuffle } from '@/lib/utils'
import type { Question } from '@/types'
import mockExamData from '@/data/mock-exam.json'

const mockQuestions = (mockExamData as { questions: Question[] }).questions

export function MockExamPage() {
  const questions = useMemo(() => shuffle(mockQuestions), [])

  return (
    <ExamScreen
      type="mock"
      title="SAA-C03 Mock Exam"
      description="65 questions following the real SAA exam structure across all 4 domains. Pass score: 72% (47/65)."
      icon="🎓"
      questions={questions}
      passScore={72}
      color="purple"
    />
  )
}
