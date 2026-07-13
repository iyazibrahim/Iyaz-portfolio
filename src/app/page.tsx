import type { Metadata } from 'next'

import { About } from '@/components/About'
import { BlogTeaser } from '@/components/blog/BlogTeaser'
import { BuildPortfolio } from '@/components/BuildPortfolio'
import { CapabilityMap } from '@/components/CapabilityMap'
import { CertificationCarousel } from '@/components/CertificationCarousel'
import { ContactForm } from '@/components/ContactForm'
import { EducationSection } from '@/components/EducationSection'
import { ExperienceTimeline } from '@/components/ExperienceTimeline'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { ImpactMetrics } from '@/components/ImpactMetrics'
import { InfrastructureDelivered } from '@/components/InfrastructureDelivered'
import { Navbar } from '@/components/Navbar'
import { PersonJsonLd } from '@/components/PersonJsonLd'
import { Philosophy } from '@/components/Philosophy'
import { TechnicalStack } from '@/components/TechnicalStack'
import type { MapLocation } from '@/components/PenangLocationMap'
import { getSiteData } from '@/lib/payload'
import { getLatestPosts } from '@/lib/blog'
import { isBuildProject, isDeliveryProject, type ProjectListItem } from '@/lib/projects'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { siteSettings } = await getSiteData()
    return {
      title: siteSettings.seoTitle,
      description: siteSettings.seoDescription,
      openGraph: {
        title: siteSettings.seoTitle,
        description: siteSettings.seoDescription,
        type: 'website',
        locale: 'en_MY',
      },
    }
  } catch {
    return {
      title: 'Iyaz Ibrahim | System Engineer',
      description:
        'Infrastructure-focused System Engineer with DevOps capability across networking, cloud, Microsoft 365, cybersecurity, monitoring, and internal platforms.',
    }
  }
}

function getResumeUrl(resumePdf: unknown): string | null {
  if (!resumePdf || typeof resumePdf !== 'object') return null
  const media = resumePdf as { url?: string | null }
  return media.url || null
}

export default async function HomePage() {
  const [data, latestPosts] = await Promise.all([getSiteData(), getLatestPosts(3)])
  const settings = data.siteSettings
  const resumeUrl = getResumeUrl(settings.resumePdf)
  const projects = data.projects as ProjectListItem[]

  const buildProjects = projects.filter(isBuildProject).sort((a, b) => a.sort - b.sort)
  const deliveryProjects = projects.filter(isDeliveryProject).sort((a, b) => a.sort - b.sort)

  const aboutParagraphs =
    (settings.aboutParagraphs as { text: string }[] | undefined)?.length
      ? (settings.aboutParagraphs as { text: string }[])
      : [{ text: settings.profileSummary }]

  const currentlyExploring =
    (settings.currentlyExploring as { text: string }[] | undefined) || []

  const locations = ((settings.locations as MapLocation[] | undefined) || []).filter(
    (loc) => loc.name && loc.lat && loc.lng,
  )

  const tagline =
    (settings.tagline as string | undefined) || settings.supportingStatement

  return (
    <>
      <PersonJsonLd
        name={settings.name}
        roleLine={settings.roleLine}
        email={settings.email}
        linkedin={settings.linkedin}
        github={settings.github}
        location={settings.location}
        description={settings.seoDescription}
      />
      <Navbar resumeUrl={resumeUrl} />
      <main>
        <Hero
          name={settings.name}
          roleLine={settings.roleLine}
          tagline={tagline}
          availability={settings.availability}
          resumeUrl={resumeUrl}
        />
        <About
          paragraphs={aboutParagraphs}
          exploring={currentlyExploring}
          locations={locations}
        />
        <ImpactMetrics metrics={data.metrics as never} />
        <CapabilityMap capabilities={data.capabilities as never} />
        <ExperienceTimeline experience={data.experience as never} />
        <BuildPortfolio projects={buildProjects} />
        <InfrastructureDelivered projects={deliveryProjects} />
        <BlogTeaser posts={latestPosts} />
        <CertificationCarousel certifications={data.certifications as never} />
        <EducationSection education={data.education as never} />
        <TechnicalStack categories={(settings.stackCategories || []) as never} />
        <Philosophy principles={(settings.principles || []) as never} />
        <ContactForm
          email={settings.email}
          linkedin={settings.linkedin}
          github={settings.github}
          location={settings.location}
          resumeUrl={resumeUrl}
        />
      </main>
      <Footer />
    </>
  )
}
