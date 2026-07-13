type PersonJsonLdProps = {
  name: string
  roleLine: string
  email: string
  linkedin: string
  github: string
  location: string
  description: string
}

export function PersonJsonLd({
  name,
  roleLine,
  email,
  linkedin,
  github,
  location,
  description,
}: PersonJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: roleLine,
    email,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: location,
      addressCountry: 'MY',
    },
    sameAs: [linkedin, github],
    description,
    knowsAbout: [
      'Infrastructure engineering',
      'Network engineering',
      'Microsoft 365',
      'Cloud administration',
      'DevOps',
      'Cybersecurity',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
