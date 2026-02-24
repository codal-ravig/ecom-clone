import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaNewspaper} from 'react-icons/fa'

export const featuredArticlesSection = defineType({
  name: 'featuredArticlesSection',
  title: 'Featured Articles',
  type: 'object',
  icon: FaNewspaper,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'article'}],
        }),
      ],
    }),
  ],
})
