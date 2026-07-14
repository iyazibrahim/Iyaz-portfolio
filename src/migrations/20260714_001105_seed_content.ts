import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

import { seedData } from '../content/seed/data'

// Data migration: populates the freshly-created schema with the resume content
// from src/content/seed/data.ts. Runs automatically after the schema migration
// on deploy (via prodMigrations), so production comes up fully populated.
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  // Only bootstrap an admin user when explicit credentials are provided via
  // env. Otherwise leave the users table empty so Payload shows the secure
  // "create first user" screen at /admin instead of a default password.
  const existingUsers = await payload.find({ collection: 'users', limit: 1, req })
  if (
    existingUsers.totalDocs === 0 &&
    process.env.ADMIN_EMAIL &&
    process.env.ADMIN_PASSWORD
  ) {
    await payload.create({
      collection: 'users',
      data: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      },
      req,
    })
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: seedData.siteSettings as never,
    req,
  })

  const collections = [
    { slug: 'metrics' as const, data: seedData.metrics },
    { slug: 'capabilities' as const, data: seedData.capabilities },
    { slug: 'experience' as const, data: seedData.experience },
    { slug: 'projects' as const, data: seedData.projects },
    { slug: 'education' as const, data: seedData.education },
    // Certifications are seeded in 20260714_030552_cert_category_relationship
    // after categories exist (category is now a relationship, not an enum).
  ]

  for (const collection of collections) {
    const existing = await payload.find({ collection: collection.slug, limit: 1, req })
    if (existing.totalDocs > 0) {
      continue
    }

    for (const item of collection.data) {
      await payload.create({
        collection: collection.slug,
        data: item as never,
        req,
      })
    }
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  const collections = [
    'metrics',
    'capabilities',
    'experience',
    'projects',
    'education',
    'certifications',
  ] as const

  for (const slug of collections) {
    await payload.delete({
      collection: slug,
      where: { id: { exists: true } },
      req,
    })
  }
}
