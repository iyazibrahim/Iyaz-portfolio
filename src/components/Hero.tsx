'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { useLightMotion } from '@/lib/useMediaQuery'

type HeroProps = {
  name: string
  roleLine: string
  tagline: string
  availability: string
  resumeUrl?: string | null
}

export function Hero({ name, roleLine, tagline, availability, resumeUrl }: HeroProps) {
  const reduceMotion = useReducedMotion()
  const lightMotion = useLightMotion()
  const skipMotion = reduceMotion || lightMotion

  const content = (
    <>
      <p className="eyebrow mb-4">Hi, I&apos;m</p>
      <h1 className="text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.05] tracking-tight">
        {name}
      </h1>
      <p className="subhead mx-auto mt-4 max-w-2xl text-muted">{roleLine}</p>
      <p className="lead apple-narrow mt-6">{tagline}</p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a href="#about" className="btn-primary">
          About me
        </a>
        <a href="#built" className="btn-secondary">
          Things I&apos;ve built
        </a>
        {resumeUrl ? (
          <a href={resumeUrl} className="btn-secondary" download>
            Resume
          </a>
        ) : null}
      </div>

      <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-muted">
        <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" aria-hidden />
        {availability}
      </div>
    </>
  )

  return (
    <section
      id="overview"
      className="apple-section flex min-h-[85vh] items-center justify-center pt-24 text-center md:pt-32"
    >
      <div className="section-shell">
        {skipMotion ? (
          <div>{content}</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {content}
          </motion.div>
        )}
      </div>
    </section>
  )
}
