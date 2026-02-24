import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaStar} from 'react-icons/fa'

export const reviewType = defineType({
  name: 'review',
  title: 'Review',
  type: 'object',
  icon: FaStar,
  fields: [
    defineField({
      name: 'review',
      title: 'Review (Star Rating)',
      type: 'number',
    }),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.min(50)}),
    defineField({name: 'nickname', title: 'Nickname', type: 'string'}),
    defineField({name: 'email', title: 'Email', type: 'email'}),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
        }),
      ],
    }),
    defineField({name: 'time', title: 'Time', type: 'datetime'}),
  ],
})
