import 'dotenv/config'

import config from '@payload-config'
import { getPayload } from 'payload'

import { seedData } from '../content/seed/data'

async function seed() {
  const payload = await getPayload({ config })

  const existingUsers = await payload.find({
    collection: 'users',
    limit: 1,
  })

  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.ADMIN_EMAIL || 'iyazbrhm@gmail.com',
        password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
      },
    })
    console.log('Admin user created.')
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: seedData.siteSettings,
  })
  console.log('Site settings updated.')

  const collections = [
    { slug: 'metrics' as const, data: seedData.metrics },
    { slug: 'capabilities' as const, data: seedData.capabilities },
    { slug: 'experience' as const, data: seedData.experience },
    { slug: 'projects' as const, data: seedData.projects },
    { slug: 'education' as const, data: seedData.education },
    { slug: 'certifications' as const, data: seedData.certifications },
  ]

  for (const collection of collections) {
    const existing = await payload.find({
      collection: collection.slug,
      limit: 1,
    })

    if (existing.totalDocs > 0) {
      console.log(`Skipping ${collection.slug}; records already exist.`)
      continue
    }

    for (const item of collection.data) {
      await payload.create({
        collection: collection.slug,
        data: item as never,
      })
    }

    console.log(`Seeded ${collection.slug}.`)
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
