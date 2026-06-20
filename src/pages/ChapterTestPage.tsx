import { useMemo } from 'react'
import { ExamScreen } from '@/components/exam/ExamScreen'
import { buildChapterExam } from '@/hooks/useExam'
import type { Lesson } from '@/types'
import chapter1 from '@/data/chapters/chapter-1.json'

const allLessons: Lesson[] = (chapter1 as { lessons: Lesson[] }).lessons

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
      description="20 câu hỏi random từ tất cả 5 bài. Mỗi lần thi câu hỏi và thứ tự đáp án được xáo ngẫu nhiên."
      icon="📋"
      questions={questions}
      passScore={72}
      color="blue"
    />
  )
}
