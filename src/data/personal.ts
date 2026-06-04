import type { PersonalInfo, NavLink, SocialLink } from '../types'

export const personalInfo: PersonalInfo = {
  name: 'Orlando Arambulo Diaz',
  title: 'Desarrollador Full-Stack',
  tagline: 'Apasionado por construir y crear aplicaciones web con la intencion de aprender y mejorar cada día.',
  bio: [
    'Soy Orlando, desarrollador Full-Stack orientado a construir aplicaciones web completas y escalables. Con React y Node.js como pilares de mi stack, he desarrollado proyectos propios que puedes encontrar en mi GitHub. Actualmente busco una oportunidad donde seguir creciendo, aportar desde el primer día y formar parte de un equipo con el que aprender.',
  ],
  email: 'orlaa24ad@pm.me',
  location: 'Elzach, Alemania / Málaga, España',
  resumeUrl: '/cv-orlando-es.pdf',
}

export const resumes: Record<string, string> = {
  es: '/cv-orlando-es.pdf',
  en: '/cv-orlando-en.pdf',
  de: '/cv-orlando-de.pdf',
}

export const navLinks: NavLink[] = [
  { label: 'Sobre Mí', href: '#about' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Habilidades', href: '#skills' },
  { label: 'Contacto', href: '#contact' },
]

export const socialLinks: SocialLink[] = [
  { platform: 'GitHub', url: 'https://github.com/orlaa24adDEV', icon: 'github' },
  { platform: 'LinkedIn', url: 'https://linkedin.com/in/orlaa24ad', icon: 'linkedin' },
]
