'use client'

import { useEffect, useState } from 'react'

export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [query])

  return matches
}

/** Skip heavy scroll/motion animations on phones or when reduced motion is preferred. */
export function useLightMotion() {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const isMobile = useMediaQuery('(max-width: 767px)')
  return reducedMotion || isMobile
}

/** True for mouse/trackpad; false for touch-first devices. */
export function useFinePointer() {
  return useMediaQuery('(pointer: fine)')
}
