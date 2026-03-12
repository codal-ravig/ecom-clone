import {defineArrayMember, defineField, defineType} from 'sanity'
import {ThLargeIcon} from '@sanity/icons'

export const gridSection = defineType({
  name: 'gridSection',
  title: 'Grid Section (Help Cards)',
  type: 'object',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'items',
      title: 'Grid Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'icon', type: 'image', title: 'Icon/Image'},
            {name: 'title', type: 'string', title: 'Title'},
            {name: 'description', type: 'text', title: 'Description'},
            {
              name: 'actions',
              title: 'Buttons/Links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    {name: 'label', type: 'string', title: 'Label'},
                    {name: 'link', type: 'string', title: 'Link'},
                    {
                      name: 'variant',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Primary', value: 'primary'},
                          {title: 'Secondary', value: 'secondary'},
                        ],
                      },
                    },
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
})
