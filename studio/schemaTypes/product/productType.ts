import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdOutlineProductionQuantityLimits} from 'react-icons/md'
export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: MdOutlineProductionQuantityLimits,
  groups: [
    {name: 'general', title: 'General Info'},
    {name: 'categorization', title: 'Categorization'},
    {name: 'variants', title: 'Variants'},
    {name: 'attributes', title: 'Attributes'},
    {name: 'content', title: 'Detailed Content'},
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      stock: 'stock',
      media: 'images.0.asset',
    },
    prepare(selection) {
      const {title, price, stock, media} = selection
      return {
        title,
        subtitle: `₹${price ?? 0} • Stock: ${stock ?? 0}`,
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string' as const,
      group: 'general',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug' as const,
      group: 'general',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Main Category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'categorization',
      options: {
        filter: '!defined(parent)',
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub Category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'categorization',
      options: {
        filter: ({document}: any) => {
          if (!document.category) return {filter: 'false'}
          return {
            filter: 'parent._ref == $parentId',
            params: {parentId: (document.category as any)._ref},
          }
        },
      },
      hidden: ({document}: any) => !document.category,
    }),
    defineField({
      name: 'childCategory',
      title: 'Child Category',
      type: 'reference',
      to: [{type: 'category'}],
      group: 'categorization',
      options: {
        filter: ({document}: any) => {
          if (!document.subCategory) return {filter: 'false'}
          return {
            filter: 'parent._ref == $parentId',
            params: {parentId: (document.subCategory as any)._ref},
          }
        },
      },
      hidden: ({document}: any) => !document.subCategory,
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'array' as const,
      group: 'attributes',
      of: [
        defineArrayMember({
          type: 'object' as const,
          fields: [
            defineField({
              name: 'review',
              title: 'Review (Star Rating)',
              type: 'number' as const,
            }),
            defineField({name: 'title', title: 'Title', type: 'string' as const}),
            defineField({name: 'description', title: 'Description', type: 'text' as const}),
            defineField({
              name: 'images',
              title: 'Images',
              type: 'array' as const,
              of: [
                defineArrayMember({
                  type: 'image' as const,
                  options: {hotspot: true},
                  fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string' as const})],
                }),
              ],
            }),
            defineField({name: 'time', title: 'Time', type: 'datetime' as const}),
            defineField({name: 'userDetails', title: 'User Details', type: 'string' as const}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'productQNA',
      title: 'Product QNA',
      type: 'array' as const,
      group: 'attributes',
      of: [
        defineArrayMember({
          type: 'productQNA' as const,
        }),
      ],
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number' as const,
      group: 'general',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array' as const,
      group: 'general',
      of: [
        defineArrayMember({
          type: 'image' as const,
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string' as const})],
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array' as const,
      group: 'general',
      of: [defineArrayMember({type: 'block' as const})],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number' as const,
      group: 'general',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'array',
      group: 'variants',
      of: [
        defineArrayMember({
          type: 'variant' as const,
        }),
      ],
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object' as const,
      group: 'attributes',
      fields: [
        defineField({name: 'sku', title: 'SKU', type: 'string' as const}),
        defineField({
          name: 'brand',
          title: 'Brand',
          type: 'reference' as const,
          to: [{type: 'brand' as const}],
        }),
        defineField({name: 'daysToShip', title: 'Days to Ship', type: 'number' as const}),
      ],
    }),
    defineField({
      name: 'additionalFeatures',
      title: 'Additional Features',
      type: 'array' as const,
      group: 'attributes',
      of: [
        defineArrayMember({
          type: 'object' as const,
          fields: [
            defineField({name: 'key', title: 'Key', type: 'string' as const}),
            defineField({name: 'value', title: 'Value', type: 'string' as const}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'directions',
      title: 'Directions',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'warnings',
      title: 'Warnings',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'guaranteedAnalysis',
      title: 'Guaranteed Analysis',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'moreInformation',
      title: 'More Information',
      type: 'array' as const,
      group: 'content',
      of: [defineArrayMember({type: 'block' as const})],
    }),
  ],
})
