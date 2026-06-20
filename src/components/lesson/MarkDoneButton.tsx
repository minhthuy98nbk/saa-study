import { CheckCircle, Circle } from 'lucide-react'

interface MarkDoneButtonProps {
  done: boolean
  onToggle: () => void
}

export function MarkDoneButton({ done, onToggle }: MarkDoneButtonProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex items-center justify-between gap-3">
      <p className="text-[13px] text-text-muted">
        {done ? '✓ Marked as complete' : 'Finished this lesson?'}
      </p>
      <button
        onClick={onToggle}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded border text-[12px] font-medium transition-all ${
          done
            ? 'bg-light-green text-brand-green border-brand-green'
            : 'text-brand-green border-brand-green hover:bg-light-green'
        }`}
      >
        {done ? <CheckCircle size={13} /> : <Circle size={13} />}
        {done ? 'Done' : 'Mark complete'}
      </button>
    </div>
  )
}
