import {defineField, defineType} from 'sanity'
import {IconType} from 'react-icons'

interface ProductListOptions {
  name: string
  title: string
  icon: IconType
  defaultHeading: string
  categoryDescription: string
}

export const productListSectionFactory = (options: ProductListOptions) =>
  defineType({
    name: options.name,
    title: options.title,
    type: 'object',
    icon: options.icon,
    fields: [
      defineField({
        name: 'heading',
        title: 'Heading',
        type: 'string',
        initialValue: options.defaultHeading,
      }),
      defineField({
        name: 'category',
        title: 'Category',
        type: 'reference',
        to: [{type: 'category'}],
        description: options.categoryDescription,
      }),
      defineField({
        name: 'products',
        title: 'Products',
        type: 'array',
        of: [{type: 'reference', to: [{type: 'product'}]}],
        description: 'Optionally select specific products to show in this section (overrides automatic list).',
      }),
      defineField({
        name: 'limit',
        title: 'Limit',
        type: 'number',
        initialValue: 8,
        validation: (Rule) => Rule.min(1).max(20),
      }),
    ],
  })
