import { useTranslation } from 'react-i18next'
import { navLinks } from '../../data'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-sm">
      <nav className="flex items-center justify-center gap-x-4 gap-y-1 sm:gap-16 h-auto sm:h-16 px-4 py-3 sm:py-0 flex-wrap">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-primary text-base transition-all duration-300 hover:drop-shadow-[0_0_6px_#ff4d4d] hover:brightness-125"
          >
            {t(`nav.${link.href.replace('#', '')}`)}
          </a>
        ))}
        <LanguageSwitcher />
      </nav>
    </header>
  )
}
