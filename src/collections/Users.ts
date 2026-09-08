import type { CollectionConfig } from 'payload'

/** 30 days. Default Payload JWT/cookie lifetime is 2 hours. */
const TOKEN_EXPIRATION_SECONDS = 60 * 60 * 24 * 30

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: TOKEN_EXPIRATION_SECONDS,
  },
  fields: [],
}
