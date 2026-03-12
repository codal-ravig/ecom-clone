import {defineField, defineType} from 'sanity'

export const categoryPromotionType = defineType({
  name: 'categoryPromotion',
  title: 'Category Promotion',
  type: 'object',
  fields: [
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      description: 'Select specific products for this section.',
    }),
    defineField({
      name: 'limit',
      title: 'Limit',
      type: 'number',
      initialValue: 8,
    }),
  ],
})
