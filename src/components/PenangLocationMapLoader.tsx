'use client'

import dynamic from 'next/dynamic'

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

export function PenangLocationMapLoader({ locations }: { locations: MapLocation[] }) {
  return <PenangLocationMap locations={locations} />
}
