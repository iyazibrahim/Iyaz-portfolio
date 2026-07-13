import { PenangLocationMap, type MapLocation } from '@/components/PenangLocationMap'
import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

type AboutProps = {
  paragraphs: { text: string }[]
  exploring: { text: string }[]
  locations: MapLocation[]
}

export function About({ paragraphs, exploring, locations }: AboutProps) {
  return (
    <section id="about" className="apple-section" aria-labelledby="about-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="A bit about me"
            title="How I think about the work"
            id="about-heading"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="apple-narrow space-y-6 text-center">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="lead text-[var(--color-fg)]">
                {paragraph.text}
              </p>
            ))}
          </div>
        </Reveal>

        {exploring.length > 0 ? (
          <Reveal delay={0.15}>
            <div className="mt-10 text-center">
              <p className="eyebrow mb-4">Currently exploring</p>
              <div className="flex flex-wrap justify-center gap-2">
                {exploring.map((item, index) => (
                  <span key={index} className="tag">
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}

        {locations.length > 0 ? (
          <Reveal delay={0.2}>
            <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8">
              <PenangLocationMap locations={locations} />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
