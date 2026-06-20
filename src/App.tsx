import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { LessonPage } from '@/pages/LessonPage'
import { ChapterTestPage } from '@/pages/ChapterTestPage'
import { MockExamPage } from '@/pages/MockExamPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/lesson/1-1" replace />} />
          <Route path="lesson/:lessonId" element={<LessonPage />} />
          <Route path="chapter-test/:chapterId" element={<ChapterTestPage />} />
          <Route path="mock-exam" element={<MockExamPage />} />
          <Route path="*" element={<Navigate to="/lesson/1-1" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
