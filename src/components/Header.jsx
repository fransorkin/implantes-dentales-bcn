import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { brand } from '../data'
import { useT } from '../i18n'
import { goToForm } from './Contact'
import LanguageSwitcher from './LanguageSwitcher'
import { ease } from './motion'

export function Mark({ className = 'size-9' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M13 5.500c-5 0-8 4-8 9 0 5 2.600 8.300 3.800 14 .9 4.200 2.200 7 4.200 7 2.500 0 3-4.300 3.900-7.800.5-2 1.300-3.200 3.100-3.200s2.600 1.200 3.100 3.200c.9 3.500 1.400 7.800 3.900 7.800 2 0 3.300-2.800 4.200-7 1.200-5.700 3.800-9 3.800-14 0-5-3-9-8-9-3.300 0-4.700 1.900-7 1.900s-3.700-1.900-7-1.900Z"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2.400"
        strokeLinejoin="round"
      />
      <path d="m14 14.500 4.300 4.300 8-8" fill="none" stroke="#25b06f" strokeWidth="2.800" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Logo({ onClick }) {
  const t = useT()
  return (
    <a href="#inicio" onClick={onClick} className="flex items-center gap-3" aria-label={`${brand.name}, ${t.ui.home}`}>
      <Mark />
      <span className="leading-none">
        <span className="block text-[0.9rem] font-semibold uppercase tracking-wide">Implantes Dentales</span>
        <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.42em]">Barcelona</span>
      </span>
    </a>
  )
}

export default function Header() {
  const t = useT()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 600 && y > prev && !open)
  })

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-ink"
      >
        {t.ui.skip}
      </a>
      <motion.header
        className="fixed inset-x-0 top-0 z-40 text-ink"
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.45, ease }}
      >
        <div
          className={`absolute inset-0 -z-10 transition-[background-color,backdrop-filter,border-color] duration-500 ${
            scrolled ? 'border-b border-line bg-white' : 'border-b border-transparent'
          }`}
        />
        <div className="container-x flex h-20 items-center justify-between gap-4">
          <Logo />

          <nav aria-label={t.ui.mainNav} className="hidden 2xl:block">
            <ul className="flex items-center gap-1 text-[0.9rem] font-medium text-ink/75">
              {t.nav.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="rounded-full px-4 py-2 whitespace-nowrap transition-colors duration-200 hover:text-brand">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={brand.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.9rem] font-medium text-ink transition-colors hover:text-brand lg:inline-flex"
            >
              <Phone className="size-4" aria-hidden="true" />
              <span className="tabular-nums whitespace-nowrap">{brand.phone}</span>
            </a>
            <a href="#formulario" onClick={goToForm} className="btn-brand hidden !min-h-11 !px-5 text-[0.88rem] md:inline-flex">
              {t.ui.consultShort}
            </a>
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 2xl:hidden"
              aria-label={t.ui.menuOpen}
              aria-expanded={open}
              aria-controls="menu"
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.ui.menu}
            className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
          >
            <div className="container-x flex h-20 shrink-0 items-center justify-between">
              <Logo onClick={() => setOpen(false)} />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15"
                aria-label={t.ui.menuClose}
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <motion.ul
              className="container-x mt-4 flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
            >
              {t.nav.map(([label, href]) => (
                <motion.li
                  key={href}
                  className="overflow-hidden border-b border-white/[0.08]"
                  variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } } }}
                >
                  <a href={href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-3.5">
                    <span className="display text-3xl">{label}</span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
            <div className="container-x mt-auto grid gap-3 pt-8 pb-10">
              <LanguageSwitcher variant="inline" />
              <a
                href="#formulario"
                onClick={(ev) => {
                  setOpen(false)
                  goToForm(ev)
                }}
                className="btn-light mt-2">
                {t.ui.consult}
              </a>
              <a href={brand.phoneHref} className="btn-outline-light">
                <Phone className="size-4" aria-hidden="true" />
                {brand.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
