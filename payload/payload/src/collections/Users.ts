import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'audits',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}

export default Users
