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
  ],
})
