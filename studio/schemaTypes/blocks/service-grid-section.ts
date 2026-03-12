import {defineField, defineType} from 'sanity'
import {HeartIcon} from '@sanity/icons'

export const serviceGridSection = defineType({
  name: 'serviceGridSection',
  title: 'Services Grid Section',
  type: 'object',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Our Professional Pet Services',
    }),
    defineField({
      name: 'services',
      title: 'Services to Show',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'service'}]}],
      description: 'Choose which services to show in this grid.',
    }),
  ],
})
