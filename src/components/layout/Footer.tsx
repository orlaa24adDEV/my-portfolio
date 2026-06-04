import { useTranslation } from 'react-i18next'
import { personalInfo, socialLinks, navLinks } from '../../data'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-primary/20 px-4 py-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6 text-center">
        <nav className="flex gap-4 sm:gap-6 text-sm">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="opacity-60 hover:opacity-100 transition-opacity">
              {t(`nav.${link.href.replace('#', '')}`)}
            </a>
          ))}
        </nav>

        <div className="flex gap-4 text-sm">
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-60 hover:opacity-100 transition-opacity"
            >
              {link.platform}
            </a>
          ))}
        </div>

        <p className="text-xs opacity-40">
          &copy; {new Date().getFullYear()} {personalInfo.name}. {t('footer.copyright')}
        </p>
      </div>
    </footer>
  )
}
