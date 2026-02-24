import {defineField, defineType} from 'sanity'
import {FaAlignLeft} from 'react-icons/fa'

export const textSection = defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  icon: FaAlignLeft,
  fields: [
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
