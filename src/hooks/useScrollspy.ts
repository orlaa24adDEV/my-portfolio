import { useState, useEffect } from 'react'

export function useScrollspy(ids: string[], offset = 100) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + offset

      for (let i = ids.length - 1; i >= 0; i--) {
        const element = document.getElementById(ids[i])
        if (element && element.offsetTop <= scrollY) {
          setActiveId(ids[i])
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [ids, offset])

  return activeId
}
