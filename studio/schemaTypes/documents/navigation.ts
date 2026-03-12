import {defineArrayMember, defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Site Navigation',
  type: 'document',
  icon: MenuIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      description: 'e.g. Main Navigation',
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Label'}),
            defineField({name: 'link', type: 'string', title: 'URL or Path'}),
            defineField({
              name: 'children',
              title: 'Sub-Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    {name: 'label', type: 'string', title: 'Label'},
                    {name: 'link', type: 'string', title: 'URL or Path'},
                  ],
                }),
              ],
            }),
            defineField({
              name: 'featured',
              title: 'Featured Promotion',
              type: 'object',
              fields: [
                {name: 'title', type: 'string'},
                {name: 'image', type: 'image'},
                {name: 'link', type: 'string'},
              ],
            }),
          ],
        }),
      ],
    }),
  ],
})
