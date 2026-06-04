import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { skills } from '../../data'
import { cn } from '../../utils'

const categoryPlanetColors: Record<string, string> = {
  frontend: 'border-primary/40 shadow-[0_0_20px_rgba(255,77,77,0.15)]',
  backend: 'border-primary/40 shadow-[0_0_20px_rgba(255,77,77,0.15)]',
  tools: 'border-primary/40 shadow-[0_0_20px_rgba(255,77,77,0.15)]',
  design: 'border-primary/40 shadow-[0_0_20px_rgba(255,77,77,0.15)]',
}

const grouped = skills.reduce(
  (acc, skill) => {
    (acc[skill.category] ??= []).push(skill)
    return acc
  },
  {} as Record<string, typeof skills>,
)

const categories = ['frontend', 'backend', 'tools', 'design'] as const
const allSkillsSorted = [...skills].sort((a, b) => b.level - a.level)
const FOV = 500
const MAX_Z = 800

interface TrailPoint {
  x: number
  y: number
  size: number
  alpha: number
}

const categoryLabels: Record<string, string> = {
  frontend: 'skills.frontend',
  backend: 'skills.backend',
  tools: 'skills.tools',
  design: 'skills.design',
}

export function Skills() {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [phase, setPhase] = useState<'idle' | 'flying' | 'landed'>('idle')
  const [landedSkills, setLandedSkills] = useState<Set<string>>(new Set())

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === 'idle') setPhase('flying')
      },
      { threshold: 0.3 },
    )
    observer.observe(section)
    return () => observer.disconnect()
  }, [phase])

  useEffect(() => {
    if (phase !== 'flying') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let paused = false
    let allLanded = false
    const speed = 8

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { paused = !entry.isIntersecting },
      { threshold: 0.3 },
    )
    visibilityObserver.observe(canvas)

    const getCardCenter = (category: string) => {
      const el = cardRefs.current[category]
      if (!el) return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      const rect = el.getBoundingClientRect()
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
    }

    interface Asteroid {
      skill: typeof allSkillsSorted[0]
      startX: number
      startY: number
      z: number
      rot: number
      trail: TrailPoint[]
      impacted: boolean
      impactTime: number
      impactX: number
      impactY: number
      done: boolean
    }

    const asteroids: Asteroid[] = allSkillsSorted.map((skill) => {
      const side = Math.floor(Math.random() * 4)
      const t = Math.random()
      let startX: number, startY: number
      if (side === 0) { startX = -100; startY = t * window.innerHeight }
      else if (side === 1) { startX = window.innerWidth + 100; startY = t * window.innerHeight }
      else if (side === 2) { startX = t * window.innerWidth; startY = -100 }
      else { startX = t * window.innerWidth; startY = window.innerHeight + 100 }

      return {
        skill,
        startX,
        startY,
        z: MAX_Z,
        rot: 0,
        trail: [],
        impacted: false,
        impactTime: 0,
        impactX: 0,
        impactY: 0,
        done: false,
      }
    })

    let animId: number

    const render = () => {
      if (paused) {
        animId = requestAnimationFrame(render)
        return
      }

      if (allLanded) {
        setPhase('landed')
        return
      }

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      let remaining = 0

      for (const a of asteroids) {
        if (a.done) continue
        remaining++

        const target = getCardCenter(a.skill.category)

        if (a.impacted) {
          a.impactTime += 0.06
          const p = Math.min(a.impactTime, 1)

          const ringRadius = 20 + 80 * p
          const ringAlpha = (1 - p) * 0.8
          ctx.beginPath()
          ctx.arc(a.impactX, a.impactY, ringRadius, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${ringAlpha})`
          ctx.lineWidth = 3 * (1 - p)
          ctx.stroke()

          const flash = ctx.createRadialGradient(a.impactX, a.impactY, 0, a.impactX, a.impactY, 60)
          flash.addColorStop(0, `rgba(255, 255, 255, ${(1 - p) * 0.6})`)
          flash.addColorStop(1, 'rgba(255, 255, 255, 0)')
          ctx.fillStyle = flash
          ctx.beginPath()
          ctx.arc(a.impactX, a.impactY, 60, 0, Math.PI * 2)
          ctx.fill()

          for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + p * 2
            const dist = 10 + 60 * p * (0.5 + Math.random() * 0.5)
            const px = a.impactX + Math.cos(angle) * dist
            const py = a.impactY + Math.sin(angle) * dist
            const pSize = 2 * (1 - p)
            ctx.beginPath()
            ctx.arc(px, py, pSize, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${(1 - p) * 0.5})`
            ctx.fill()
          }

          if (a.impactTime >= 1) {
            a.done = true
            setLandedSkills((prev) => new Set(prev).add(a.skill.name))
          }
          continue
        }

        a.z -= speed
        a.rot += 0.03

        const zProgress = 1 - a.z / MAX_Z
        const ease = 1 - Math.pow(1 - Math.min(zProgress, 1), 2)

        const sx = a.startX + (target.x - a.startX) * ease
        const sy = a.startY + (target.y - a.startY) * ease
        const scale = FOV / (FOV + a.z)
        const size = (12 + a.skill.level * 4) * scale
        const alpha = Math.min(1, Math.max(0, 1 - a.z / MAX_Z))

        a.trail.push({ x: sx, y: sy, size: size * 0.4, alpha })
        if (a.trail.length > 40) a.trail.shift()

        for (let i = 0; i < a.trail.length; i++) {
          const t = a.trail[i]
          const tAlpha = (i / a.trail.length) * t.alpha * 0.6
          ctx.beginPath()
          ctx.arc(t.x, t.y, t.size * (i / a.trail.length), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${tAlpha})`
          ctx.fill()
        }

        ctx.save()
        ctx.translate(sx, sy)
        ctx.scale(scale, scale)
        ctx.rotate(a.rot * 0.1)
        ctx.globalAlpha = alpha

        const starGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 4)
        starGlow.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.5})`)
        starGlow.addColorStop(0.6, `rgba(255, 255, 255, ${alpha * 0.1})`)
        starGlow.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = starGlow
        ctx.fillRect(-size * 4, -size * 4, size * 8, size * 8)

        ctx.beginPath()
        ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()

        ctx.restore()

        if (a.z <= 0) {
          a.z = 0
          a.impacted = true
          a.impactTime = 0
          a.impactX = target.x
          a.impactY = target.y
        }
      }

      if (remaining === 0) {
        allLanded = true
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      visibilityObserver.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [phase])

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-24"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative z-10">
        {'<'}{t('skills.heading')}{' />'}
      </h2>

      <canvas
        ref={canvasRef}
        className={cn(
          'fixed inset-0 w-full h-full transition-opacity duration-500 z-20 pointer-events-none',
          phase === 'landed' && 'opacity-0',
        )}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full relative z-10">
        {categories.map((cat) => {
          const catSkills = grouped[cat] ?? []
          return (
            <div
              key={cat}
              ref={(el) => { cardRefs.current[cat] = el }}
              className={cn(
                'border-2 rounded-2xl p-6 min-h-[180px] transition-all duration-500',
                categoryPlanetColors[cat],
                'bg-[#0a0a0f]/60 backdrop-blur-sm',
              )}
            >
              <h3 className="text-lg font-semibold mb-4 opacity-80">
                {t(categoryLabels[cat])}
              </h3>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className={cn(
                      'text-sm px-3 py-1 rounded-full border border-white/30 transition-all duration-500',
                      landedSkills.has(skill.name)
                        ? 'opacity-100 scale-100 text-white'
                        : 'opacity-0 scale-50',
                    )}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
