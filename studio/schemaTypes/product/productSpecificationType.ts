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
    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'string',
      description: 'Product weight label, e.g. "16 OZ", "5 LB"',
    }),
    defineField({
      name: 'heightIn',
      title: 'Height (inches)',
      type: 'number',
      description: 'Item height in inches, e.g. 10.75',
    }),
    defineField({
      name: 'widthIn',
      title: 'Width (inches)',
      type: 'number',
      description: 'Item width in inches, e.g. 8',
    }),
  ],
})
