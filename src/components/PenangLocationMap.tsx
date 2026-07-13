'use client'

import { motion, useReducedMotion } from 'framer-motion'
import L from 'leaflet'
import { useEffect, useRef, useState } from 'react'

import { useTheme } from '@/components/ThemeProvider'

import 'leaflet/dist/leaflet.css'

export type MapLocation = {
  name: string
  type: string
  lat: number
  lng: number
  mapX?: number | null
  mapY?: number | null
}

type PenangLocationMapProps = {
  locations: MapLocation[]
}

const TILE_LAYERS = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
}

const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'

function createPin(active: boolean) {
  const size = active ? 20 : 14
  return L.divIcon({
    className: 'penang-pin',
    html: `<span class="penang-pin__dot${active ? ' penang-pin__dot--active' : ''}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

export function PenangLocationMap({ locations }: PenangLocationMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<L.Map | null>(null)
  const tileRef = useRef<L.TileLayer | null>(null)
  const markersRef = useRef<L.Marker[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const { theme } = useTheme()

  useEffect(() => {
    if (!mapRef.current || mapInstance.current || !locations.length) return

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: true,
    })

    tileRef.current = L.tileLayer(TILE_LAYERS[theme] || TILE_LAYERS.light, {
      attribution: TILE_ATTRIBUTION,
      maxZoom: 19,
    }).addTo(map)

    markersRef.current = locations.map((location, index) => {
      const marker = L.marker([location.lat, location.lng], {
        icon: createPin(index === 0),
      }).addTo(map)
      marker.bindPopup(
        `<span class="penang-popup__name">${location.name}</span><span class="penang-popup__type">${location.type}</span>`,
      )
      marker.on('click', () => setActiveIndex(index))
      return marker
    })

    const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]))
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 })

    mapInstance.current = map

    return () => {
      map.remove()
      mapInstance.current = null
      tileRef.current = null
      markersRef.current = []
    }
    // theme is read on init only; theme changes handled in a separate effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locations])

  useEffect(() => {
    if (!tileRef.current) return
    tileRef.current.setUrl(TILE_LAYERS[theme] || TILE_LAYERS.light)
  }, [theme])

  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      marker.setIcon(createPin(index === activeIndex))
    })
  }, [activeIndex])

  if (!locations.length) return null

  return (
    <div>
      <p className="eyebrow mb-4 text-center">Locations I support</p>
      <motion.div
        className="penang-map-frame overflow-hidden rounded-2xl border border-[var(--color-border)]"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
      >
        <div
          ref={mapRef}
          className="h-[320px] w-full md:h-[400px]"
          aria-label="Map of managed locations in Penang"
        />
      </motion.div>

      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {locations.map((location, index) => (
          <button
            key={location.name}
            type="button"
            className={`tag transition-all ${
              index === activeIndex
                ? 'border-[var(--color-accent)] bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)]'
                : ''
            }`}
            onClick={() => {
              setActiveIndex(index)
              mapInstance.current?.setView([location.lat, location.lng], 14, {
                animate: !reduceMotion,
              })
              markersRef.current[index]?.openPopup()
            }}
          >
            {location.name}
          </button>
        ))}
      </div>

      <p className="mt-5 text-center text-sm leading-7 text-muted">
        Network, ICT, installation, troubleshooting, vendor coordination, and cybersecurity best
        practices — with Zabbix monitoring for websites and office infrastructure, expanding across
        library sites.
      </p>
    </div>
  )
}
