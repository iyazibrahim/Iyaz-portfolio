import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Identity',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'roleLine', type: 'text', required: true },
            { name: 'tagline', type: 'text', required: true, label: 'Tagline' },
            { name: 'supportingStatement', type: 'textarea', required: true },
            { name: 'valueProposition', type: 'textarea', required: true },
            { name: 'availability', type: 'text', required: true },
            { name: 'profileSummary', type: 'textarea', required: true },
            {
              name: 'aboutParagraphs',
              type: 'array',
              label: 'About paragraphs',
              fields: [{ name: 'text', type: 'textarea', required: true }],
            },
            {
              name: 'currentlyExploring',
              type: 'array',
              label: 'Currently exploring',
              fields: [{ name: 'text', type: 'text', required: true }],
            },
            {
              name: 'locations',
              type: 'array',
              label: 'Managed locations (map pins)',
              admin: {
                description: 'Locations shown on the Penang map in the About section.',
              },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'type', type: 'text', required: true, label: 'Location type' },
                { name: 'lat', type: 'number', required: true, label: 'Latitude' },
                { name: 'lng', type: 'number', required: true, label: 'Longitude' },
                { name: 'mapX', type: 'number', label: 'SVG fallback X (%)' },
                { name: 'mapY', type: 'number', label: 'SVG fallback Y (%)' },
              ],
            },
          ],
        },
        {
          label: 'Contact',
          fields: [
            { name: 'email', type: 'email', required: true },
            { name: 'phone', type: 'text' },
            { name: 'linkedin', type: 'text', required: true },
            { name: 'github', type: 'text', required: true },
            { name: 'location', type: 'text', required: true },
            {
              name: 'resumePdf',
              type: 'upload',
              relationTo: 'media',
              label: 'Resume PDF',
            },
          ],
        },
        {
          label: 'Philosophy',
          fields: [
            {
              name: 'principles',
              type: 'array',
              required: true,
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'description', type: 'textarea', required: true },
              ],
            },
          ],
        },
        {
          label: 'Technical Stack',
          fields: [
            {
              name: 'stackCategories',
              type: 'array',
              fields: [
                { name: 'category', type: 'text', required: true },
                {
                  name: 'items',
                  type: 'array',
                  fields: [{ name: 'name', type: 'text', required: true }],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'seoTitle', type: 'text', required: true },
            { name: 'seoDescription', type: 'textarea', required: true },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
      ],
    },
  ],
}
