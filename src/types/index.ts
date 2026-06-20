export interface Chapter {
  id: string
  title: string
  lessonIds: string[]
}

export interface Lesson {
  id: string
  title: string
  overview: string
  overviewVi?: string
  sections: Section[]
  summary: string[]
  summaryVi?: string[]
  quiz: Question[]
}

export interface Section {
  level: 'intro' | 'core' | 'deep' | 'exam'
  label: string
  heading: string
  contentHtml: string
  contentVi: string
}

export interface Question {
  id: string
  type: 'single' | 'multi'
  question: string
  options: string[]
  correctAnswers: number[]
  explanation: string
}

export interface LessonProgress {
  done: boolean
  quizBest: number | null
  quizHistory: AttemptRecord[]
}

export interface Progress {
  [lessonId: string]: LessonProgress
}

export interface AttemptRecord {
  date: string
  pct: number
  okCount: number
  total: number
  answers: AnswerRecord[]
}

export interface AnswerRecord {
  questionId: string
  chosen: number[]
  ok: boolean
}

export interface ExamAttempt {
  date: string
  type: 'chapter' | 'mock'
  chapterId?: string
  pct: number
  okCount: number
  total: number
  answers: AnswerRecord[]
}

export interface DictEntry {
  word: string
  phonetic?: string
  meanings: DictMeaning[]
}

export interface DictMeaning {
  partOfSpeech: string
  definitions: { definition: string; example?: string }[]
}

export interface ShuffledQuestion {
  original: Question
  shuffledOptions: string[]
  indexMap: number[]
}
