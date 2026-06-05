import { useTranslation } from 'react-i18next'

const languages = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div className="flex gap-1 border border-primary/30 rounded-full px-2 py-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => i18n.changeLanguage(lang.code)}
          className={`text-sm sm:text-xs px-2 py-0.5 rounded-full transition-colors ${
            i18n.language === lang.code
              ? 'bg-primary/20 text-primary'
              : 'opacity-60 hover:opacity-100'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  )
}
