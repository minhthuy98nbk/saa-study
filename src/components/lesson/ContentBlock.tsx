import { cn } from '@/lib/utils'
import type { Section } from '@/types'

interface ContentBlockProps {
  section: Section
  bilingual: boolean
  onWordClick: (word: string, x: number, y: number) => void
}

const LEVEL_CONFIG = {
  intro: { bg: 'bg-[#E1F5EE] text-[#0F6E56]', label: 'Overview' },
  core: { bg: 'bg-light-blue text-brand-blue', label: 'Core' },
  deep: { bg: 'bg-light-amber text-brand-amber', label: 'Deep Dive' },
  exam: { bg: 'bg-light-red text-[#A32D2D]', label: 'Exam Focus' },
}

// Từ phổ biến không cần tra từ điển
const SKIP_WORDS = new Set([
  'about', 'after', 'also', 'always', 'apply', 'areas', 'being', 'both', 'build',
  'check', 'cloud', 'could', 'cover', 'data', 'deploy', 'design', 'each', 'ensure',
  'every', 'first', 'given', 'have', 'here', 'high', 'into', 'just', 'keep', 'know',
  'large', 'level', 'like', 'make', 'manage', 'many', 'meet', 'more', 'most', 'must',
  'need', 'never', 'only', 'other', 'over', 'perform', 'policy', 'provide', 'reduce',
  'require', 'running', 'same', 'scale', 'secure', 'select', 'should', 'since', 'some',
  'such', 'take', 'than', 'that', 'their', 'them', 'then', 'there', 'these', 'they',
  'this', 'those', 'time', 'type', 'under', 'used', 'using', 'user', 'very', 'well',
  'when', 'where', 'which', 'while', 'will', 'with', 'within', 'work', 'your',
])

// Chỉ wrap text nodes (giữa > và <), không đụng vào HTML tags/attributes
function wrapClickableWords(html: string): string {
  return html.replace(/>([^<]+)</g, (_match, text: string) => {
    const wrapped = text.replace(/\b([A-Z][a-z]{2,}|[a-z]{5,})\b/g, (word: string) => {
      if (SKIP_WORDS.has(word.toLowerCase())) return word
      return `<span class="cw" data-word="${word}">${word}</span>`
    })
    return `>${wrapped}<`
  })
}

export function ContentBlock({ section, bilingual, onWordClick }: ContentBlockProps) {
  const config = LEVEL_CONFIG[section.level]

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement
    if (target.classList.contains('cw') && target.dataset.word) {
      onWordClick(target.dataset.word, e.clientX, e.clientY)
    }
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-2.5 hover:shadow-md transition-shadow">
      <span className={cn('inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full mb-2', config.bg)}>
        {section.label}
      </span>
      <h3 className="text-sm font-bold text-text mb-2.5">{section.heading}</h3>
      <div
        className="rc text-[13.5px]"
        onClick={handleClick}
        dangerouslySetInnerHTML={{ __html: wrapClickableWords(section.contentHtml) }}
      />
      {bilingual && section.contentVi && (
        <div className="mt-2.5 pt-2.5 border-t border-dashed border-border">
          <p className="text-[10.5px] text-text-faint font-semibold mb-1">🇻🇳 Tiếng Việt</p>
          <p className="text-[13px] text-text-muted leading-relaxed">{section.contentVi}</p>
        </div>
      )}
    </div>
  )
}
