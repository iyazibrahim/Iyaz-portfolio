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

  // Categories + certifications (relationship-based)
  const slugToName: Record<string, string> = {
    networking: 'Networking',
    cybersecurity: 'Cybersecurity',
    av: 'AV and Technical',
  }
  const defaultCategories = ['Networking', 'Cybersecurity', 'AV and Technical']

  for (const name of defaultCategories) {
    const existing = await payload.find({
      collection: 'certification-categories',
      where: { name: { equals: name } },
      limit: 1,
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'certification-categories',
        data: { name },
      })
    }
  }

  const categories = await payload.find({
    collection: 'certification-categories',
    limit: 50,
  })
  const byName = Object.fromEntries(
    categories.docs.map((c) => [c.name, c.id]),
  ) as Record<string, number>

  const existingCerts = await payload.find({ collection: 'certifications', limit: 1 })
  if (existingCerts.totalDocs === 0) {
    for (const item of seedData.certifications) {
      const name = slugToName[item.category] || item.category
      const categoryId = byName[name]
      if (!categoryId) continue
      await payload.create({
        collection: 'certifications',
        data: {
          title: item.title,
          category: categoryId,
          sort: item.sort,
        } as never,
      })
    }
    console.log('Seeded certifications.')
  } else {
    console.log('Skipping certifications; records already exist.')
  }

  console.log('Seed complete.')
  process.exit(0)
}

seed().catch((error) => {
  console.error(error)
  process.exit(1)
})
