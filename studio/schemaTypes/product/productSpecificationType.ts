import {defineField, defineType} from 'sanity'

export const productSpecificationType = defineType({
  name: 'productSpecification',
  title: 'Product Specification',
  type: 'object',
  fields: [
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
    }),
    defineField({
      name: 'daysToShip',
      title: 'Days to Ship',
      type: 'number',
    }),
  ],
})
