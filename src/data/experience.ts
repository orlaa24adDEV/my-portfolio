import type { Experience } from '../types'

export const experiences: Experience[] = [
  {
    company: 'Nombre de la Empresa',
    role: 'Ingeniero de Software Senior',
    period: '2022 - Presente',
    description: 'Trabajando en aplicaciones web orientadas al cliente.',
    highlights: [
      'Lideré la migración de un código heredado a React + TypeScript',
      'Mejoré los Core Web Vitals en un 40%',
      'Mentoricé a 3 desarrolladores junior',
    ],
  },
  {
    company: 'Empresa Anterior',
    role: 'Ingeniero de Software',
    period: '2020 - 2022',
    description: 'Construcción y mantenimiento de herramientas internas y paneles.',
    highlights: [
      'Diseñé e implementé un panel de análisis en tiempo real',
      'Reduje el tiempo del pipeline de CI en un 60%',
    ],
  },
]
