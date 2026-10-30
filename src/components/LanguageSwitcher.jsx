import { AnimatePresence, motion } from 'motion/react'
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { languages, useLang } from '../i18n'
import { ease } from './motion'

export function Flag({ code, className = 'h-3.5 w-5' }) {
  const common = { className: `${className} shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10`, 'aria-hidden': true, preserveAspectRatio: 'none' }
  if (code === 'es')
    return (
      <svg viewBox="0 0 30 20" {...common}>
        <rect width="30" height="20" fill="#c60b1e" />
        <rect y="5" width="30" height="10" fill="#ffc400" />
      </svg>
    )
  if (code === 'ca')
    return (
      <svg viewBox="0 0 30 20" {...common}>
        <rect width="30" height="20" fill="#fcdd09" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} y={2.22 + i * 4.44} width="30" height="2.22" fill="#da121a" />
        ))}
      </svg>
    )
  if (code === 'de')
    return (
      <svg viewBox="0 0 30 20" {...common}>
        <rect width="30" height="6.67" fill="#000" />
        <rect y="6.67" width="30" height="6.67" fill="#dd0000" />
        <rect y="13.33" width="30" height="6.67" fill="#ffce00" />
      </svg>
    )
  return (
    <svg viewBox="0 0 60 30" {...common}>
      <clipPath id="uk-s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="uk-t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#uk-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#uk-t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  )
}

export default function LanguageSwitcher({ align = 'right', variant = 'compact' }) {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (variant === 'inline') {
    return (
      <div role="group" aria-label={t.ui.language} className="grid grid-cols-4 gap-2">
        {languages.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            onClick={() => setLang(l.code)}
            aria-pressed={lang === l.code}
            className={`flex min-h-12 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border text-xs transition-colors ${
              lang === l.code ? 'border-white/40 bg-white/10' : 'border-white/10 hover:border-white/25'
            }`}
          >
            <Flag code={l.code} />
            {l.code.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t.ui.language}: ${languages.find((l) => l.code === lang).label}`}
        className="flex h-11 cursor-pointer items-center gap-2 rounded-full border border-ink/15 px-3 text-[0.8rem] font-semibold uppercase tracking-wide text-ink transition-colors hover:border-ink/40"
      >
        <Flag code={lang} />
        <span>{lang}</span>
        <ChevronDown className={`size-3.5 opacity-60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t.ui.language}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease }}
            className={`absolute top-full z-50 mt-2 w-48 origin-top overflow-hidden rounded-2xl border border-line bg-white p-1.5 text-ink shadow-lg ${
              align === 'right' ? 'right-0' : 'left-0'
            }`}
          >
            {languages.map((l) => (
              <li key={l.code} role="option" aria-selected={lang === l.code}>
                <button
                  type="button"
                  lang={l.code}
                  onClick={() => {
                    setLang(l.code)
                    setOpen(false)
                  }}
                  className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-pale"
                >
                  <Flag code={l.code} />
                  <span className="flex-1">{l.label}</span>
                  {lang === l.code && <Check className="size-4 text-brand" aria-hidden="true" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
