import { useMemo } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { ExamScreen } from '@/components/exam/ExamScreen'
import { shuffle } from '@/lib/utils'
import type { Question } from '@/types'
import chapter1Test from '@/data/chapter-tests/chapter-1-test.json'
import chapter2Test from '@/data/chapter-tests/chapter-2-test.json'

const testData: Record<string, { questions: Question[] }> = {
  '1': chapter1Test as { questions: Question[] },
  '2': chapter2Test as { questions: Question[] },
}

export function ChapterTestPage() {
  const { chapterId } = useParams<{ chapterId: string }>()
  const data = chapterId ? testData[chapterId] : null

  const questions = useMemo(
    () => (data ? shuffle(data.questions) : []),
    [data]
  )

  if (!data) return <Navigate to="/" replace />

  return (
    <ExamScreen
      type="chapter"
      chapterId={chapterId}
      title={`Chapter ${chapterId} Test`}
      description="30 cross-lesson questions testing synthesis across all topics in this chapter. Pass score: 72%."
      icon="📋"
      questions={questions}
      passScore={72}
      color="blue"
    />
  )
}
