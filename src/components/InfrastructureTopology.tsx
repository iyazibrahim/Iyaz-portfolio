'use client'

import { motion, useReducedMotion } from 'framer-motion'

export function InfrastructureTopology() {
  const reduceMotion = useReducedMotion()

  const nodes = [
    { id: 'office', label: 'Main Office', x: 50, y: 90 },
    { id: 'sites', label: '3 External Sites', x: 190, y: 40 },
    { id: 'network', label: 'ICT / Network', x: 330, y: 120 },
    { id: 'm365', label: 'M365 Admin', x: 470, y: 50 },
    { id: 'zabbix', label: 'Zabbix', x: 610, y: 130 },
  ]

  const edges = [
    ['office', 'network'],
    ['sites', 'network'],
    ['network', 'm365'],
    ['network', 'zabbix'],
  ] as const

  const nodeMap = Object.fromEntries(nodes.map((node) => [node.id, node]))

  return (
    <div className="h-full rounded-2xl bg-[color-mix(in_srgb,var(--color-bg)_55%,transparent)] p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="eyebrow">Operations map</p>
        <span className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-xs text-muted">
          Multi-site monitoring planned
        </span>
      </div>
      <svg viewBox="0 0 760 220" className="h-auto w-full" role="img" aria-label="ICT and network operations map">
        {edges.map(([from, to], index) => {
          const start = nodeMap[from]
          const end = nodeMap[to]
          return (
            <g key={`${from}-${to}`}>
              <line
                x1={start.x + 55}
                y1={start.y + 16}
                x2={end.x}
                y2={end.y + 16}
                stroke="#854836"
                strokeOpacity="0.35"
                strokeWidth="1.5"
              />
              {!reduceMotion ? (
                <motion.circle
                  r="3"
                  fill="#FFB22C"
                  initial={{ cx: start.x + 55, cy: start.y + 16 }}
                  animate={{ cx: end.x, cy: end.y + 16 }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: index * 0.35,
                  }}
                />
              ) : null}
            </g>
          )
        })}
        {nodes.map((node) => (
          <g key={node.id}>
            <rect
              x={node.x}
              y={node.y}
              width={node.id === 'sites' ? 130 : 110}
              height="34"
              rx="10"
              fill="var(--color-card)"
              stroke="#FFB22C"
              strokeWidth="1.2"
            />
            <text
              x={node.x + (node.id === 'sites' ? 65 : 55)}
              y={node.y + 21}
              textAnchor="middle"
              fill="var(--color-fg)"
              fontSize="11"
              fontFamily="var(--font-body)"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-3 text-xs leading-6 text-muted">
        Office and site ICT/network operations are managed per location. Zabbix currently monitors websites and office infrastructure.
      </p>
    </div>
  )
}
