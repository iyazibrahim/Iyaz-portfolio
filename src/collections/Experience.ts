import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'startDate', 'sort'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'company',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'startDate',
      type: 'text',
      required: true,
    },
    {
      name: 'endDate',
      type: 'text',
      required: true,
    },
    {
      name: 'bullets',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'techTags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sort',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}
