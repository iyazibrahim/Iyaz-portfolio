import { Reveal } from '@/components/Reveal'
import { SectionHeader } from '@/components/SectionHeader'

const groupLabels: Record<string, string> = {
  infrastructure: 'Infrastructure',
  devops: 'DevOps and Monitoring',
  cloud: 'Cloud and Platforms',
  security: 'Security',
  development: 'Development',
}

type Capability = {
  id: string
  group: string
  items?: { name: string; id?: string | null }[] | null
}

export function CapabilityMap({ capabilities }: { capabilities: Capability[] }) {
  return (
    <section id="skills" className="apple-section" aria-labelledby="capabilities-heading">
      <div className="section-shell">
        <Reveal>
          <SectionHeader
            eyebrow="Capabilities"
            title="What I work with"
            id="capabilities-heading"
          />
          <p className="lead apple-narrow -mt-6 mb-12 text-center">
            The areas I&apos;m hands-on in
          </p>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.id} delay={index * 0.05}>
              <article className="surface-card h-full p-6">
                <h3 className="mb-4 text-xl font-medium">
                  {groupLabels[capability.group] || capability.group}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {capability.items?.map((item) => (
                    <span key={item.id || item.name} className="tag">
                      {item.name}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
