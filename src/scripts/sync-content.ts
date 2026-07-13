import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

import { seedData } from '../content/seed/data'

async function syncContent() {
  const payload = await getPayload({ config })

  await payload.updateGlobal({
    slug: 'site-settings',
    data: seedData.siteSettings,
  })
  console.log('Site settings synced.')

  const metrics = await payload.find({ collection: 'metrics', limit: 20 })
  for (const metric of metrics.docs) {
    const updated = seedData.metrics.find((item) => item.sort === metric.sort)
    if (!updated) continue
    await payload.update({
      collection: 'metrics',
      id: metric.id,
      data: updated,
    })
  }
  console.log('Metrics synced.')

  const capabilities = await payload.find({ collection: 'capabilities', limit: 20 })
  for (const capability of capabilities.docs) {
    const updated = seedData.capabilities.find((item) => item.group === capability.group)
    if (!updated) continue
    await payload.update({
      collection: 'capabilities',
      id: capability.id,
      data: updated as never,
    })
  }
  console.log('Capabilities synced.')

  const experience = await payload.find({
    collection: 'experience',
    where: { company: { equals: 'Digital Penang' } },
    limit: 1,
  })
  if (experience.docs[0]) {
    await payload.update({
      collection: 'experience',
      id: experience.docs[0].id,
      data: seedData.experience[0] as never,
    })
    console.log('Digital Penang experience synced.')
  }

  for (const project of seedData.projects) {
    const existing = await payload.find({
      collection: 'projects',
      where: { slug: { equals: project.slug } },
      limit: 1,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'projects',
        id: existing.docs[0].id,
        data: project as never,
      })
      console.log(`Updated project: ${project.slug}`)
      continue
    }

    await payload.create({
      collection: 'projects',
      data: project as never,
    })
    console.log(`Created project: ${project.slug}`)
  }

  console.log('Content sync complete.')
  process.exit(0)
}

syncContent().catch((error) => {
  console.error(error)
  process.exit(1)
})
