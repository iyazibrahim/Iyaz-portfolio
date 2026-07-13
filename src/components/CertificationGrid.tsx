import { BentoCard } from '@/components/BentoCard'
import { SectionHeader } from '@/components/SectionHeader'

const categoryLabels: Record<string, string> = {
  networking: 'Networking',
  cybersecurity: 'Cybersecurity',
  av: 'AV and Technical',
}

type Certification = {
  id: string
  title: string
  category: string
}

export function CertificationGrid({ certifications }: { certifications: Certification[] }) {
  const grouped = certifications.reduce<Record<string, Certification[]>>((acc, cert) => {
    const key = cert.category
    acc[key] = acc[key] || []
    acc[key].push(cert)
    return acc
  }, {})

  return (
    <section id="certifications" className="py-8 md:py-12" aria-labelledby="certifications-heading">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Certifications"
          title="Credentials across networking, security, and AV systems"
          id="certifications-heading"
        />

        <div className="bento-grid">
          {Object.entries(grouped).map(([category, items], index) => (
            <BentoCard key={category} span="4" variant={index === 0 ? 'accent' : index === 1 ? 'brown' : 'default'}>
              <h3 className="mb-4 text-lg text-secondary">{categoryLabels[category] || category}</h3>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_55%,var(--color-card))] px-4 py-3 text-sm"
                  >
                    {item.title}
                  </li>
                ))}
              </ul>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  )
}
