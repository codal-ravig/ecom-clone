import {defineArrayMember, defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {CombinationInput} from './combination-input'

export const productVariantType = defineType({
  name: 'productVariant',
  title: 'Product Variant',
  type: 'object',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'combination',
      title: 'Select Combination',
      type: 'string',
      description:
        'Pick the specific combination of options for this variant (auto-generated from Product Options above).',
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
      name: 'compareAtPrice',
      title: 'Compare-at Price',
      type: 'number',
      description:
        'Original "was" price shown crossed out (e.g. $15.99 crossed out, sale price $10.39). Leave empty if no sale.',
      validation: (Rule) =>
        Rule.custom((compareAtPrice, context) => {
          const price = (context.parent as any)?.price
          if (compareAtPrice && price && compareAtPrice < price) {
            return 'Compare-at price must be greater than or equal to the sale price'
          }
          return true
        }),
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
      name: 'barcode',
      title: 'Barcode',
      type: 'string',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions & Weight',
      type: 'object',
      fields: [
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
        defineField({
          name: 'depthIn',
          title: 'Depth (inches)',
          type: 'number',
          description: 'Item depth in inches, e.g. 2',
        }),
      ],
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
    prepare({combination, name, price, stock, media}: any) {
      const comboLabel = combination
        ? (combination as string)
            .replace(/-/g, ' / ')
            .replace(/\b\w/g, (c: string) => c.toUpperCase())
        : 'No combination'
      return {
        title: name ? `${name} (${comboLabel})` : comboLabel,
        subtitle: `${price ? `₹${price}` : 'Base Price'} • Stock: ${stock ?? 0}`,
        media,
      }
    },
  },
})
