import { useState, useCallback } from 'react'
import type { ExamAttempt, Question } from '@/types'
import { shuffle } from '@/lib/utils'

const LS_KEY = 'saa_exam_history'

function load(): ExamAttempt[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]')
  } catch {
    return []
  }
}

function save(history: ExamAttempt[]) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(history))
  } catch {}
}

// Lấy 4 random questions per lesson cho chapter test
export function buildChapterExam(allQuestions: Question[][]): Question[] {
  const pool: Question[] = []
  allQuestions.forEach(lessonQuiz => {
    pool.push(...shuffle(lessonQuiz).slice(0, 4))
  })
  return shuffle(pool).slice(0, 20)
}

// Lấy tối đa 65 questions cho mock exam, không trùng câu
export function buildMockExam(allQuestions: Question[][]): Question[] {
  const pool = allQuestions.flat()
  return shuffle(pool).slice(0, 65)
}

export function useExam() {
  const [history, setHistory] = useState<ExamAttempt[]>(load)

  const saveExamResult = useCallback((attempt: ExamAttempt) => {
    setHistory(prev => {
      const next = [attempt, ...prev]
      save(next)
      return next
    })
  }, [])

  const getHistory = useCallback(
    (type: 'chapter' | 'mock', chapterId?: string): ExamAttempt[] =>
      history
        .filter(a => a.type === type && (type === 'mock' || a.chapterId === chapterId))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [history]
  )

  const getBestScore = useCallback(
    (attempts: ExamAttempt[]): number | null =>
      attempts.length === 0 ? null : Math.max(...attempts.map(a => a.pct)),
    []
  )

  return { history, saveExamResult, getHistory, getBestScore }
}
