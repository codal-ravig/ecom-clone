import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaShoppingBasket} from 'react-icons/fa'

export const featuredProductsSection = defineType({
  name: 'featuredProductsSection',
  title: 'Featured Products',
  type: 'object',
  icon: FaShoppingBasket,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'product'}],
        }),
      ],
    }),
  ],
})
