import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'

type BlogPostBodyProps = {
  content: unknown
}

const languageLabels: Record<string, string> = {
  bash: 'Bash',
  css: 'CSS',
  html: 'HTML',
  javascript: 'JavaScript',
  json: 'JSON',
  plaintext: 'Text',
  powershell: 'PowerShell',
  python: 'Python',
  shell: 'Shell',
  sql: 'SQL',
  typescript: 'TypeScript',
  yaml: 'YAML',
}

type CodeBlockFields = {
  code?: string | null
  language?: string | null
}

const blogConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    ...defaultConverters.blocks,
    Code: ({ node }: { node: { fields?: CodeBlockFields } }) => {
      const fields = node.fields ?? {}
      const code = fields.code ?? ''
      const language = fields.language || ''
      const label =
        language && language !== 'plaintext' ? languageLabels[language] || language : null

      return (
        <figure className="blog-code">
          {label ? <figcaption>{label}</figcaption> : null}
          <pre>
            <code>{code}</code>
          </pre>
        </figure>
      )
    },
  },
  table: ({ node, nodesToJSX }) => (
    <div className="lexical-table-container">
      <table>{nodesToJSX({ nodes: node.children })}</table>
    </div>
  ),
  tablecell: ({ node, nodesToJSX }) => {
    const headerState = typeof node.headerState === 'number' ? node.headerState : 0
    const Tag = headerState > 0 ? 'th' : 'td'
    const colSpan = node.colSpan && node.colSpan > 1 ? node.colSpan : undefined
    const rowSpan = node.rowSpan && node.rowSpan > 1 ? node.rowSpan : undefined

    return (
      <Tag colSpan={colSpan} rowSpan={rowSpan}>
        {nodesToJSX({ nodes: node.children })}
      </Tag>
    )
  },
  tablerow: ({ node, nodesToJSX }) => {
    const cells = node.children ?? []
    const isHeaderRow =
      cells.length > 0 &&
      cells.every(
        (cell: { headerState?: number }) =>
          typeof cell.headerState === 'number' && cell.headerState > 0,
      )

    return <tr data-header={isHeaderRow ? 'true' : undefined}>{nodesToJSX({ nodes: cells })}</tr>
  },
})

export function BlogPostBody({ content }: BlogPostBodyProps) {
  return <RichText className="blog-prose" converters={blogConverters} data={content as never} />
}
