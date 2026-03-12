import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const textSection = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
