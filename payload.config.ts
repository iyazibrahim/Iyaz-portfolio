import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Capabilities } from './src/collections/Capabilities'
import { CertificationCategories } from './src/collections/CertificationCategories'
import { Certifications } from './src/collections/Certifications'
import { ContactSubmissions } from './src/collections/ContactSubmissions'
import { Education } from './src/collections/Education'
import { Experience } from './src/collections/Experience'
import { Media } from './src/collections/Media'
import { Metrics } from './src/collections/Metrics'
import { Posts } from './src/collections/Posts'
import { Projects } from './src/collections/Projects'
import { Users } from './src/collections/Users'
import { SiteSettings } from './src/globals/SiteSettings'
import { migrations } from './src/migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Metrics,
    Experience,
    Projects,
    Posts,
    Education,
    Certifications,
    CertificationCategories,
    Capabilities,
    ContactSubmissions,
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    migrationDir: path.resolve(dirname, 'src/migrations'),
    // In production (NODE_ENV=production) Payload does not auto-create tables.
    // Passing prodMigrations makes the adapter run these migrations on boot so
    // the schema is created/updated automatically on every deploy.
    prodMigrations: migrations,
  }),
  sharp,
})
