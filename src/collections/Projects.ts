import type { CollectionConfig } from 'payload'

const isBuild = (data: Record<string, unknown>) => data?.projectType === 'build'
const isDelivery = (data: Record<string, unknown>) =>
  !data?.projectType || data.projectType === 'delivery'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectType', 'featured', 'sort'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'projectType',
      type: 'select',
      required: true,
      defaultValue: 'delivery',
      options: [
        { label: 'Build (app / website)', value: 'build' },
        { label: 'Delivery (infrastructure / ops)', value: 'delivery' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Summary',
      admin: {
        condition: isBuild,
        description: 'Short blurb for homepage cards and project detail hero.',
      },
    },
    {
      name: 'longDescription',
      type: 'textarea',
      label: 'Long description',
      admin: {
        condition: isBuild,
        description: 'Fuller story for the project detail page.',
      },
    },
    {
      name: 'projectUrl',
      type: 'text',
      label: 'Live URL',
      admin: {
        condition: isBuild,
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      label: 'GitHub URL',
      admin: {
        condition: isBuild,
      },
    },
    {
      name: 'problem',
      type: 'textarea',
      admin: {
        condition: isDelivery,
      },
    },
    {
      name: 'solution',
      type: 'textarea',
      admin: {
        condition: isDelivery,
      },
    },
    {
      name: 'role',
      type: 'text',
      admin: {
        condition: isDelivery,
      },
    },
    {
      name: 'outcome',
      type: 'textarea',
      admin: {
        condition: isDelivery,
      },
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'architectureNotes',
      type: 'textarea',
      label: 'Architecture notes',
      admin: {
        condition: isDelivery,
      },
    },
    {
      name: 'diagramType',
      type: 'select',
      options: [
        { label: 'None', value: 'none' },
        { label: 'DevOps pipeline', value: 'devops' },
        { label: 'Machine monitoring', value: 'monitoring' },
        { label: 'Multi-site infrastructure', value: 'multisite' },
        { label: 'Zabbix monitoring', value: 'zabbix' },
      ],
      defaultValue: 'none',
      admin: {
        condition: isDelivery,
      },
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'gallery',
      type: 'array',
      admin: {
        condition: isBuild,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sort',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
