import config from '@payload-config'
import { getPayload } from 'payload'

export async function getPayloadClient() {
  return getPayload({ config })
}

export async function getSiteData() {
  const payload = await getPayloadClient()

  const [
    siteSettings,
    metrics,
    experience,
    projects,
    education,
    certifications,
    capabilities,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings' }),
    payload.find({ collection: 'metrics', sort: 'sort', limit: 20 }),
    payload.find({ collection: 'experience', sort: 'sort', limit: 20 }),
    payload.find({ collection: 'projects', sort: 'sort', limit: 50, depth: 1 }),
    payload.find({ collection: 'education', sort: 'sort', limit: 10 }),
    payload.find({ collection: 'certifications', sort: 'sort', limit: 50, depth: 1 }),
    payload.find({ collection: 'capabilities', sort: 'sort', limit: 10 }),
  ])

  return {
    siteSettings,
    metrics: metrics.docs,
    experience: experience.docs,
    projects: projects.docs,
    education: education.docs,
    certifications: certifications.docs,
    capabilities: capabilities.docs,
  }
}
