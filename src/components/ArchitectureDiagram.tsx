type DiagramType = 'none' | 'devops' | 'monitoring' | 'multisite' | 'zabbix'

export function ArchitectureDiagram({ type }: { type: DiagramType }) {
  if (type === 'none') return null

  const diagrams: Record<Exclude<DiagramType, 'none'>, { title: string; nodes: string[] }> = {
    devops: {
      title: 'DevOps deployment flow',
      nodes: ['GitHub', 'Self-hosted Runner', 'Docker Build', 'Staging', 'Dokploy Prod', 'Cloudflare Tunnel'],
    },
    monitoring: {
      title: 'Machine monitoring workflow',
      nodes: ['Machines', 'MQTT Broker', 'Python Processor', 'MySQL', 'Laravel Dashboard', 'IIS / Windows Server'],
    },
    zabbix: {
      title: 'Zabbix monitoring scope',
      nodes: ['Websites', 'Office Infra', 'Zabbix Server', 'Alerts', 'Library sites (rolling out)'],
    },
    multisite: {
      title: 'Locations I support',
      nodes: [
        'Main Office',
        'PDL 1',
        'PDL 2',
        'Butterworth Library',
        'Batu Maung Library',
        'Network & ICT',
        'Zabbix Monitoring',
      ],
    },
  }

  const diagram = diagrams[type]

  return (
    <div className="mt-5 rounded-2xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg)_65%,transparent)] p-4">
      <p className="eyebrow mb-4">{diagram.title}</p>
      <div className="flex flex-wrap items-center gap-2">
        {diagram.nodes.map((node, index) => (
          <div key={node} className="flex items-center gap-2">
            <span className="rounded-xl border border-[color-mix(in_srgb,var(--color-accent)_40%,var(--color-border))] bg-[var(--color-card)] px-3 py-2 text-xs">
              {node}
            </span>
            {index < diagram.nodes.length - 1 ? (
              <span className="text-accent" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}
