/**
 * This script identifies and fixes documents missing _key properties in arrays.
 * Run: npx sanity@latest exec migrations/fix-missing-keys.ts --with-user-token
 */

import { createClient } from '@sanity/client'

const DRY_RUN = true // Set to false to apply changes

const client = createClient({
  projectId: 'i9lae4hh',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-24',
  token: process.env.SANITY_API_WRITE_TOKEN,
})

function randomKey() {
  return Math.random().toString(36).substring(2, 11)
}

// Recursive function to add keys to arrays
function addKeys(obj: any): { changed: boolean; data: any } {
  let changed = false
  
  if (Array.isArray(obj)) {
    obj.forEach((item) => {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        if (!item._key) {
          item._key = randomKey()
          changed = true
        }
        const childResult = addKeys(item)
        if (childResult.changed) changed = true
      }
    })
  } else if (obj && typeof obj === 'object') {
    Object.keys(obj).forEach((key) => {
      const childResult = addKeys(obj[key])
      if (childResult.changed) {
        obj[key] = childResult.data
        changed = true
      }
    })
  }
  
  return { changed, data: obj }
}

async function fixKeys() {
  console.log('Fetching all documents...')
  const docs = await client.fetch('*[_type != "system.list" && _type != "system.hierarchy"]')
  console.log(`Checking ${docs.length} documents...`)

  let fixedCount = 0

  for (const doc of docs) {
    const { changed, data } = addKeys(JSON.parse(JSON.stringify(doc)))

    if (changed) {
      fixedCount++
      if (DRY_RUN) {
        console.log(`[DRY RUN] Would fix keys in document: ${doc._id} (${doc._type})`)
      } else {
        await client.patch(doc._id).set(data).commit()
        console.log(`Fixed keys in document: ${doc._id}`)
      }
    }
  }

  console.log(`
Finished. Total documents needing fixes: ${fixedCount}`)
  if (DRY_RUN && fixedCount > 0) {
    console.log('Set DRY_RUN = false in the script to apply these changes.')
  }
}

fixKeys()
