type BlogPostingJsonLdProps = {
  title: string
  description: string
  slug: string
  publishedAt?: string | null
  coverImageUrl?: string | null
}

export function BlogPostingJsonLd({
  title,
  description,
  slug,
  publishedAt,
  coverImageUrl,
}: BlogPostingJsonLdProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: 'Iyaz Ibrahim',
    },
    datePublished: publishedAt || undefined,
    image: coverImageUrl || undefined,
    mainEntityOfPage: `${siteUrl}/blog/${slug}`,
    url: `${siteUrl}/blog/${slug}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
