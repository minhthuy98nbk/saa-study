import { cn } from '@/lib/utils'
import type { ShuffledQuestion } from '@/types'

type Phase = 'answering' | 'revealed' | 'finished'

interface QuizQuestionProps {
  shuffledQ: ShuffledQuestion
  selectedOptions: number[]
  phase: Phase
  shuffledCorrectIndices: number[]
  onSelectOption: (i: number) => void
  onSubmit: () => void
  onNext: () => void
  isLast: boolean
}

function optionClass(
  selected: boolean,
  isCorrect: boolean,
  isWrong: boolean,
  isMissed: boolean,
  phase: Phase,
  type: 'single' | 'multi'
): string {
  if (phase === 'revealed') {
    if (isCorrect && selected) return 'bg-light-green border-brand-green text-[#085041]'
    if (isWrong) return 'bg-light-red border-brand-red text-[#791F1F]'
    if (isMissed) return 'bg-light-amber border-brand-amber text-[#854F0B]'
    return 'bg-page border-border text-text-muted opacity-60'
  }
  if (type === 'multi' && selected) return 'bg-light-purple border-brand-purple text-brand-purple'
  return 'bg-page border-border text-text hover:border-brand-blue hover:text-brand-blue hover:bg-light-blue'
}

function badgeClass(selected: boolean, isCorrect: boolean, isWrong: boolean, isMissed: boolean, phase: Phase): string {
  if (phase === 'revealed') {
    if (isCorrect && selected) return 'bg-brand-green text-white'
    if (isWrong) return 'bg-brand-red text-white'
    if (isMissed) return 'bg-brand-amber text-white'
  }
  if (selected) return 'bg-brand-purple text-white'
  return 'bg-border text-text-muted'
}

export function QuizQuestion({
  shuffledQ,
  selectedOptions,
  phase,
  shuffledCorrectIndices,
  onSelectOption,
  onSubmit,
  onNext,
  isLast,
}: QuizQuestionProps) {
  const q = shuffledQ.original
  const isMulti = q.type === 'multi'
  const correctCount = q.correctAnswers.length

  function isCorrectIdx(i: number) { return shuffledCorrectIndices.includes(i) }
  function isSelectedIdx(i: number) { return selectedOptions.includes(i) }
  function isWrongIdx(i: number) { return isSelectedIdx(i) && !isCorrectIdx(i) }
  function isMissedIdx(i: number) { return isCorrectIdx(i) && !isSelectedIdx(i) }

  // Determine explanation state
  const allCorrect = phase === 'revealed' && selectedOptions.every(i => isCorrectIdx(i)) && shuffledCorrectIndices.every(i => isSelectedIdx(i))
  const partial = phase === 'revealed' && !allCorrect && selectedOptions.some(i => isCorrectIdx(i))

  return (
    <div>
      {/* Type badge */}
      <span className={cn(
        'inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full mb-2.5',
        isMulti ? 'bg-light-purple text-brand-purple' : 'bg-light-blue text-brand-blue'
      )}>
        {isMulti ? `Chọn ${correctCount} đáp án đúng` : 'Chọn 1 đáp án đúng'}
      </span>

      {/* Question text */}
      <p className="text-[13.5px] font-semibold leading-relaxed text-text mb-3">{q.question}</p>

      {/* Options */}
      <div className="grid gap-1.5 mb-3">
        {shuffledQ.shuffledOptions.map((opt, i) => (
          <button
            key={i}
            disabled={phase === 'revealed'}
            onClick={() => onSelectOption(i)}
            className={cn(
              'flex items-center gap-2 w-full px-3 py-2.5 rounded border-[1.5px] text-[13px] text-left transition-all',
              optionClass(isSelectedIdx(i), isCorrectIdx(i), isWrongIdx(i), isMissedIdx(i), phase, q.type),
              phase !== 'revealed' && 'cursor-pointer',
              phase === 'revealed' && 'cursor-default'
            )}
          >
            <span className={cn(
              'w-5 h-5 rounded-full flex items-center justify-center text-[10.5px] font-bold flex-shrink-0',
              badgeClass(isSelectedIdx(i), isCorrectIdx(i), isWrongIdx(i), isMissedIdx(i), phase)
            )}>
              {String.fromCharCode(65 + i)}
            </span>
            {opt}
          </button>
        ))}
      </div>

      {/* Multi submit button */}
      {isMulti && phase === 'answering' && (
        <button
          disabled={selectedOptions.length === 0}
          onClick={onSubmit}
          className="bg-brand-purple text-white px-4 py-2 rounded text-[12.5px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3C3489] transition-colors"
        >
          Xác nhận ({selectedOptions.length}/{correctCount} đã chọn)
        </button>
      )}

      {/* Explanation */}
      {phase === 'revealed' && (
        <div className={cn(
          'text-[12.5px] px-3 py-2.5 rounded leading-relaxed mt-1',
          allCorrect ? 'bg-light-green text-[#085041]' : partial ? 'bg-light-amber text-[#854F0B]' : 'bg-light-red text-[#791F1F]'
        )}>
          {allCorrect ? '✓ Chính xác! ' : partial ? '△ Đúng một phần. ' : '✗ Chưa đúng. '}
          {q.explanation}
        </div>
      )}

      {/* Next button */}
      {phase === 'revealed' && (
        <div className="flex justify-end mt-3">
          <button
            onClick={onNext}
            className="bg-brand-blue text-white px-4 py-2 rounded text-[13px] font-semibold hover:bg-blue-700 transition-colors"
          >
            {isLast ? 'Xem kết quả →' : 'Câu tiếp →'}
          </button>
        </div>
      )}
    </div>
  )
}
