'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

import type { MapLocation } from '@/components/PenangLocationMap'

const PenangLocationMap = dynamic(
  () => import('@/components/PenangLocationMap').then((mod) => mod.PenangLocationMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[320px] w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] md:h-[400px]"
        aria-hidden
      />
    ),
  },
)

const mapPlaceholder = (
  <div
    className="h-[320px] w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] md:h-[400px]"
    aria-hidden
  />
)

export function PenangLocationMapLoader({ locations }: { locations: MapLocation[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const node = containerRef.current
    if (!node || shouldLoad) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div ref={containerRef}>
      {shouldLoad ? <PenangLocationMap locations={locations} /> : mapPlaceholder}
    </div>
  )
}
