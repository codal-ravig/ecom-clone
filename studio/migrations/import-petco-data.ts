import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'i9lae4hh',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-24',
  token: process.env.SANITY_API_WRITE_TOKEN,
})

async function importPetcoData() {
  console.log('--- STARTING PETCO DUMMY DATA IMPORT ---')

  try {
    // 1. IMPORT SERVICES
    const services = [
      {
        _id: 'service-grooming',
        _type: 'service',
        name: 'Full-Service Grooming',
        slug: { _type: 'slug', current: 'full-service-grooming' },
        shortDescription: 'Professional baths, haircuts, nail trimming, and more.',
        benefits: ['Certified Stylists', 'Bath & Haircut', 'Ear Cleaning', 'Nail Buffing'],
      },
      {
        _id: 'service-vet',
        _type: 'service',
        name: 'Veterinary Care',
        slug: { _type: 'slug', current: 'veterinary-care' },
        shortDescription: 'Full-service vet clinics and wellness centers.',
        benefits: ['Vaccinations', 'Wellness Exams', 'Microchipping', 'Pharmacy'],
      },
      {
        _id: 'service-training',
        _type: 'service',
        name: 'Dog Training',
        slug: { _type: 'slug', current: 'dog-training' },
        shortDescription: 'Positive reinforcement training for all life stages.',
        benefits: ['Puppy Essentials', 'Adult Basics', 'Private Lessons', 'AKC Canine Good Citizen'],
      }
    ]

    for (const service of services) {
      await client.createOrReplace(service)
      console.log(`Imported Service: ${service.name}`)
    }

    // 2. IMPORT MEMBERSHIPS
    const memberships = [
      {
        _id: 'membership-core',
        _type: 'membership',
        name: 'Vital Care Core',
        slug: { _type: 'slug', current: 'vital-care-core' },
        price: 0,
        ctaText: 'Join for Free',
        badgeColor: '#00205B',
        benefits: [
          { _key: 'b1', title: 'Points on Every Purchase', detail: 'Earn 1 point for every $1 spent.' },
          { _key: 'b2', title: 'Buy 7, Get 8th Free', detail: 'On bags of dry dog or cat food.' }
        ]
      },
      {
        _id: 'membership-premier',
        _type: 'membership',
        name: 'Vital Care Premier',
        slug: { _type: 'slug', current: 'vital-care-premier' },
        price: 19.99,
        ctaText: 'Upgrade to Premier',
        badgeColor: '#E11B22',
        benefits: [
          { _key: 'b1', title: '20% Off Grooming', detail: 'Every time you visit a stylist.' },
          { _key: 'b2', title: '10% Off All Nutrition', detail: 'Stackable with other offers.' },
          { _key: 'b3', title: '$15 Monthly Reward', detail: 'Spend it on anything in-store or online.' }
        ]
      }
    ]

    for (const membership of memberships) {
      await client.createOrReplace(membership)
      console.log(`Imported Membership: ${membership.name}`)
    }

    // 3. IMPORT BREEDS
    const breeds = [
      { _id: 'breed-golden', _type: 'breed', name: 'Golden Retriever', petType: 'dog', slug: { current: 'golden-retriever' } },
      { _id: 'breed-frenchie', _type: 'breed', name: 'French Bulldog', petType: 'dog', slug: { current: 'french-bulldog' } },
      { _id: 'breed-siamese', _type: 'breed', name: 'Siamese', petType: 'cat', slug: { current: 'siamese' } },
      { _id: 'breed-persian', _type: 'breed', name: 'Persian', petType: 'cat', slug: { current: 'persian' } },
      { _id: 'breed-betta', _type: 'breed', name: 'Betta Fish', petType: 'fish', slug: { current: 'betta-fish' } }
    ]

    for (const breed of breeds) {
      await client.createOrReplace(breed)
      console.log(`Imported Breed: ${breed.name}`)
    }

    // 4. IMPORT STORES
    const stores = [
      {
        _id: 'store-ny-unionsq',
        _type: 'store',
        name: 'Petco Union Square',
        slug: { current: 'petco-union-square' },
        address: '860 Broadway, New York, NY 10003',
        phone: '(212) 353-0435',
        isPharmacy: true,
        servicesAvailable: [
          { _type: 'reference', _ref: 'service-grooming', _key: 's1' },
          { _type: 'reference', _ref: 'service-vet', _key: 's2' }
        ],
        hours: [
          { _key: 'h1', day: 'Mon - Sat', time: '9:00 AM - 9:00 PM' },
          { _key: 'h2', day: 'Sun', time: '10:00 AM - 7:00 PM' }
        ]
      }
    ]

    for (const store of stores) {
      await client.createOrReplace(store)
      console.log(`Imported Store: ${store.name}`)
    }

    console.log('--- ALL PETCO DUMMY DATA IMPORTED SUCCESSFULLY ---')
  } catch (error) {
    console.error('Import failed:', error)
  }
}

importPetcoData()
