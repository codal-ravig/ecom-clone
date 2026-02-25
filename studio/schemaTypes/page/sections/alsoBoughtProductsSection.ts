import {defineField, defineType} from 'sanity'
import {FaShoppingCart} from 'react-icons/fa'

export const alsoBoughtProductsSection = defineType({
  name: 'alsoBoughtProductsSection',
  title: 'Customers Also Bought',
  type: 'object',
  icon: FaShoppingCart,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Customers Also Bought',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'The category to pull related purchases from.',
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
