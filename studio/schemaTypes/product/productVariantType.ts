import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdOutlineLabel} from 'react-icons/md'
import {CombinationInput} from './CombinationInput'

export const productVariantType = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  icon: MdOutlineLabel,
  fields: [
    defineField({
      name: 'combination',
      title: 'Select Combination',
      type: 'string',
      description: 'Pick the specific combination of options for this variant (auto-generated from Product Options above).',
      components: {
        input: CombinationInput,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Variant Label (Optional)',
      type: 'string',
      description: 'Custom name for this variant. If empty, the combination above will be used.',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'If left empty, the base product price will be used.',
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number',
      description: 'Inventory for this specific variant.',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Variant Specific Images',
      type: 'array' as const,
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
        }),
      ],
    }),
  ],
  preview: {
    select: {
      combination: 'combination',
      name: 'name',
      price: 'price',
      stock: 'stock',
      media: 'images.0.asset',
    },
    prepare({combination, name, price, stock, media}) {
      const comboLabel = combination
        ? combination.replace(/-/g, ' / ').replace(/\b\w/g, (c: string) => c.toUpperCase())
        : 'No combination'
      return {
        title: name ? `${name} (${comboLabel})` : comboLabel,
        subtitle: `${price ? `₹${price}` : 'Base Price'} • Stock: ${stock ?? 0}`,
        media,
      }
    },
  },
})
