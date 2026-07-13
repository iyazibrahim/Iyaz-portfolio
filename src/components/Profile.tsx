import { BentoCard } from '@/components/BentoCard'
import { SectionHeader } from '@/components/SectionHeader'

type ProfileProps = {
  summary: string
}

export function Profile({ summary }: ProfileProps) {
  return (
    <section className="py-8 md:py-12" aria-labelledby="profile-heading">
      <div className="section-shell bento-grid">
        <BentoCard span="5" variant="brown">
          <SectionHeader
            eyebrow="Professional profile"
            title="Infrastructure ownership with DevOps execution"
            id="profile-heading"
            className="mb-0"
          />
        </BentoCard>
        <BentoCard span="7">
          <p className="text-lg leading-8 text-muted">{summary}</p>
        </BentoCard>
      </div>
    </section>
  )
}
