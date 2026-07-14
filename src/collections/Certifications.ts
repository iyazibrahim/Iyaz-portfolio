import type { CollectionConfig, CollectionSlug } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'sort'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'certification-categories' as CollectionSlug,
      required: true,
      admin: {
        description:
          'Pick an existing category, or click "Add New" to create one — new categories stay in the dropdown for next time.',
      },
    },
    {
      name: 'badgeImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Badge image',
      admin: {
        description: 'Certificate badge or logo (PNG, JPG, WebP).',
      },
    },
    {
      name: 'certificateFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Certificate file',
      admin: {
        description: 'Upload the certificate as an image or PDF.',
      },
    },
    {
      name: 'sort',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
