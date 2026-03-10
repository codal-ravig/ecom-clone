import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaStar} from 'react-icons/fa'

export const reviewType = defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  icon: FaStar,
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
      },
    }),
    defineField({name: 'title', title: 'Title', type: 'string'}),
    defineField({name: 'description', title: 'Description', type: 'text', validation: (Rule) => Rule.min(10)}),
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
  preview: {
    select: {
      title: 'title',
      rating: 'rating',
      productName: 'product.name',
    },
    prepare({ title, rating, productName }) {
      return {
        title: `${'⭐'.repeat(rating || 0)} ${title || 'No Title'}`,
        subtitle: `For: ${productName || 'Unknown Product'}`,
      }
    },
  },
})
