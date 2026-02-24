import {defineField, defineType} from 'sanity'
import {FaTags} from 'react-icons/fa'

export const articleCategoryType = defineType({
  name: 'articleCategory',
  title: 'Article Category',
  type: 'document',
  icon: FaTags,
  preview: {
    select: {
      title: 'name',
      parentName: 'parent.name',
    },
    prepare({title, parentName}) {
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
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parent',
      title: 'Parent Category',
      type: 'reference',
      to: [{type: 'articleCategory'}],
      description: 'Leave empty for top-level categories (e.g., Dog, Cat)',
    }),
  ],
})
