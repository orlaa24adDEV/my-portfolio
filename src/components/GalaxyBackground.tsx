import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  size: number
  opacity: number
  speed: number
}

const STAR_COUNT = 400
const DEPTH = 1200
const FOV = 400
const DRIFT_SPEED = 0.15

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const cursorRef = useRef({ x: -9999, y: -9999 })
  const scrollRef = useRef(0)
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
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

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
      cursorRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleScroll = () => {
      scrollRef.current = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    }

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('scroll', handleScroll, { passive: true })

    const createStar = (): Star => ({
      x: (Math.random() - 0.5) * DEPTH * 2,
      y: ((Math.random() - 0.5) * DEPTH * 2),
      z: Math.random() * DEPTH,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.7 + 0.3,
      speed: DRIFT_SPEED * (Math.random() * 0.5 + 0.75),
    })

    starsRef.current = Array.from({ length: STAR_COUNT }, createStar)

    let animId: number
    const render = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x * 10
      const my = mouseRef.current.y * 10
      const scrollOffset = scrollRef.current * DEPTH * 0.2
      const cx = cursorRef.current.x
      const cy = cursorRef.current.y

      for (const star of starsRef.current) {
        star.z -= star.speed
        star.y += star.speed * 0.4

        if (star.z <= 0 || star.y > DEPTH) {
          Object.assign(star, createStar())
          star.z = DEPTH
          star.y = -DEPTH * Math.random()
          continue
        }

        const px = star.x + mx * (star.z / DEPTH)
        const py = star.y + my * (star.z / DEPTH)
        const pz = star.z + scrollOffset

        const scale = FOV / (FOV + pz)
        const sx = px * scale + w / 2
        const sy = py * scale + h / 2

        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) continue

        const dist = Math.hypot(sx - cx, sy - cy)
        const proximity = Math.max(0, 1 - dist / 200)

        const size = star.size * scale * (1 + proximity * 2)
        const alpha = Math.min(star.opacity * (1 - pz / DEPTH), 1)
        const glow = proximity > 0.5 ? (proximity - 0.5) * 2 : 0

        if (glow > 0) {
          const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 4)
          grad.addColorStop(0, `rgba(200, 220, 255, ${alpha * glow * 0.6})`)
          grad.addColorStop(1, 'rgba(200, 220, 255, 0)')
          ctx.beginPath()
          ctx.arc(sx, sy, size * 4, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * (1 + proximity * 1.5)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
    />
  )
}
