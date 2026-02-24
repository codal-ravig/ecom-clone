import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaDesktop} from 'react-icons/fa'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: FaDesktop,
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
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        defineArrayMember({type: 'heroSection'}),
        defineArrayMember({type: 'textSection'}),
        defineArrayMember({type: 'infoSection'}),
        defineArrayMember({type: 'faqSection'}),
        defineArrayMember({type: 'featuredArticlesSection'}),
        defineArrayMember({type: 'featuredProductsSection'}),
      ],
    }),
  ],
})
