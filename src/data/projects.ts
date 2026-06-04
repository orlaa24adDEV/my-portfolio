import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Proyecto Uno',
    description: 'Aplicación web full-stack construida con React y Node.js.',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    featured: true,
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
  },
  {
    id: 'project-2',
    title: 'Proyecto Dos',
    description: 'Plataforma de comercio electrónico mobile-first con actualizaciones en tiempo real.',
    technologies: ['Next.js', 'Tailwind CSS', 'Stripe', 'Supabase'],
    featured: true,
    liveUrl: 'https://example.com',
    repoUrl: 'https://github.com',
  },
  {
    id: 'project-3',
    title: 'Proyecto Tres',
    description: 'Herramienta CLI open-source para scaffolding de proyectos.',
    technologies: ['Node.js', 'TypeScript', 'Commander.js'],
    featured: false,
    repoUrl: 'https://github.com',
  },
]
