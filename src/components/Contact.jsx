import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Check, Loader2, MapPin, MessageCircle, Phone, Plus } from 'lucide-react'
import { useState } from 'react'
import { brand, clinics, whatsappHref } from '../data'
import { useT } from '../i18n'
import { Logo } from './Header'
import { MaskText, Reveal, ease, item, stagger } from './motion'
import { Eyebrow } from './Treatments'

export function Clinics() {
  const t = useT()
  const c = t.clinics
  return (
    <section id="clinicas" aria-label={c.eyebrow} className="py-28 sm:py-40">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{c.eyebrow}</Eyebrow>
            </Reveal>
            <MaskText className="display mt-6 text-[clamp(1.9rem,3.5vw,3rem)]" lines={[c.title, <em key="e">{c.titleEm}</em>]} />
          </div>
          <Reveal delay={0.1} as="p" className="max-w-sm text-lg text-muted lg:col-span-4 lg:col-start-9">
            {c.lead}
          </Reveal>
        </div>

        <motion.ul
          className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {clinics.map((cl) => (
            <motion.li key={cl.id} variants={item} className="bg-porcelain">
              <a
                href={cl.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group flex h-full min-h-64 flex-col p-8 transition-colors duration-500 ${cl.main ? 'bg-brand text-white hover:bg-brand-2' : 'hover:bg-white'}`}
              >
                <div className="flex items-start justify-between">
                  <MapPin className={`size-5 ${cl.main ? 'text-white' : 'text-brand'}`} aria-hidden="true" />
                  <ArrowUpRight
                    className="size-5 opacity-40 transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
                <p className="display mt-auto pt-12 text-2xl">{cl.city}</p>
                <p className={`mt-2 text-sm ${cl.main ? 'text-white/85' : 'text-muted'}`}>{cl.name}</p>
                {cl.main && <p className="mt-1 text-xs font-medium text-white/85">{c.mainDetail}</p>}
                <span className="sr-only"> {t.ui.opensMaps}</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export function Faq() {
  const t = useT()
  const f = t.faq
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" aria-label={f.eyebrow} className="bg-white py-28 sm:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>{f.eyebrow}</Eyebrow>
            </Reveal>
            <MaskText className="display mt-6 text-[clamp(1.9rem,3.5vw,3rem)]" lines={[f.title, <em key="e">{f.titleEm}</em>]} />
            <Reveal delay={0.1} as="p" className="mt-6 text-muted">
              {f.other}{' '}
              <a
                href={whatsappHref(t.ui.whatsappText)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
              >
                {f.otherLink}
              </a>
            </Reveal>
          </div>
        </div>
        <ul className="border-t border-line lg:col-span-7 lg:col-start-6">
          {f.items.map((it, i) => {
            const isOpen = open === i
            return (
              <li key={i} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left"
                  >
                    <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-brand">{it.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0, backgroundColor: isOpen ? '#1f6fd6' : 'rgba(31,111,214,0)', color: isOpen ? '#ffffff' : '#14181f' }}
                      transition={{ duration: 0.35, ease }}
                      className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 text-muted">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

const inputCls =
  'min-h-13 w-full rounded-xl border border-line bg-white px-4 text-ink placeholder:text-titanium transition-colors duration-200 hover:border-ink/30 focus:border-brand focus:outline-none'

function Field({ label, id, error, children, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-[#b42318]" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const t = useT()
  const c = t.contact
  const f = c.form
  const [status, setStatus] = useState('idle')
  const [errors, setErrors] = useState({})

  const onSubmit = (ev) => {
    ev.preventDefault()
    const form = ev.currentTarget
    const d = new FormData(form)
    const e = {}
    if (!d.get('nombre')?.trim()) e.nombre = f.errName
    if (!/^\+?\d{9,15}$/.test((d.get('telefono') || '').replace(/[\s-]/g, ''))) e.telefono = f.errPhone
    const email = d.get('email')?.trim()
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = f.errEmail
    if (!d.get('privacidad')) e.privacidad = f.errConsent
    setErrors(e)
    if (Object.keys(e).length) {
      form.querySelector(`[name="${Object.keys(e)[0]}"]`)?.focus()
      return
    }
    // TODO: conectar con el CRM o servicio de formularios del cliente (incluir el idioma: t.meta / lang)
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="contacto" aria-label={c.eyebrow} className="bg-brand py-24 text-white sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow text-white/90">{c.eyebrow}</p>
          </Reveal>
          <MaskText className="display mt-6 text-[clamp(1.9rem,3.5vw,3rem)]" lines={[c.title, <em key="e" className="!text-white">{c.titleEm}</em>]} />
          <Reveal delay={0.1} as="p" className="mt-6 max-w-md text-lg text-white/90">
            {c.lead}
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 grid gap-3">
              {c.benefits.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-white text-brand">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 grid gap-3 sm:grid-cols-2">
            <a href={brand.phoneHref} className="rounded-2xl border border-white/30 p-5 transition-colors hover:border-white">
              <Phone className="size-5" aria-hidden="true" />
              <p className="mt-3 text-sm text-white/85">{c.callUs}</p>
              <p className="font-medium tabular-nums">{brand.phone}</p>
            </a>
            <a href={whatsappHref(t.ui.whatsappText)} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-white/30 p-5 transition-colors hover:border-white">
              <MessageCircle className="size-5" aria-hidden="true" />
              <p className="mt-3 text-sm text-white/85">{c.whatsapp}</p>
              <p className="font-medium">{c.whatsappCta}</p>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-3xl bg-white p-6 text-ink sm:p-9">
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div
                  key="ok"
                  role="status"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease }}
                  className="flex min-h-[32rem] flex-col items-center justify-center text-center"
                >
                  <svg viewBox="0 0 80 80" className="size-20" aria-hidden="true">
                    <motion.circle cx="40" cy="40" r="36" fill="none" stroke="#1f6fd6" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease }} />
                    <motion.path
                      d="M26 41 l9 9 l19 -20"
                      fill="none"
                      stroke="#1f6fd6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, ease, delay: 0.6 }}
                    />
                  </svg>
                  <h3 className="display mt-6 text-3xl">{f.okTitle}</h3>
                  <p className="mt-3 max-w-xs text-muted">{f.okText}</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} noValidate exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                  <Field label={f.name} id="nombre" error={errors.nombre} className="sm:col-span-2">
                    <input id="nombre" name="nombre" autoComplete="name" className={inputCls} aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? 'nombre-error' : undefined} />
                  </Field>
                  <Field label={f.phone} id="telefono" error={errors.telefono}>
                    <input
                      id="telefono"
                      name="telefono"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder={f.phonePh}
                      className={inputCls}
                      aria-invalid={!!errors.telefono}
                      aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                    />
                  </Field>
                  <Field label={f.email} id="email" error={errors.email}>
                    <input id="email" name="email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                  </Field>
                  <Field label={f.treatment} id="tratamiento">
                    <select id="tratamiento" name="tratamiento" className={`${inputCls} cursor-pointer appearance-none`} defaultValue="valoracion">
                      <option value="valoracion" className="text-ink">
                        {f.treatmentDefault}
                      </option>
                      {t.treatments.items.map((it) => (
                        <option key={it.id} value={it.id} className="text-ink">
                          {it.label}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={f.clinic} id="clinica">
                    <select id="clinica" name="clinica" className={`${inputCls} cursor-pointer appearance-none`} defaultValue={clinics[0].id}>
                      {clinics.map((cl) => (
                        <option key={cl.id} value={cl.id} className="text-ink">
                          {cl.city}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label={f.message} id="mensaje" className="sm:col-span-2">
                    <textarea id="mensaje" name="mensaje" rows="3" className={`${inputCls} resize-none py-3`} placeholder={f.messagePh} />
                  </Field>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
                      <input
                        type="checkbox"
                        name="privacidad"
                        className="mt-0.5 size-5 shrink-0 cursor-pointer accent-brand"
                        aria-invalid={!!errors.privacidad}
                        aria-describedby={errors.privacidad ? 'privacidad-error' : undefined}
                      />
                      <span>
                        {f.consent1}{' '}
                        <a href="#" className="underline underline-offset-2 hover:text-brand">
                          {f.privacy}
                        </a>{' '}
                        {f.consent2}
                      </span>
                    </label>
                    {errors.privacidad && (
                      <p id="privacidad-error" className="mt-2 text-sm text-[#b42318]" role="alert">
                        {errors.privacidad}
                      </p>
                    )}
                  </div>
                  <button type="submit" disabled={status === 'sending'} className="btn-brand mt-2 disabled:cursor-wait disabled:opacity-70 sm:col-span-2">
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                        {f.sending}
                      </>
                    ) : (
                      f.submit
                    )}
                  </button>
                  <p className="text-center text-xs text-muted sm:col-span-2">{t.ui.reassurance}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  const t = useT()
  const ft = t.footer
  return (
    <footer className="bg-ink pt-16 pb-28 text-white sm:pb-10">
      <div className="container-x">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-sm text-white/55">{ft.tagline}</p>
          </div>
          <nav aria-label={ft.footerNav} className="md:col-span-3 md:col-start-6">
            <p className="text-sm font-semibold text-white">{ft.navTitle}</p>
            <ul className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/75 md:grid-cols-1">
              {t.nav.map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="hover:text-white">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-4 md:col-start-9">
            <p className="text-sm font-semibold text-white">{ft.contactTitle}</p>
            <address className="mt-5 grid gap-2 text-sm not-italic text-white/75">
              <a href={brand.mapsHref} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {brand.address}
                <br />
                {brand.city}
              </a>
              <a href={brand.phoneHref} className="tabular-nums hover:text-white">
                {brand.phone}
              </a>
              <a href={brand.clinicPhoneHref} className="tabular-nums hover:text-white">
                {brand.clinicPhone}
              </a>
            </address>
            <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 whitespace-nowrap text-sm">
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
                Instagram
              </a>
              <a href={brand.instagramDoctor} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
                Instagram Dr.
              </a>
              <a href={brand.facebookDoctor} target="_blank" rel="noopener noreferrer" className="text-white/75 hover:text-white">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-4 text-xs text-white/60 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Implantes Dentales Barcelona</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-white">
              {ft.legal}
            </a>
            <a href="#" className="hover:text-white">
              {ft.privacy}
            </a>
            <a href="#" className="hover:text-white">
              {ft.cookies}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

export function MobileBar() {
  const t = useT()
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 700))

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-2 gap-2 rounded-full border border-white/10 bg-ink p-1.5 sm:hidden"
          style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.45, ease }}
        >
          <a href={brand.phoneHref} className="flex min-h-12 items-center justify-center gap-2 rounded-full text-sm font-medium text-white">
            <Phone className="size-4" aria-hidden="true" />
            {t.ui.call}
          </a>
          <a href="#contacto" className="flex min-h-12 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
            {t.ui.consultShort}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
