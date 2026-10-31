import { motion } from 'motion/react'
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Minus, MoveHorizontal, Star } from 'lucide-react'
import { useState } from 'react'
import { brand, cases } from '../data'
import { useT } from '../i18n'
import { InstagramIcon } from './Header'
import { MaskText, Reveal, item, stagger } from './motion'
import { Eyebrow } from './Treatments'

export function Doctor() {
  const t = useT()
  const d = t.doctor

  return (
    <section id="doctor" aria-label={d.eyebrow} className="bg-porcelain py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Reveal className="lg:col-span-5">
          <figure className="relative mx-auto max-w-md overflow-hidden rounded-3xl bg-ink">
            <img
              src="/img/dr-diego.jpg"
              alt={brand.doctor}
              width="400"
              height="440"
              loading="lazy"
              className="aspect-[400/410] w-full object-cover object-top"
            />
            <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white px-5 py-3.5 text-ink">
              <span className="block text-[0.95rem] font-semibold">{brand.doctor}</span>
              <span className="mt-0.5 block text-xs text-muted">{d.location}</span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <Eyebrow>{d.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05} as="h2" className="display mt-4 text-[clamp(1.9rem,3.5vw,3rem)]">
            {d.title} <em>{d.titleEm}</em>
          </Reveal>
          {/* REVISAR: añadir formación, número de colegiado y años de ejercicio del doctor */}
          <Reveal delay={0.1} as="p" className="mt-6 text-muted">
            {d.p1}
          </Reveal>
          <Reveal delay={0.15} as="p" className="mt-4 text-muted">
            {d.p2}
          </Reveal>

          <Reveal delay={0.2} as="blockquote" className="mt-8 border-l-2 border-brand pl-5">
            <p className="text-xl font-semibold tracking-tight">“{d.quote}”</p>
            <footer className="mt-1 text-sm text-muted">{brand.doctorShort}</footer>
          </Reveal>

          <Reveal delay={0.25} className="mt-8">
            <p className="text-sm text-muted">{d.also}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {d.others.map((o) => (
                <li key={o} className="rounded-full border border-line bg-white px-4 py-1.5 text-sm">
                  {o}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function BeforeAfter() {
  const t = useT()
  const c = t.compare
  const [index, setIndex] = useState(0)
  const [pos, setPos] = useState(50)
  const n = index + 1

  const go = (i) => {
    setIndex((i + cases.length) % cases.length)
    setPos(50)
  }

  return (
    <section id="casos" aria-label={c.eyebrow} className="py-28 sm:py-40">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
        <div className="min-w-0 lg:col-span-7">
          <Reveal>
            <div className="relative aspect-[2/1] select-none overflow-hidden rounded-3xl bg-brand-pale has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-brand-2 has-[input:focus-visible]:ring-offset-2">
              <motion.div key={index} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }}>
                <img src={cases[index].after} alt={c.altAfter.replace('{n}', n)} className="absolute inset-0 size-full object-cover" />
                <img
                  src={cases[index].before}
                  alt={c.altBefore.replace('{n}', n)}
                  className="absolute inset-0 size-full object-cover"
                  style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
                />
              </motion.div>
              <span className="absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur sm:left-5 sm:top-5">{c.tagBefore}</span>
              <span className="absolute right-4 top-4 rounded-full bg-white/85 px-3 py-1.5 text-xs font-medium text-ink backdrop-blur sm:right-5 sm:top-5">{c.tagAfter}</span>
              <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
                <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-xl sm:size-12">
                  <MoveHorizontal className="size-5" aria-hidden="true" />
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label={c.slider}
                className="absolute inset-0 size-full cursor-ew-resize opacity-0"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={c.prev}
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <ul className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1">
              {cases.map((cs, i) => (
                <li key={cs.after} className="shrink-0 sm:min-w-0 sm:flex-1 sm:shrink">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`${c.caseLabel} ${i + 1}`}
                    aria-current={i === index ? 'true' : undefined}
                    className={`block w-20 cursor-pointer overflow-hidden rounded-lg transition-opacity duration-300 sm:w-full ${
                      i === index ? 'opacity-100 ring-2 ring-brand' : 'opacity-55 hover:opacity-100'
                    }`}
                  >
                    <img src={cs.after} alt="" loading="lazy" className="aspect-[2/1] w-full object-cover" />
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={c.next}
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink/15 transition-colors hover:border-ink/40"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </Reveal>
          <p className="mt-3 text-sm tabular-nums text-muted" aria-live="polite">
            {c.caseLabel} {n} / {cases.length}
          </p>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal>
            <Eyebrow>{c.eyebrow}</Eyebrow>
          </Reveal>
          <MaskText className="display mt-6 text-[clamp(1.9rem,3vw,2.75rem)]" lines={[c.title, <em key="e">{c.titleEm}</em>]} />

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={0.1}>
              <p className="text-sm font-semibold text-muted">{c.beforeLabel}</p>
              <ul className="mt-4 grid gap-3">
                {c.before.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.95rem] text-muted">
                    <Minus className="mt-1 size-4 shrink-0 text-titanium" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm font-semibold text-brand">{c.afterLabel}</p>
              <ul className="mt-4 grid gap-3">
                {c.after.map((x) => (
                  <li key={x} className="flex gap-3 text-[0.95rem]">
                    <Check className="mt-1 size-4 shrink-0 text-brand" aria-hidden="true" />
                    {x}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.25} as="p" className="mt-8 text-sm text-muted">
            {c.note}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Testimonials() {
  const t = useT()
  const r = t.testimonials
  return (
    <section id="testimonios" aria-label={r.eyebrow} className="bg-white py-28 sm:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7">
            <Reveal>
              <Eyebrow>{r.eyebrow}</Eyebrow>
            </Reveal>
            <MaskText className="display mt-6 text-[clamp(1.9rem,3.5vw,3rem)]" lines={[r.title, <em key="e">{r.titleEm}</em>]} />
          </div>
          <Reveal delay={0.1} as="p" className="max-w-sm text-lg text-muted lg:col-span-4 lg:col-start-9">
            {r.lead}
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <motion.ul
              className="grid gap-4"
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
            >
              {r.items.map((x) => (
                <motion.li key={x.name} variants={item} className="flex flex-col rounded-2xl border border-line bg-porcelain p-6 sm:p-7">
                  <div className="flex gap-0.5" role="img" aria-label={r.stars}>
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="size-3.5 fill-gold text-gold" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed">“{x.quote}”</blockquote>
                  <footer className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    <span className="flex size-9 items-center justify-center rounded-full bg-brand-pale text-xs font-semibold text-brand">
                      {x.name
                        .split(' ')
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join('')}
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-medium">{x.name}</span>
                      <span className="text-xs text-muted">{r.treatment}</span>
                    </span>
                  </footer>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="mx-auto w-full max-w-[360px] overflow-hidden rounded-2xl bg-ink">
              <video
                src="/video/reel.mp4"
                poster="/video/reel-poster.jpg"
                controls
                playsInline
                preload="none"
                width="720"
                height="1280"
                aria-label={r.videoTitle}
                className="block aspect-[9/16] w-full bg-ink object-cover"
              />
            </div>
            <a
              href={brand.instagramReel}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-4 flex w-fit items-center gap-2 text-sm font-medium text-muted hover:text-brand"
            >
              <InstagramIcon className="size-4" />
              {r.videoLink}
            </a>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex flex-col items-center gap-3">
          <a href={brand.reviewsHref} target="_blank" rel="noopener noreferrer" className="btn-outline-dark group">
            {r.google}
            <ArrowUpRight
              className="size-4 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
          {r.translated && <p className="text-xs text-muted">{r.translated}</p>}
        </Reveal>
      </div>
    </section>
  )
}
