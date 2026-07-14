import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    // Self-hosted behind a reverse proxy: the Next.js image optimizer's
    // internal self-fetch to its own public domain fails (returns 400) for
    // Payload media served from /api/media/file/*. Serving images directly
    // (unoptimized) avoids the /_next/image round-trip and is fine for a
    // low-traffic portfolio. Media files are already reasonably sized.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default withPayload(nextConfig)
