import { defineField, defineType } from "sanity";

export const categoryType = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  preview: {
    select: {
      title: 'name',
      parentName: 'parent.name',
    },
    prepare({ title, parentName }) {
      return {
        title: parentName ? `${parentName} > ${title}` : title,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      description: 'Leave empty if top level category',
    }),

    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
      description: 'Manually select products to feature in this category.',
      group: 'promotions',
    }),

    defineField({
      name: 'trendingProducts',
      title: 'Trending Products Section',
      type: 'object',
      group: 'promotions',
      fields: [
        {name: 'active', title: 'Active', type: 'boolean', initialValue: true},
        {name: 'heading', title: 'Heading', type: 'string', initialValue: 'Trending Products'},
        {
          name: 'products',
          title: 'Products',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'product'}]}],
          description: 'Optionally select specific products to show in this section.',
        },
        {name: 'limit', title: 'Limit', type: 'number', initialValue: 8},
      ],
    }),

    defineField({
      name: 'bestSellers',
      title: 'Best Sellers Section',
      type: 'object',
      group: 'promotions',
      fields: [
        {name: 'active', title: 'Active', type: 'boolean', initialValue: true},
        {name: 'heading', title: 'Heading', type: 'string', initialValue: 'Best Sellers'},
        {
          name: 'products',
          title: 'Products',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'product'}]}],
          description: 'Optionally select specific products to show in this section.',
        },
        {name: 'limit', title: 'Limit', type: 'number', initialValue: 8},
      ],
    }),

    defineField({
      name: 'mostViewed',
      title: 'Most Viewed Section',
      type: 'object',
      group: 'promotions',
      fields: [
        {name: 'active', title: 'Active', type: 'boolean', initialValue: true},
        {name: 'heading', title: 'Heading', type: 'string', initialValue: 'Most Viewed'},
        {
          name: 'products',
          title: 'Products',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'product'}]}],
          description: 'Optionally select specific products to show in this section.',
        },
        {name: 'limit', title: 'Limit', type: 'number', initialValue: 8},
      ],
    }),

    defineField({
      name: 'alsoBought',
      title: 'Customers Also Bought Section',
      type: 'object',
      group: 'promotions',
      fields: [
        {name: 'active', title: 'Active', type: 'boolean', initialValue: true},
        {name: 'heading', title: 'Heading', type: 'string', initialValue: 'Customers Also Bought'},
        {
          name: 'products',
          title: 'Products',
          type: 'array',
          of: [{type: 'reference', to: [{type: 'product'}]}],
          description: 'Optionally select specific products to show in this section.',
        },
        {name: 'limit', title: 'Limit', type: 'number', initialValue: 8},
      ],
    }),
  ],
  groups: [{name: 'promotions', title: 'Promotional Sections'}],
})
