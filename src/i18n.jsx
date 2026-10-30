import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import ca from './content/ca'
import de from './content/de'
import en from './content/en'
import es from './content/es'

const dictionaries = { es, ca, en, de }

export const languages = [
  { code: 'es', label: 'Español' },
  { code: 'ca', label: 'Català' },
  { code: 'en', label: 'English' },
  { code: 'de', label: 'Deutsch' },
]

const STORAGE_KEY = 'idb-lang'

function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl && dictionaries[fromUrl]) return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved && dictionaries[saved]) return saved
  } catch {
    // sin acceso a localStorage
  }
  const nav = (navigator.language || 'es').slice(0, 2).toLowerCase()
  return dictionaries[nav] ? nav : 'es'
}

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    const t = dictionaries[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      // sin acceso a localStorage
    }
    const url = new URL(window.location.href)
    if (lang === 'es') url.searchParams.delete('lang')
    else url.searchParams.set('lang', lang)
    window.history.replaceState(null, '', url)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: dictionaries[lang] }), [lang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

export function useT() {
  return useContext(LangContext).t
}
