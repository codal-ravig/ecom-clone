/**
 * This migration script fetches users from dummyjson.com and imports them into Sanity.
 * To run this script:
 * 1. Ensure you have your Sanity project ID and token (with write access) set up.
 * 2. Run: `npx sanity@latest exec migrations/import-users.ts --with-user-token`
 */

import { createClient } from '@sanity/client'

// CHANGE TO FALSE TO ENABLE WRITES
const DRY_RUN = false 

// Initialize the client
const client = createClient({
  projectId: 'i9lae4hh',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-24',
  token: process.env.SANITY_API_WRITE_TOKEN,
})

// Utility function to generate a random key for array items
function randomKey() {
  return Math.random().toString(36).substring(2, 11)
}

async function uploadImage(imageUrl: string) {
  if (DRY_RUN) {
    console.log(`[DRY RUN] Would upload image from: ${imageUrl}`)
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-mock-id',
      },
    }
  }
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`)
    
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    const asset = await client.assets.upload('image', buffer, {
      filename: imageUrl.split('/').pop(),
    })
    return {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: asset._id,
      },
    }
  } catch (error) {
    console.error(`Failed to upload image from ${imageUrl}:`, error)
    return null
  }
}

async function importUsers() {
  console.log('--- STARTING IMPORT MIGRATION ---')
  if (DRY_RUN) console.log('--- RUNNING IN DRY RUN MODE (NO WRITES) ---')
  
  try {
    const response = await fetch('https://dummyjson.com/users')
    const data = await response.json()
    const users = data.users

    console.log(`Found ${users.length} users.`)

    for (const user of users) {
      let profileImage = null
      if (user.image) {
        profileImage = await uploadImage(user.image)
      }

      const userDoc = {
        _type: 'user',
        _id: `user-${user.id}`,
        title: `${user.firstName} ${user.lastName}`,
        designation: user.company?.title || 'Professional',
        summary: `A ${user.company?.title || 'professional'} working in ${user.company?.department || 'industry'}.`,
        profile: profileImage || undefined,
        biography: [
          {
            _type: 'block',
            _key: randomKey(), // REQUIRED for Sanity blocks
            children: [
              {
                _type: 'span',
                _key: randomKey(), // REQUIRED for block children
                text: `${user.firstName} ${user.lastName} is a ${user.age} year old ${user.gender} from ${user.address?.city}. They currently work at ${user.company?.name} as a ${user.company?.title}.`,
              },
            ],
            markDefs: [],
            style: 'normal',
          },
        ],
      }

      if (DRY_RUN) {
        console.log(`[DRY RUN] Would create doc for: ${user.firstName} ${user.lastName}`)
      } else {
        await client.createOrReplace(userDoc)
        console.log(`Successfully imported ${user.firstName}`)
      }
      
      if (DRY_RUN && users.indexOf(user) >= 1) {
        console.log('... stopping after 2 entries for preview ...')
        break
      }
    }

    console.log('Migration finished.')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

importUsers()
