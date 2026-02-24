import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaTshirt} from 'react-icons/fa' // Using as a placeholder icon for header

export const headerType = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Header Settings',
      }
    },
  },
  fields: [
    defineField({
      name: 'topBanner',
      title: 'Top Banner Text',
      type: 'string',
      description: 'e.g., 35% Off First Repeat Delivery',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'link', type: 'string', title: 'Link'},
          ],
        }),
      ],
    }),
  ],
})
