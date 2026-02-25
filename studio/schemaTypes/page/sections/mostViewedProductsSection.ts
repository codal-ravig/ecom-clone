import {defineField, defineType} from 'sanity'
import {FaEye} from 'react-icons/fa'

export const mostViewedProductsSection = defineType({
  name: 'mostViewedProductsSection',
  title: 'Most Viewed Products',
  type: 'object',
  icon: FaEye,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Most Viewed',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'The category to pull most viewed products from.',
    }),
    defineField({
        name: 'limit',
        title: 'Limit',
        type: 'number',
        initialValue: 8,
        validation: Rule => Rule.min(1).max(20)
    })
  ],
})
