import { useState, useCallback } from 'react'
import type { Question, AnswerRecord, ShuffledQuestion } from '@/types'
import { shuffle } from '@/lib/utils'

type Phase = 'answering' | 'revealed' | 'finished'

interface QuizState {
  questions: ShuffledQuestion[]
  currentIndex: number
  selectedOptions: number[]
  phase: Phase
  results: AnswerRecord[]
}

function buildShuffled(q: Question): ShuffledQuestion {
  const indexed = q.options.map((opt, i) => ({ opt, i }))
  const shuffled = shuffle(indexed)
  const indexMap = shuffled.map(x => x.i)
  const shuffledOptions = shuffled.map(x => x.opt)
  return { original: q, shuffledOptions, indexMap }
}

function initState(questions: Question[]): QuizState {
  return {
    questions: shuffle(questions).map(buildShuffled),
    currentIndex: 0,
    selectedOptions: [],
    phase: 'answering',
    results: [],
  }
}

export function useQuiz(questions: Question[]) {
  const [state, setState] = useState<QuizState>(() => initState(questions))

  const currentQ = state.questions[state.currentIndex]
  const total = state.questions.length
  const isMulti = currentQ?.original.type === 'multi'

  // Map shuffled option index back to original to check correctness
  function isCorrect(shuffledIndices: number[]): boolean {
    const originalIndices = shuffledIndices.map(si => currentQ.indexMap[si])
    const correct = [...currentQ.original.correctAnswers].sort()
    const chosen = [...originalIndices].sort()
    return chosen.length === correct.length && chosen.every((v, i) => v === correct[i])
  }

  const selectOption = useCallback((optionIndex: number) => {
    setState(prev => {
      if (prev.phase !== 'answering') return prev
      const q = prev.questions[prev.currentIndex]
      if (q.original.type === 'single') {
        // immediate reveal for single
        const ok = isCorrect([optionIndex])
        const originalChosen = [q.indexMap[optionIndex]]
        const record: AnswerRecord = {
          questionId: q.original.id,
          chosen: originalChosen,
          ok,
        }
        return { ...prev, selectedOptions: [optionIndex], phase: 'revealed', results: [...prev.results, record] }
      } else {
        // toggle for multi
        const sel = prev.selectedOptions.includes(optionIndex)
          ? prev.selectedOptions.filter(i => i !== optionIndex)
          : [...prev.selectedOptions, optionIndex]
        return { ...prev, selectedOptions: sel }
      }
    })
  }, [])

  const submitAnswer = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'answering') return prev
      const q = prev.questions[prev.currentIndex]
      const ok = isCorrect(prev.selectedOptions)
      const originalChosen = prev.selectedOptions.map(si => q.indexMap[si])
      const record: AnswerRecord = {
        questionId: q.original.id,
        chosen: originalChosen,
        ok,
      }
      return { ...prev, phase: 'revealed', results: [...prev.results, record] }
    })
  }, [])

  const nextQuestion = useCallback(() => {
    setState(prev => {
      const next = prev.currentIndex + 1
      if (next >= prev.questions.length) {
        return { ...prev, phase: 'finished' }
      }
      return { ...prev, currentIndex: next, selectedOptions: [], phase: 'answering' }
    })
  }, [])

  const retryAll = useCallback(() => {
    setState(initState(questions))
  }, [questions])

  const retryWrong = useCallback(() => {
    setState(prev => {
      const wrongIds = new Set(prev.results.filter(r => !r.ok).map(r => r.questionId))
      const wrongQs = questions.filter(q => wrongIds.has(q.id))
      return initState(wrongQs.length > 0 ? wrongQs : questions)
    })
  }, [questions])

  // Submit immediately — unanswered questions count as wrong
  const forceFinish = useCallback(() => {
    setState(prev => {
      if (prev.phase === 'finished') return prev
      const currentRecord: AnswerRecord[] = prev.phase === 'answering' ? [{
        questionId: prev.questions[prev.currentIndex].original.id,
        chosen: [],
        ok: false,
      }] : []
      const remainingRecords: AnswerRecord[] = prev.questions
        .slice(prev.currentIndex + 1)
        .map(q => ({ questionId: q.original.id, chosen: [], ok: false }))
      return { ...prev, phase: 'finished', results: [...prev.results, ...currentRecord, ...remainingRecords] }
    })
  }, [])

  // Compute shuffled correct answer indices for UI
  const shuffledCorrectIndices = currentQ
    ? currentQ.original.correctAnswers.map(origIdx =>
        currentQ.indexMap.findIndex(mapped => mapped === origIdx)
      )
    : []

  return {
    currentQ,
    currentIndex: state.currentIndex,
    total,
    questions: state.questions,
    selectedOptions: state.selectedOptions,
    phase: state.phase,
    results: state.results,
    isMulti,
    shuffledCorrectIndices,
    selectOption,
    submitAnswer,
    nextQuestion,
    retryAll,
    retryWrong,
    forceFinish,
  }
}
