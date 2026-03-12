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
      type: 'reference' as const,
      to: [{type: 'brand'}],
    }),
    defineField({
      name: 'daysToShip',
      title: 'Days to Ship',
      description: 'e.g. enter 1 for "Ships Next Business Day"',
      type: 'number',
    }),
    defineField({
      name: 'lifestage',
      title: 'Lifestage',
      type: 'string',
      description: 'e.g. All Lifestages, Adult, Puppy, Senior',
    }),
    defineField({
      name: 'primaryFlavor',
      title: 'Primary Flavor',
      type: 'string',
      description: 'e.g. Bacon, Chicken, Beef',
    }),
  ],
})
