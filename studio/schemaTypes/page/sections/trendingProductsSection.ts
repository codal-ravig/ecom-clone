import {defineField, defineType} from 'sanity'
import {FaChartLine} from 'react-icons/fa'

export const trendingProductsSection = defineType({
  name: 'trendingProductsSection',
  title: 'Trending Products',
  type: 'object',
  icon: FaChartLine,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Trending Products',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'The category to pull trending products from. If empty, it might show global trending.',
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
