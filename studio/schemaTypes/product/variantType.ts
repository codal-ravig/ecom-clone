import {defineArrayMember, defineField, defineType} from 'sanity'

export const variantType = defineType({
  name: 'variant',
  title: 'Variant',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'key',
      title: 'Key',
      type: 'string',
      description: 'Machine readable key (size, color)',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        defineArrayMember({
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
        }),
      ],
    }),
  ],
})
