import {defineArrayMember, defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string' as const,
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug' as const,
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference' as const,
      to: [{type: 'category' as const}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub Category',
      type: 'reference' as const,
      to: [{type: 'subCategory' as const}],
      options: {
        filter: ({document}: {document: any}) => {
          if (!document.category) {
            return {
              filter: '!defined(parentCategory)',
            }
          }
          return {
            filter: 'parentCategory._ref == $categoryId',
            params: {categoryId: document.category._ref},
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'childCategory',
      title: 'Child Category',
      type: 'reference' as const,
      to: [{type: 'childCategory' as const}],
      options: {
        filter: ({document}: {document: any}) => {
          if (!document.subCategory) {
            return {
              filter: '!defined(parentSubCategory)',
            }
          }
          return {
            filter: 'parentSubCategory._ref == $subCategoryId',
            params: {subCategoryId: document.subCategory._ref},
          }
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'object' as const,
      fields: [
        defineField({name: 'totalCount', title: 'Total Count', type: 'number' as const}),
        defineField({name: 'avgStar', title: 'Average Star', type: 'number' as const}),
        defineField({
          name: 'userReviews',
          title: 'User Reviews',
          type: 'array' as const,
          of: [
            defineArrayMember({
              type: 'object' as const,
              fields: [
                defineField({name: 'review', title: 'Review (Star Rating)', type: 'number' as const}),
                defineField({name: 'title', title: 'Title', type: 'string' as const}),
                defineField({name: 'description', title: 'Description', type: 'text' as const}),
                defineField({name: 'time', title: 'Time', type: 'datetime' as const}),
                defineField({name: 'userDetails', title: 'User Details', type: 'string' as const}),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'stock',
      title: 'Stock',
      type: 'number' as const,
    }),
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
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array' as const,
      of: [defineArrayMember({type: 'block' as const})],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number' as const,
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string' as const,
    }),
    defineField({
      name: 'variantDetails',
      title: 'Variant Details',
      type: 'text' as const,
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'object' as const,
      fields: [
        defineField({name: 'sku', title: 'SKU', type: 'string' as const}),
        defineField({
          name: 'brand',
          title: 'Brand',
          type: 'reference' as const,
          to: [{ type: 'brand' as const }],
        }),
        defineField({name: 'daysToShip', title: 'Days to Ship', type: 'number' as const}),
      ],
    }),
    defineField({
      name: 'additionalFeatures',
      title: 'Additional Features',
      type: 'array' as const,
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
    }),
    defineField({
      name: 'directions',
      title: 'Directions',
      type: 'text' as const,
    }),
    defineField({
      name: 'warnings',
      title: 'Warnings',
      type: 'text' as const,
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text' as const,
    }),
    defineField({
      name: 'guaranteedAnalysis',
      title: 'Guaranteed Analysis',
      type: 'text' as const,
    }),
    defineField({
      name: 'moreInformation',
      title: 'More Information',
      type: 'array' as const,
      of: [defineArrayMember({type: 'block' as const})],
    }),
  ],
})
