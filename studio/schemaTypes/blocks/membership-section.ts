import {defineField, defineType} from 'sanity'
import {CircleIcon} from '@sanity/icons'

export const membershipSection = defineType({
  name: 'membershipSection',
  title: 'Membership Promotion Section',
  type: 'object',
  icon: CircleIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Unlock More with Vital Care',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'tiers',
      title: 'Display Tiers',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'membership'}]}],
      description: 'Select the membership tiers to feature in this section.',
    }),
  ],
})
