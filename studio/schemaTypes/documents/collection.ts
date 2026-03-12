import {defineField, defineType} from 'sanity'
import {StackIcon} from '@sanity/icons'

export const collectionType = defineType({
  name: 'collection',
  title: 'Collection',
  type: 'document',
  icon: StackIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'product'}]}],
    }),
  ],
})
