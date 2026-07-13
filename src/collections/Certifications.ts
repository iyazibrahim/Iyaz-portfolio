import type { CollectionConfig } from 'payload'

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
      type: 'select',
      required: true,
      options: [
        { label: 'Networking', value: 'networking' },
        { label: 'Cybersecurity', value: 'cybersecurity' },
        { label: 'AV and Technical', value: 'av' },
      ],
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
