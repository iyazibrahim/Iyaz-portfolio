'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'
import { useLightMotion } from '@/lib/useMediaQuery'

type Metric = {
  id: string
  label: string
  value: string
  description: string
}

function MetricValue({ value, active }: { value: string; active: boolean }) {
  const reduceMotion = useReducedMotion()
  const lightMotion = useLightMotion()
  const numeric = Number(value.replace(/[^\d.]/g, ''))
  const prefix = value.startsWith('~') ? '~' : ''
  const suffix = value.replace(/[~0-9.]/g, '')
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (!active || reduceMotion || lightMotion || Number.isNaN(numeric)) {
      setDisplay(value)
      return
    }

    let frame = 0
    const totalFrames = 30
    const timer = window.setInterval(() => {
      frame += 1
      const progress = frame / totalFrames
      const current = Math.round(numeric * progress)
      setDisplay(`${prefix}${current}${suffix}`)
      if (frame >= totalFrames) window.clearInterval(timer)
    }, 24)

    return () => window.clearInterval(timer)
  }, [active, lightMotion, numeric, prefix, reduceMotion, suffix, value])

  return <span>{display}</span>
}

export function ImpactMetrics({ metrics }: { metrics: Metric[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const lightMotion = useLightMotion()

  return (
    <section className="apple-section" aria-labelledby="impact-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Impact"
            title="By the numbers"
            id="impact-heading"
          />
        </Reveal>

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => {
            const card = (
              <>
                <p className="text-4xl font-semibold md:text-5xl">
                  <MetricValue value={metric.value} active={inView} />
                </p>
                <h3 className="mt-3 text-lg font-medium">{metric.label}</h3>
                <p className="mt-2 text-sm text-muted">{metric.description}</p>
              </>
            )

            if (lightMotion) {
              return (
                <div key={metric.id} className="surface-card p-6 text-center">
                  {card}
                </div>
              )
            }

            return (
              <motion.div
                key={metric.id}
                className="surface-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.08, duration: 0.45 }}
              >
                {card}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
