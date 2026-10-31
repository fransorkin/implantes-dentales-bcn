import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { brand } from '../data'
import { useT } from '../i18n'
import { goToForm } from './Contact'
import LanguageSwitcher from './LanguageSwitcher'
import { ease } from './motion'

export function Logo({ onClick, onDark = false }) {
  const t = useT()
  return (
    <a
      href="#inicio"
      onClick={onClick}
      className={`flex shrink-0 items-center ${onDark ? 'w-fit rounded-xl bg-white px-3 py-1.5' : ''}`}
      aria-label={`${brand.name}, ${t.ui.home}`}
    >
      <img src="/img/logo.png" alt="" width="289" height="154" className={onDark ? 'h-12 w-auto sm:h-14' : 'h-14 w-auto sm:h-16'} />
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
              <Logo onDark onClick={() => setOpen(false)} />
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
