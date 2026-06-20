import { useState, useCallback } from 'react'
import type { Progress, AttemptRecord } from '@/types'

const LS_KEY = 'saa_progress'

function load(): Progress {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '{}')
  } catch {
    return {}
  }
}

function save(p: Progress) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(p))
  } catch {}
}

function defaultLesson() {
  return { done: false, quizBest: null as number | null, quizHistory: [] as AttemptRecord[] }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(load)

  const markDone = useCallback((lessonId: string) => {
    setProgress(prev => {
      const next = { ...prev, [lessonId]: { ...(prev[lessonId] || defaultLesson()), done: true } }
      save(next)
      return next
    })
  }, [])

  const markUndone = useCallback((lessonId: string) => {
    setProgress(prev => {
      const next = { ...prev, [lessonId]: { ...(prev[lessonId] || defaultLesson()), done: false } }
      save(next)
      return next
    })
  }, [])

  const saveQuizResult = useCallback((lessonId: string, record: AttemptRecord) => {
    setProgress(prev => {
      const existing = prev[lessonId] || defaultLesson()
      const newBest = existing.quizBest === null || record.pct > existing.quizBest
        ? record.pct
        : existing.quizBest
      const next = {
        ...prev,
        [lessonId]: {
          ...existing,
          quizBest: newBest,
          quizHistory: [record, ...existing.quizHistory],
        },
      }
      save(next)
      return next
    })
  }, [])

  return { progress, markDone, markUndone, saveQuizResult }
}
