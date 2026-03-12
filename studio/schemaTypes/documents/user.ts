import {defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons'

export const userType = defineType({
  name: 'user',
  title: 'User',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'designation',
      title: 'Designation',
      type: 'string',
    }),
    defineField({
      name: 'profile',
      title: 'Profile Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'biography',
      title: 'Biography',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility',
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'pets',
      title: 'My Pets',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'petProfile'}]}],
      description: 'The pets owned by this user.',
    }),
  ],
})
