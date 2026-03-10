import { defineField, defineType } from 'sanity'
import { MdStore } from "react-icons/md";

export const storeType = defineType({
  name: 'store',
  title: 'Petco Locations',
  type: 'document',
  icon: MdStore,
  fields: [
    defineField({
      name: 'name',
      title: 'Store Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Petco San Francisco (Market St)',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Full Address',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Geographic Location',
      type: 'geopoint',
      description: 'Used for store locators on maps.',
    }),
    defineField({
      name: 'hours',
      title: 'Operating Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', type: 'string', title: 'Day(s)' },
            { name: 'time', type: 'string', title: 'Hours (e.g. 9am - 9pm)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'servicesAvailable',
      title: 'Services at this Store',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Link to services offered at this physical location.',
    }),
    defineField({
      name: 'isPharmacy',
      title: 'Has Pharmacy',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
