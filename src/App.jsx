import { MotionConfig, motion, useScroll, useSpring } from 'motion/react'
import { Clinics, Contact, Faq, Footer, MobileBar } from './components/Contact'
import { BeforeAfter, Doctor, Testimonials } from './components/Doctor'
import Header from './components/Header'
import Hero from './components/Hero'
import { LanguageProvider } from './i18n'
import { Method, Pains, Treatments } from './components/Treatments'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-brand" aria-hidden="true" />
}

export default function App() {
  return (
    <LanguageProvider>
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Header />
      <main id="main">
        <Hero />
        <Pains />
        <Treatments />
        <Method />
        <Doctor />
        <BeforeAfter />
        <Testimonials />
        <Clinics />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MobileBar />
    </MotionConfig>
    </LanguageProvider>
  )
}
