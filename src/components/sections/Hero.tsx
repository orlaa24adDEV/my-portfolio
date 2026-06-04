import { useTranslation } from 'react-i18next'
import { personalInfo } from '../../data'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 leading-tight">
        {personalInfo.name}
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl mb-2">
        {t('hero.title')}
      </p>
      <p className="text-sm sm:text-lg max-w-md opacity-80 px-2">
        {t('hero.tagline')}
      </p>
    </section>
  )
}
