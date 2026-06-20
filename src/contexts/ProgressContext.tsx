import { createContext, useContext, type ReactNode } from 'react'
import { useProgress } from '@/hooks/useProgress'
import type { Progress, AttemptRecord } from '@/types'

interface ProgressContextValue {
  progress: Progress
  markDone: (lessonId: string) => void
  markUndone: (lessonId: string) => void
  saveQuizResult: (lessonId: string, record: AttemptRecord) => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const value = useProgress()
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgressContext() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgressContext must be used within ProgressProvider')
  return ctx
}
