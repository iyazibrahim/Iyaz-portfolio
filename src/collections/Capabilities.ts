import type { CollectionConfig } from 'payload'

export const Capabilities: CollectionConfig = {
  slug: 'capabilities',
  admin: {
    useAsTitle: 'group',
    defaultColumns: ['group', 'sort'],
  },
  fields: [
    {
      name: 'group',
      type: 'select',
      required: true,
      options: [
        { label: 'Infrastructure', value: 'infrastructure' },
        { label: 'DevOps and Monitoring', value: 'devops' },
        { label: 'Cloud and Platforms', value: 'cloud' },
        { label: 'Security', value: 'security' },
        { label: 'Development', value: 'development' },
      ],
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
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
