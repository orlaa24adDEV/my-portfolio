import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { personalInfo, socialLinks, resumes } from '../../data'

export function Contact() {
  const { t, i18n } = useTranslation()
  const formRef = useRef<HTMLFormElement>(null)
  const [sent, setSent] = useState(false)
  const [cvLang, setCvLang] = useState(i18n.language)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCvLang(i18n.language)
  }, [i18n.language])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey })
      .then(() => {
        setSent(true)
        formRef.current?.reset()
      })
      .catch((err) => {
        console.error('EmailJS error:', err)
        const msg = err?.text || err?.message || 'Error desconocido'
        alert(t('contact.error') + ' (' + msg + ')')
      })
  }

  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        {'<'}{t('contact.heading')}{' />'}
      </h2>

      <div className="flex flex-col md:flex-row gap-10 max-w-4xl w-full">
        <form ref={formRef} onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
          <input
            type="text"
            name="from_name"
            placeholder={t('contact.name')}
            required
            className="bg-transparent border border-primary/30 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-primary transition-colors"
          />
          <input
            type="email"
            name="reply_to"
            placeholder={t('contact.email')}
            required
            className="bg-transparent border border-primary/30 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-primary transition-colors"
          />
          <textarea
            name="message"
            placeholder={t('contact.message')}
            rows={5}
            required
            className="bg-transparent border border-primary/30 rounded-lg px-4 py-3 text-sm text-white outline-none focus:border-primary transition-colors resize-none"
          />
          <button
            type="submit"
            className="self-start border border-primary rounded-full px-6 py-2 text-sm hover:bg-primary/10 transition-colors disabled:opacity-40"
          >
            {sent ? t('contact.sent') : t('contact.send')}
          </button>
        </form>

        <div className="flex flex-col gap-4 w-full sm:min-w-[200px] sm:w-auto">
          <a
            href={`mailto:${personalInfo.email}`}
            className="border border-primary/30 rounded-lg px-5 py-3 text-sm hover:border-primary/60 transition-colors"
          >
            <span className="opacity-50 text-xs">Email</span>
            <p className="text-white">{personalInfo.email}</p>
          </a>
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/30 rounded-lg px-5 py-3 text-sm hover:border-primary/60 transition-colors"
            >
              <span className="opacity-50 text-xs">{link.platform}</span>
              <p className="text-white truncate">{link.url.replace('mailto:', '')}</p>
            </a>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-primary/20 text-center max-w-4xl w-full mt-10">
        <p className="text-sm opacity-60 mb-3">{t('contact.cvText')}</p>
        <div className="flex items-center justify-center gap-3">
          <div className="flex gap-1 border border-primary/30 rounded-full px-2 py-1">
            {[['es', 'ES'], ['en', 'EN'], ['de', 'DE']].map(([code, label]) => (
              <button
                key={code}
                onClick={() => setCvLang(code)}
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  cvLang === code
                    ? 'bg-primary/20 text-primary'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <a
            href={resumes[cvLang]}
            download
            className="inline-block border border-primary rounded-full px-8 py-3 text-base hover:bg-primary/10 transition-colors"
          >
            {t('contact.download')}
          </a>
        </div>
      </div>
    </section>
  )
}
