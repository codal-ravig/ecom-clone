import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array' as const,
      group: 'content',
      of: [
        defineArrayMember({type: 'heroSection'}),
        defineArrayMember({type: 'textSection'}),
        defineArrayMember({type: 'infoSection'}),
        defineArrayMember({type: 'faqSection'}),
        defineArrayMember({type: 'featuredArticlesSection'}),
        defineArrayMember({type: 'contactHeroSection'}),
        defineArrayMember({type: 'gridSection'}),
        defineArrayMember({type: 'espotSection'}),
        defineArrayMember({type: 'productListSection'}),
        defineArrayMember({type: 'membershipSection'}),
        defineArrayMember({type: 'serviceGridSection'}),
      ],
    }),
  ],
})
