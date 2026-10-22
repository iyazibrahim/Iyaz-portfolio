'use client'

import { useEffect, useId, useState } from 'react'

import { useTheme } from '@/components/ThemeProvider'

type MermaidDiagramProps = {
  chart: string
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const { theme } = useTheme()
  const diagramId = `mermaid-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const [svg, setSvg] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function renderDiagram() {
      try {
        const mermaid = (await import('mermaid')).default
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: 'strict',
          suppressErrorRendering: true,
          theme: isDark ? 'dark' : 'neutral',
          fontFamily: 'Plus Jakarta Sans, sans-serif',
        })
        const { svg: nextSvg } = await mermaid.render(diagramId, chart)
        if (!cancelled) {
          setSvg(nextSvg)
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setSvg('')
          setError(err instanceof Error ? err.message : 'Could not render this diagram.')
        }
      }
    }

    void renderDiagram()

    return () => {
      cancelled = true
    }
  }, [chart, diagramId, theme])

  if (error) {
    return (
      <figure className="blog-code">
        <figcaption>Mermaid</figcaption>
        <pre>
          <code>{chart}</code>
        </pre>
        <p className="blog-mermaid-error">{error}</p>
      </figure>
    )
  }

  if (!svg) {
    return (
      <figure className="blog-code" aria-busy="true">
        <figcaption>Diagram</figcaption>
        <pre>
          <code>{chart}</code>
        </pre>
      </figure>
    )
  }

  return (
    <figure className="blog-mermaid" aria-label="Flowchart">
      <div dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  )
}
