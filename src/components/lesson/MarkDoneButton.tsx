import { CheckCircle, Circle } from 'lucide-react'

interface MarkDoneButtonProps {
  done: boolean
  onToggle: () => void
}

export function MarkDoneButton({ done, onToggle }: MarkDoneButtonProps) {
  return (
    <div className="bg-card rounded-lg border border-border p-4 flex items-center justify-between gap-3">
      <p className="text-[13px] text-text-muted">
        {done ? '✓ Bạn đã đánh dấu bài này hoàn thành' : 'Học xong bài này chưa?'}
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
        {done ? 'Đã xong' : 'Đánh dấu hoàn thành'}
      </button>
    </div>
  )
}
