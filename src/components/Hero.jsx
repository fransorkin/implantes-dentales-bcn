import { motion } from 'motion/react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { brand, stats, whatsappHref } from '../data'
import { useT } from '../i18n'
import { CountUp, ease } from './motion'

const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
})

export default function Hero() {
  const t = useT()
  const h = t.hero

  return (
    <section id="inicio" className="relative overflow-hidden bg-porcelain pt-28 sm:pt-32">
      <div className="pointer-events-none absolute -bottom-40 -right-32 size-[34rem] rounded-full bg-brand-pale" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-10 pb-14 lg:grid-cols-12 lg:gap-12 lg:pb-20">
        <div className="lg:col-span-7">
          <motion.p
            {...rise(0.05)}
            className="inline-flex rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white"
          >
            {h.eyebrow}
          </motion.p>

          <motion.h1 {...rise(0.12)} className="display mt-6 text-[clamp(2.6rem,6vw,4.75rem)] font-bold">
            {h.title} {h.titleEm}
          </motion.h1>

          <motion.p {...rise(0.18)} className="mt-3 text-[clamp(1.35rem,2.6vw,2rem)] font-light italic text-brand">
            All-on-4 · All-on-6
          </motion.p>

          <motion.p {...rise(0.24)} className="mt-6 max-w-xl text-lg text-muted">
            {h.lead}
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#contacto" className="btn-brand group">
              {t.ui.consult}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href={whatsappHref(t.ui.whatsappText)} target="_blank" rel="noopener noreferrer" className="btn-outline-dark">
              <MessageCircle className="size-4" aria-hidden="true" />
              {t.ui.whatsapp}
            </a>
          </motion.div>

          <motion.p {...rise(0.36)} className="mt-5 text-sm text-muted">
            {t.ui.reassurance}
          </motion.p>
        </div>

        <motion.figure {...rise(0.2)} className="lg:col-span-5">
          <div className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-ink lg:max-w-none">
            <img
              src="/img/dr-diego.jpg"
              alt={h.photoAlt}
              width="400"
              height="440"
              fetchPriority="high"
              className="aspect-[400/410] w-full object-cover object-top"
            />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white px-5 py-3.5 text-ink">
              <span className="block text-[0.95rem] font-semibold">{brand.doctor}</span>
              <span className="mt-0.5 block text-xs text-muted">{h.role}</span>
            </figcaption>
          </div>
        </motion.figure>
      </div>

      <div className="relative border-t border-line bg-white">
        <dl className="container-x grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const st = h.stats[s.id]
            return (
              <div
                key={s.id}
                className={`py-7 sm:py-9 ${i % 2 ? 'border-l border-line pl-5 sm:pl-8' : 'pr-5'} ${i === 2 ? 'lg:border-l lg:border-line lg:pl-8' : ''} ${
                  i > 1 ? 'border-t border-line lg:border-t-0' : ''
                }`}
              >
                <dt className="sr-only">{st.label}</dt>
                <dd>
                  <span className="display flex items-baseline gap-2 text-3xl font-bold text-brand sm:text-4xl">
                    {st.kicker && <span className="text-sm font-medium text-muted">{st.kicker}</span>}
                    <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} plain={s.plain} />
                  </span>
                  <span className="mt-1.5 block max-w-[15rem] text-sm text-muted">{st.label}</span>
                </dd>
              </div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
