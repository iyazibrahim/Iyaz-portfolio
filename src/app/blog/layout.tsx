import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Iyaz Ibrahim',
  description: 'Writing on infrastructure, operations, cloud administration, and engineering.',
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children
}
