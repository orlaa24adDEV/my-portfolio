import { useTranslation } from 'react-i18next'

export function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        {'<'}{t('about.heading')}{' />'}
      </h2>

      <div className="max-w-2xl w-full space-y-6 text-base md:text-lg leading-relaxed">
        <p className="opacity-90">{t('about.bio')}</p>

        <div className="pt-6 border-t border-primary/20">
          <p className="opacity-70 text-sm">
            <span className="opacity-50">📍</span> {t('about.location')}
          </p>
        </div>
      </div>
    </section>
  )
}
