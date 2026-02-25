import {defineField, defineType} from 'sanity'

export const variantValueType = defineType({
  name: 'variantValue',
  title: 'Variant Value',
  type: 'object',
  fields: [
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
    }),
  ],
})
