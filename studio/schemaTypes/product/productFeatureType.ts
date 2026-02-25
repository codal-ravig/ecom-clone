import {defineField, defineType} from 'sanity'

export const productFeatureType = defineType({
  name: 'productFeature',
  title: 'Product Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
    }),
  ],
})
