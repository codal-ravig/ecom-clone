import {defineField, defineType} from 'sanity'
import {FaAward} from 'react-icons/fa'

export const bestSellersSection = defineType({
  name: 'bestSellersSection',
  title: 'Best Sellers',
  type: 'object',
  icon: FaAward,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Best Sellers',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'The category to pull best sellers from.',
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
