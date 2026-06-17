import { useTranslation } from 'react-i18next'
import { useGithubRepos } from '../../hooks/useGithubRepos'

export function Projects() {
  const { t } = useTranslation()
  const { projects, loading } = useGithubRepos('orlaa24adDEV')

  return (
    <section id="projects" className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
        {'<'}{t('projects.heading')}{' />'}
      </h2>

      {loading ? (
        <p className="opacity-60">{t('projects.loading')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {projects.map((project) => (
            <article
              key={project.id}
              className="border border-primary/20 rounded-lg p-6 flex flex-col gap-4 hover:border-primary/60 transition-colors"
            >
              <ul className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="text-xs px-2 py-1 border border-primary/30 rounded"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-3 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border border-primary rounded-full px-4 py-1.5 hover:bg-primary/10 transition-colors"
                  >
                    {t('projects.live')}
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm border border-primary/40 rounded-full px-4 py-1.5 hover:bg-primary/10 transition-colors"
                  >
                    {t('projects.source')}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
