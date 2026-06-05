import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { navLinks } from '../../data'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'

export function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-sm">
        <div className="flex items-center justify-between sm:justify-center h-16 px-4">
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menú"
          >
            <span className={`block w-6 h-0.5 bg-primary transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-primary transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-primary transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>

          <nav className="hidden sm:flex items-center justify-center gap-16">
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

          <div className="sm:hidden" />
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 sm:hidden flex flex-col items-center justify-center gap-8 bg-[#0a0a0f]">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-3xl text-primary"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-primary text-3xl transition-all duration-300 hover:drop-shadow-[0_0_6px_#ff4d4d] hover:brightness-125"
            >
              {t(`nav.${link.href.replace('#', '')}`)}
            </a>
          ))}
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </>
  )
}
