import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'
import { useEffect, useRef } from 'react'

export const ease = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 28, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Titular que entra línea a línea desde una máscara
export function MaskText({ lines, className, delay = 0, inView = true, as = 'h2' }) {
  const Tag = motion[as]
  const anim = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-10% 0px' } }
    : { initial: 'hidden', animate: 'show' }
  return (
    <Tag
      className={className}
      {...anim}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span
            className="block"
            variants={{ hidden: { y: '110%' }, show: { y: 0, transition: { duration: 1.05, ease } } }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
}

export function CountUp({ value, prefix = '', suffix = '', plain = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const mv = useMotionValue(plain ? value - 30 : 0)
  const text = useTransform(mv, (v) => {
    const n = Math.round(v)
    return prefix + (plain ? String(n) : n.toLocaleString('es-ES')) + suffix
  })

  useEffect(() => {
    if (!inView) return
    if (reduce) return mv.set(value)
    const controls = animate(mv, value, { duration: 1.8, ease })
    return () => controls.stop()
  }, [inView, reduce, mv, value])

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{prefix + value + suffix}</span>
      <motion.span aria-hidden="true">{text}</motion.span>
    </span>
  )
}

// Botón que sigue sutilmente al cursor
export function Magnetic({ children, strength = 0.25, className }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 })
  const y = useSpring(0, { stiffness: 200, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * strength)
    y.set((e.clientY - r.top - r.height / 2) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={className}>
      {children}
    </motion.div>
  )
}
