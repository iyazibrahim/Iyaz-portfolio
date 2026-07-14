import type { CollectionConfig } from 'payload'

export const CertificationCategories: CollectionConfig = {
  slug: 'certification-categories',
  labels: {
    singular: 'Certification Category',
    plural: 'Certification Categories',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
    description:
      'Reusable categories for certifications. Add one here (or via "Add New" on a certification) and it stays available in the dropdown.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
      label: 'Category name',
    },
  ],
}
