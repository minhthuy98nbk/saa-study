import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Topbar } from './Topbar'
import { Sidebar } from './Sidebar'
import { useProgressContext } from '@/contexts/ProgressContext'
import { useExam } from '@/hooks/useExam'
import type { Chapter, Lesson } from '@/types'
import chaptersData from '@/data/chapters.json'
import chapter1 from '@/data/chapters/chapter-1.json'
import chapter2 from '@/data/chapters/chapter-2.json'

const chapters = chaptersData as Chapter[]

// Map chapter JSON data to Lesson array
const allLessons: Lesson[] = [
  ...(chapter1 as { lessons: Lesson[] }).lessons,
  ...(chapter2 as { lessons: Lesson[] }).lessons,
]

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { progress } = useProgressContext()
  const { getHistory, getBestScore } = useExam()

  const chTestHistory = getHistory('chapter', '1')
  const mockHistory = getHistory('mock')
  const chTestBest = getBestScore(chTestHistory)
  const mockBest = getBestScore(mockHistory)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(o => !o)} />
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`transition-all duration-200 overflow-hidden flex-shrink-0 ${
            sidebarOpen ? 'w-[260px]' : 'w-0'
          }`}
        >
          <Sidebar
            chapters={chapters}
            lessons={allLessons}
            progress={progress}
            chTestBest={chTestBest}
            mockBest={mockBest}
          />
        </div>
        <main className="flex-1 overflow-hidden flex flex-col min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
