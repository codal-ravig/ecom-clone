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
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),

    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
      description: 'Leave empty if top level category',
    }),

    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
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
      description: 'The category to pull trending products from.',
      title: 'Trending Products Section',
      type: 'categoryPromotion',
      group: 'promotions',
      initialValue: {
        heading: 'Trending Products',
      },
    }),

    defineField({
      name: 'bestSellers',
      title: 'Best Sellers Section',
      description: 'Best Sellers',
      type: 'categoryPromotion',
      group: 'promotions',
      initialValue: {
        heading: 'Best Sellers',
      },
    }),

    defineField({
      name: 'mostViewed',
      title: 'Most Viewed Section',
       description: 'The category to pull most viewed products from.',
      type: 'categoryPromotion',
      group: 'promotions',
      initialValue: {
        heading: 'Most Viewed',
      },
    }),

    defineField({
      name: 'alsoBought',
      title: 'Customers Also Bought Section',
      description: 'Customers Also Bought',
      type: 'categoryPromotion',
      group: 'promotions',
      initialValue: {
        heading: 'Customers Also Bought',
      },
    }),
  ],
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'promotions', title: 'Promotional Sections' },
    { name: 'seo', title: 'SEO' },
  ],
})
