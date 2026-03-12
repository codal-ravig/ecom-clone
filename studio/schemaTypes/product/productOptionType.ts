import {defineArrayMember, defineField, defineType} from 'sanity'
import {UlistIcon} from '@sanity/icons'

export const productOptionType = defineType({
  name: 'productOption',
  title: 'Product Option',
  type: 'object',
  icon: UlistIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Option Name',
      type: 'string',
      description: 'e.g. Color, Size, Material',
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array' as const,
      of: [defineArrayMember({type: 'string' as const})],
      description: 'e.g. Red, Blue, Green or S, M, L, XL',
    }),
  ],
})
