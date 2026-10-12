import type { MapLocation } from '@/components/PenangLocationMap'
import { seedData } from '@/content/seed/data'

const canonicalPins = seedData.siteSettings.locations

function samePlace(current: string, canonical: string) {
  const a = current.toLowerCase()
  const b = canonical.toLowerCase()
  if (a === b) return true
  if (a.includes('digital penang') && b.includes('digital penang')) return true
  if (a.includes('butterworth') && b.includes('butterworth')) return true
  if (a.includes('batu maung') && b.includes('batu maung')) return true
  return false
}

export function withPinnedAddresses(locations: MapLocation[]) {
  return locations.map((location) => {
    const match = canonicalPins.find((pin) => samePlace(location.name, pin.name))
    if (!match) return location
    return {
      ...location,
      name: match.name,
      type: match.type,
      lat: match.lat,
      lng: match.lng,
    }
  })
}
