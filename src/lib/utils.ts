import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function formatDate(iso: string): string {
  const d = new Date(iso)
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${dd}/${mm} ${hh}:${min}`
}

export function scoreColor(pct: number): string {
  if (pct >= 80) return 'text-brand-green'
  if (pct >= 60) return 'text-brand-amber'
  return 'text-brand-red'
}

export function scoreBg(pct: number): string {
  if (pct >= 80) return 'bg-light-green text-brand-green'
  if (pct >= 60) return 'bg-light-amber text-brand-amber'
  return 'bg-light-red text-brand-red'
}
