import { useState, useEffect } from 'react'
import type { Project } from '../types'

interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  topics: string[]
  language: string | null
  fork: boolean
}

export function useGithubRepos(username: string) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`)
      .then((res) => res.json())
      .then((data: GithubRepo[]) => {
        const techOverrides: Record<string, string[]> = {
          'find-your-pitch': ['React', 'TypeScript', 'Tailwind', 'HTML', 'Node.js', 'Express.js', 'Prisma ORM', 'PostgreSQL', 'Docker', 'Vite', 'Axios', 'JWT', 'Nodemailer', 'Vercel', 'Railway', 'GitHub Actions', 'Vitest', 'Jest+ts-test+supertest' ],
          'weather-app': ['React', 'TypeScript', 'Tailwind', 'HTML'],
          'my-portfolio': ['React', 'TypeScript', 'Tailwind', 'HTML'],
          'VisitasVirtuales': ['React', 'JavaScript', 'PostgreSQL', 'API Rest', 'Docker', 'Tailwind', 'HTML'],
          'docker-practica-api': ['Docker', 'JavaScript', 'Railway'],
        }

        const urlOverrides: Record<string, string> = {
          'VisitasVirtuales': 'https://visitasvirtuales.dedyn.io/',
        }

        const mapped: Project[] = data.map((r) => ({
            id: String(r.id),
            title: r.name,
            description: r.description ?? 'Sin descripción',
            technologies: techOverrides[r.name] ?? ([r.language, ...r.topics].filter(Boolean) as string[]),
            liveUrl: urlOverrides[r.name] ?? r.homepage ?? undefined,
            repoUrl: r.html_url,
            featured: true,
          }))

        mapped.unshift({
          id: '100-canios',
          title: '100-caños',
          description: 'Descubre 100 caños: Una experiencia de oleoturismo única en el corazón de Málaga',
          technologies: ['React', 'Tailwind', 'HTML', 'Nodemailer', 'Node.js', 'Express.js', 'i18next'],
          liveUrl: 'https://100canos.com/',
          featured: true,
        })

        setProjects(mapped)
      })
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }, [username])

  return { projects, loading }
}
