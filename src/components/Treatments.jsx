import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'
import { useRef, useState } from 'react'
import { treatmentImages } from '../data'
import { useT } from '../i18n'
import { MaskText, Reveal, ease } from './motion'

export function Eyebrow({ children, light = false }) {
  return <p className={`eyebrow ${light ? 'text-brand-soft' : 'text-brand'}`}>{children}</p>
}

export function Pains() {
  const t = useT()
  const p = t.pains
  return (
    <section aria-label={p.eyebrow} className="py-28 sm:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow>{p.eyebrow}</Eyebrow>
            </Reveal>
            <MaskText className="display mt-6 text-[clamp(1.9rem,3.5vw,3rem)]" lines={[p.title, <em key="e">{p.titleEm}</em>]} />
            <Reveal delay={0.15} as="p" className="mt-7 max-w-md text-lg text-muted">
              {p.lead}
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <a href="#contacto" className="btn-brand group">
                {t.ui.consult}
                <ArrowRight className="size-4 transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-6 lg:col-start-7">
          {p.items.map((it, i) => (
            <Reveal key={i} as="li" className="border-t border-line py-7 last:border-b">
              <h3 className="text-xl font-semibold tracking-tight">{it.title}</h3>
              <p className="mt-2 max-w-lg text-muted">{it.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Treatments() {
  const t = useT()
  const tr = t.treatments
  const [active, setActive] = useState(0)
  const item = tr.items[active]
  const image = treatmentImages[item.id]

  const onKey = (e) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return
    e.preventDefault()
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1
    const next = (active + d + tr.items.length) % tr.items.length
    setActive(next)
    document.getElementById(`tab-${tr.items[next].id}`)?.focus()
  }

  return (
    <section id="tratamientos" aria-label={tr.eyebrow} className="bg-white py-28 sm:py-40">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{tr.eyebrow}</Eyebrow>
            </Reveal>
            <MaskText className="display mt-6 text-[clamp(1.9rem,3.5vw,3rem)]" lines={[tr.title, <em key="e">{tr.titleEm}</em>]} />
          </div>
          <Reveal delay={0.15} as="p" className="max-w-md text-lg text-muted lg:col-span-4 lg:col-start-9">
            {tr.lead}
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          <div
            role="tablist"
            aria-label={tr.tablist}
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:overflow-visible lg:pb-0"
            onKeyDown={onKey}
          >
            {tr.items.map((it, i) => {
              const selected = i === active
              return (
                <button
                  key={it.id}
                  id={`tab-${it.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`panel-${it.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`relative flex shrink-0 cursor-pointer items-center justify-between gap-6 rounded-2xl px-5 py-4 text-left transition-colors duration-300 lg:px-6 lg:py-6 ${
                    selected ? 'text-white' : 'text-ink hover:bg-porcelain'
                  }`}
                >
                  {selected && (
                    <motion.span layoutId="tab-bg" className="absolute inset-0 rounded-2xl bg-brand" transition={{ type: 'spring', stiffness: 380, damping: 34 }} />
                  )}
                  <span className="relative flex items-center gap-4">
                    <span className="whitespace-nowrap text-[1rem] font-semibold lg:text-lg">{it.label}</span>
                  </span>
                  {it.badge && (
                    <span
                      className={`relative hidden whitespace-nowrap rounded-full px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider sm:inline lg:hidden 2xl:inline ${
                        selected ? 'bg-white text-brand' : 'bg-brand-pale text-brand'
                      }`}
                    >
                      {it.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                id={`panel-${item.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${item.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                transition={{ duration: 0.55, ease }}
                className="grid overflow-hidden rounded-3xl border border-line bg-porcelain md:grid-cols-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[30rem]">
                  {image ? (
                    <motion.img
                      src={image}
                      alt={item.alt}
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover"
                      initial={{ scale: 1.08 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.2, ease }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-ink">
                      <ArchIllustration />
                    </div>
                  )}
                </div>
                <div className="flex flex-col p-8 sm:p-10">
                  <h3 className="display text-3xl">{item.title}</h3>
                  <p className="mt-5 text-muted">{item.text}</p>
                  <ul className="mt-8 grid gap-3.5">
                    {item.points.map((pt, i) => (
                      <motion.li
                        key={pt}
                        className="flex gap-3"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.06 }}
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                          <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-[0.98rem]">{pt}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <a href="#contacto" className="btn-brand group mt-10 self-start md:mt-auto">
                    {t.ui.learnMore}
                    <ArrowRight className="size-4 transition-transform duration-500 ease-premium group-hover:translate-x-1" aria-hidden="true" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

function ArchIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="w-4/5" aria-hidden="true">
      <defs>
        <linearGradient id="ti-arch" x1="0" x2="1">
          <stop offset="0" stopColor="#5f6765" />
          <stop offset=".5" stopColor="#e6e9e8" />
          <stop offset="1" stopColor="#6f7775" />
        </linearGradient>
      </defs>
      {Array.from({ length: 12 }).map((_, i) => {
        const a = Math.PI * (0.12 + (0.76 * i) / 11)
        const x = 200 - Math.cos(a) * 150
        const y = 70 + Math.sin(a) * 120
        return (
          <motion.rect
            key={i}
            x={x - 11}
            y={y - 15}
            width="22"
            height="30"
            rx="9"
            fill="#f3f3f0"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 + i * 0.04 }}
          />
        )
      })}
      {[0.2, 0.4, 0.6, 0.8].map((f, i) => {
        const a = Math.PI * (0.12 + 0.76 * f)
        const x = 200 - Math.cos(a) * 150
        const y = 70 + Math.sin(a) * 120 + 30
        return (
          <motion.rect
            key={f}
            x={x - 4}
            y={y}
            width="8"
            height="38"
            rx="2"
            fill="url(#ti-arch)"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.8 + i * 0.08 }}
          />
        )
      })}
    </svg>
  )
}

/* ---------- Método: implante realista que se ensambla con el scroll ---------- */

// Trabéculas del hueso, generadas de forma determinista
const trabeculae = (() => {
  let seed = 7
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647
  return Array.from({ length: 170 }, () => {
    const cx = rnd() * 400
    const cy = 292 + rnd() * 228
    return { cx, cy, rx: 2 + rnd() * 7, ry: 1.5 + rnd() * 4, rot: rnd() * 180, o: 0.25 + rnd() * 0.45 }
  })
})()

const CROWN =
  'M171 252 C160 240 146 218 141 196 C137 178 138 160 144 148 C150 137 160 131 171 131 C181 131 187 140 194 144 C198 146 202 146 206 144 C214 140 220 129 231 129 C243 129 253 137 258 149 C264 163 263 181 258 198 C252 221 239 241 229 252 C212 258 188 258 171 252 Z'
const ROOTS =
  'M172 250 C170 300 168 360 177 418 C180 432 189 432 191 418 C193 378 195 330 200 292 C205 330 207 378 209 418 C211 432 220 432 223 418 C232 360 230 300 228 250 Z'

function Crown() {
  return (
    <g filter="url(#crownShadow)">
      <path d={CROWN} fill="url(#enamel)" />
      <path d={CROWN} fill="url(#enamelSide)" />
      <path d={CROWN} fill="url(#enamelTip)" />
      {/* surco central y cresta iluminada */}
      <path d="M194 145 C196 160 198 176 197 194" fill="none" stroke="#b9a988" strokeOpacity=".45" strokeWidth="1.2" />
      <path d="M160 146 C166 170 168 196 166 226" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="5" strokeLinecap="round" filter="url(#soft)" />
      {/* periquimatías */}
      {[168, 182, 198, 214, 230].map((y) => (
        <path
          key={y}
          d={`M${148 + (y - 168) * 0.3} ${y} C180 ${y + 3} 222 ${y + 3} ${252 - (y - 168) * 0.35} ${y - 1}`}
          fill="none"
          stroke="#a8977a"
          strokeOpacity=".09"
        />
      ))}
      {/* brillos especulares */}
      <ellipse cx="163" cy="172" rx="7" ry="20" fill="#fff" opacity=".75" filter="url(#soft)" />
      <ellipse cx="236" cy="158" rx="5" ry="9" fill="#fff" opacity=".5" filter="url(#soft)" />
      <ellipse cx="174" cy="139" rx="9" ry="3" fill="#fff" opacity=".6" filter="url(#soft)" />
      <path d={CROWN} fill="none" stroke="#8f7f63" strokeOpacity=".25" strokeWidth="0.8" />
    </g>
  )
}

function NaturalTooth({ x }) {
  return (
    <g transform={`translate(${x} 0)`} opacity=".92">
      <path d={ROOTS} fill="url(#root)" />
      <path d={ROOTS} fill="url(#enamelSide)" opacity=".7" />
      <path d={CROWN} fill="url(#enamel)" />
      <path d={CROWN} fill="url(#enamelSide)" />
      <path d={CROWN} fill="url(#enamelTip)" />
      <ellipse cx="163" cy="172" rx="6" ry="17" fill="#fff" opacity=".55" filter="url(#soft)" />
    </g>
  )
}

function Fixture() {
  const cx = 200
  const hw = (y) => 23 - ((y - 282) / 158) * 5
  const threads = Array.from({ length: 12 }, (_, i) => 300 + i * 12)
  return (
    <g>
      <path d="M177 282 H223 L218 440 C216 452 208 462 200 462 C192 462 184 452 182 440 Z" fill="url(#titan)" />
      {threads.map((yL) => {
        const yR = yL - 6
        const l = cx - hw(yL)
        const r = cx + hw(yR)
        return (
          <g key={yL}>
            <path d={`M${l} ${yL - 4} L${l - 7} ${yL + 0.5} L${l - 7} ${yL + 2.5} L${l} ${yL + 5} Z`} fill="url(#fin)" />
            <path d={`M${r} ${yR - 4} L${r + 7} ${yR + 0.5} L${r + 7} ${yR + 2.5} L${r} ${yR + 5} Z`} fill="url(#fin)" />
            <path d={`M${l} ${yL + 1.5} Q${cx} ${yL - 1} ${r} ${yR + 1.5}`} fill="none" stroke="#252b2a" strokeOpacity=".55" strokeWidth="2.2" />
            <path d={`M${l} ${yL - 1} Q${cx} ${yL - 3.5} ${r} ${yR - 1}`} fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1" />
          </g>
        )
      })}
      {/* cuello pulido y estrías apicales */}
      <rect x="177" y="282" width="46" height="11" fill="url(#titanBright)" />
      <line x1="177" x2="223" y1="293" y2="293" stroke="#3a403f" strokeOpacity=".6" />
      <path d="M207 424 Q214 442 206 458 Q203 444 207 424 Z" fill="#1e2322" opacity=".55" />
      <path d="M190 428 Q186 444 193 457 Q195 444 190 428 Z" fill="#1e2322" opacity=".35" />
    </g>
  )
}

function Abutment() {
  return (
    <g>
      <path d="M178 284 H222 L226 262 C226 258 224 256 220 256 H180 C176 256 174 258 174 262 Z" fill="url(#titanBright)" />
      <path d="M182 256 H218 L212 214 C211 210 209 208 205 208 H195 C191 208 189 210 188 214 Z" fill="url(#titan)" />
      <line x1="185" x2="215" y1="236" y2="236" stroke="#2c3231" strokeOpacity=".35" />
      <line x1="186" x2="214" y1="226" y2="226" stroke="#2c3231" strokeOpacity=".3" />
      <ellipse cx="200" cy="209" rx="6.5" ry="1.8" fill="#151918" />
      <path d="M174 262 H226" stroke="#fff" strokeOpacity=".35" />
    </g>
  )
}

const GUM_TOP =
  'M0 246 C20 248 50 255 72 255 C100 255 124 245 137 237 C150 245 172 255 200 255 C228 255 250 245 263 237 C276 245 300 255 328 255 C350 255 380 248 400 246'

function ImplantSVG({ progress, label }) {
  const crownY = useTransform(progress, [0.58, 0.86], [-190, 0])
  const crownOpacity = useTransform(progress, [0.58, 0.66], [0, 1])
  const abutY = useTransform(progress, [0.42, 0.62], [-130, 0])
  const abutOpacity = useTransform(progress, [0.42, 0.5], [0, 1])
  const fixY = useTransform(progress, [0.24, 0.46], [-200, 0])
  const fixOpacity = useTransform(progress, [0.24, 0.32], [0, 1])
  const scanY = useTransform(progress, [0, 0.24], [120, 500])
  const scanOpacity = useTransform(progress, [0, 0.03, 0.2, 0.25], [0, 1, 1, 0])
  const xray = useTransform(progress, [0, 0.04, 0.22, 0.3], [0, 0.5, 0.5, 0])
  const planOpacity = useTransform(progress, [0.16, 0.24, 0.44, 0.52], [0, 1, 1, 0])
  const glow = useTransform(progress, [0.84, 1], [0, 1])

  return (
    <svg
      viewBox="0 0 400 520"
      className="h-full w-auto"
      role="img"
      aria-label={label}
      style={{
        maskImage: 'radial-gradient(ellipse 50% 50% at 50% 46%, #000 62%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 46%, #000 62%, transparent 100%)',
      }}
    >
      <defs>
        <linearGradient id="titan" x1="0" x2="1">
          <stop offset="0" stopColor="#2b3130" />
          <stop offset=".18" stopColor="#6b7371" />
          <stop offset=".36" stopColor="#c9cecd" />
          <stop offset=".47" stopColor="#f6f8f7" />
          <stop offset=".58" stopColor="#b2b8b6" />
          <stop offset=".82" stopColor="#575e5d" />
          <stop offset="1" stopColor="#252b2a" />
        </linearGradient>
        <linearGradient id="titanBright" x1="0" x2="1">
          <stop offset="0" stopColor="#4a5150" />
          <stop offset=".35" stopColor="#e2e6e5" />
          <stop offset=".5" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#c3c8c7" />
          <stop offset="1" stopColor="#3d4342" />
        </linearGradient>
        <linearGradient id="fin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9eceb" />
          <stop offset=".5" stopColor="#8e9593" />
          <stop offset="1" stopColor="#2c3231" />
        </linearGradient>
        <linearGradient id="enamel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf9f4" />
          <stop offset=".55" stopColor="#f1e9da" />
          <stop offset="1" stopColor="#dccab0" />
        </linearGradient>
        <linearGradient id="enamelSide" x1="0" x2="1">
          <stop offset="0" stopColor="#5a4628" stopOpacity=".42" />
          <stop offset=".2" stopColor="#5a4628" stopOpacity="0" />
          <stop offset=".75" stopColor="#5a4628" stopOpacity="0" />
          <stop offset="1" stopColor="#5a4628" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="enamelTip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b8c6cf" stopOpacity=".55" />
          <stop offset=".16" stopColor="#b8c6cf" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="root" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9dcc0" />
          <stop offset="1" stopColor="#c9b28a" />
        </linearGradient>
        <linearGradient id="gum" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e7aea8" />
          <stop offset=".3" stopColor="#c98480" />
          <stop offset="1" stopColor="#93524f" />
        </linearGradient>
        <linearGradient id="bone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfb08c" />
          <stop offset=".5" stopColor="#8d7f62" />
          <stop offset="1" stopColor="#4a4233" />
        </linearGradient>
        <radialGradient id="fadeR" cx=".5" cy=".48" r=".5">
          <stop offset=".4" stopColor="#fff" />
          <stop offset="1" stopColor="#000" />
        </radialGradient>
        <mask id="fade" maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="520">
          <rect width="400" height="520" fill="url(#fadeR)" />
        </mask>
        <linearGradient id="scanfade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b9d4f7" stopOpacity="0" />
          <stop offset="1" stopColor="#b9d4f7" stopOpacity=".3" />
        </linearGradient>
        <radialGradient id="glowR">
          <stop offset="0" stopColor="#b9d4f7" stopOpacity=".2" />
          <stop offset="1" stopColor="#b9d4f7" stopOpacity="0" />
        </radialGradient>
        <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
        <filter id="crownShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#000" floodOpacity=".45" />
        </filter>
      </defs>

      <motion.circle cx="200" cy="200" r="190" fill="url(#glowR)" style={{ opacity: glow }} />

      <g mask="url(#fade)">
        {/* hueso en corte */}
        <path d="M0 284 C60 278 120 286 200 282 C280 278 340 286 400 282 L400 520 L0 520 Z" fill="url(#bone)" />
        {trabeculae.map((b, i) => (
          <ellipse key={i} cx={b.cx} cy={b.cy} rx={b.rx} ry={b.ry} transform={`rotate(${b.rot} ${b.cx} ${b.cy})`} fill="#e9dec4" opacity={b.o * 0.45} />
        ))}
        <path d="M0 284 C60 278 120 286 200 282 C280 278 340 286 400 282" fill="none" stroke="#f3ead6" strokeWidth="4" strokeOpacity=".8" />

        <NaturalTooth x={-128} />
        <NaturalTooth x={128} />

        <motion.g style={{ y: fixY, opacity: fixOpacity }}>
          <Fixture />
        </motion.g>

        {/* encía */}
        <path d={`${GUM_TOP} L400 292 C300 286 100 286 0 292 Z`} fill="url(#gum)" />
        <path d={GUM_TOP} fill="none" stroke="#f5c9c3" strokeOpacity=".6" strokeWidth="1.5" />

        {/* modo radiografía durante el escaneo */}
        <motion.rect x="0" y="0" width="400" height="520" fill="#0c1626" style={{ opacity: xray }} />
      </g>

      {/* planificación 3D */}
      <motion.g style={{ opacity: planOpacity }} fontFamily="Poppins, sans-serif" fontSize="10" letterSpacing="1">
        <path
          d="M177 282 H223 L218 440 C216 452 208 462 200 462 C192 462 184 452 182 440 Z"
          fill="#b9d4f7"
          fillOpacity=".08"
          stroke="#b9d4f7"
          strokeDasharray="4 4"
        />
        <line x1="200" y1="190" x2="200" y2="490" stroke="#b9d4f7" strokeDasharray="2 6" />
        <line x1="236" y1="282" x2="252" y2="282" stroke="#b9d4f7" />
        <line x1="236" y1="462" x2="252" y2="462" stroke="#b9d4f7" />
        <line x1="246" y1="282" x2="246" y2="462" stroke="#b9d4f7" />
        <text x="256" y="376" fill="#b9d4f7">13 mm</text>
        <line x1="177" y1="300" x2="223" y2="300" stroke="#b9d4f7" />
        <text x="130" y="304" fill="#b9d4f7">Ø 4.1</text>
      </motion.g>

      <motion.g style={{ y: abutY, opacity: abutOpacity }}>
        <Abutment />
      </motion.g>
      <motion.g style={{ y: crownY, opacity: crownOpacity }}>
        <Crown />
      </motion.g>

      {/* línea de escaneo */}
      <motion.g style={{ y: scanY, opacity: scanOpacity }}>
        <rect x="20" y="-1" width="360" height="2" fill="#b9d4f7" />
        <rect x="20" y="-36" width="360" height="36" fill="url(#scanfade)" />
      </motion.g>
    </svg>
  )
}

export function Method() {
  const t = useT()
  const m = t.method
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const [step, setStep] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStep(Math.min(3, Math.floor(v * 4.2))))
  const bar = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const head = (
    <>
      <Eyebrow light>{m.eyebrow}</Eyebrow>
      <h2 className="display mt-5 text-[clamp(1.8rem,min(3.4vw,6vh),2.9rem)]">
        {m.title} <em className="!text-brand-soft">{m.titleEm}</em>
      </h2>
    </>
  )

  if (reduce) {
    return (
      <section id="metodo" className="bg-ink py-28 text-white">
        <div className="container-x">
          {head}
          <ol className="mt-14 grid gap-10 md:grid-cols-2">
            {m.steps.map((s) => (
              <li key={s.k}>
                <span className="text-sm text-white/50">{s.k}</span>
                <h3 className="display mt-2 text-2xl">{s.title}</h3>
                <p className="mt-3 text-white/65">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    )
  }

  return (
    <section id="metodo" ref={ref} className="relative h-[380vh] bg-ink text-white">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden pt-24 pb-24 lg:pb-10">
        <div className="container-x grid flex-1 gap-6 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            {head}
            <div className="relative mt-[4vh] hidden lg:block">
              <ol className="grid gap-1">
                {m.steps.map((s, i) => (
                  <li key={s.k} className={`transition-opacity duration-500 ${i === step ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="flex items-baseline gap-5 py-[1.2vh]">
                      <span className="text-sm tabular-nums text-white/50">{s.k}</span>
                      <div>
                        <h3 className="display text-[clamp(1.15rem,2.6vh,1.4rem)]">{s.title}</h3>
                        <AnimatePresence initial={false}>
                          {i === step && (
                            <motion.p
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease }}
                              className="max-w-md overflow-hidden text-white/65"
                            >
                              <span className="block pt-2">{s.text}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center lg:col-span-6 lg:col-start-7 lg:h-[76svh]">
            <div className="relative h-[44svh] lg:h-full">
              <ImplantSVG progress={scrollYProgress} label={m.svgLabel} />
            </div>
          </div>

          <div className="lg:hidden" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <span className="text-sm text-white/50">{m.steps[step].k} / 04</span>
                <h3 className="display mt-1 text-xl">{m.steps[step].title}</h3>
                <p className="mt-2 text-[0.95rem] text-white/65">{m.steps[step].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="container-x mt-6">
          <div className="h-px w-full bg-white/10">
            <motion.div style={{ width: bar }} className="h-full bg-brand-soft" />
          </div>
        </div>
      </div>
    </section>
  )
}
