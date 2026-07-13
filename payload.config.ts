import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Capabilities } from './src/collections/Capabilities'
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
  }),
  sharp,
})
