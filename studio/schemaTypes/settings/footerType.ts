import {defineArrayMember, defineField, defineType} from 'sanity'

export const footerType = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  preview: {
    prepare() {
      return {
        title: 'Footer Settings',
      }
    },
  },
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          preview: {
            select: {
              title: 'title',
            },
          },
          fields: [
            {name: 'title', type: 'string', title: 'Column Title'},
            {
              name: 'links',
              type: 'array',
              title: 'Links',
              of: [
                defineArrayMember({
                  type: 'object',
                  preview: {
                    select: {
                      title: 'label',
                    },
                  },
                  fields: [
                    {name: 'label', type: 'string', title: 'Label'},
                    {name: 'link', type: 'string', title: 'Link'},
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          preview: {
            select: {
              title: 'platform',
              subtitle: 'link',
            },
          },
          fields: [
            {name: 'platform', type: 'string', title: 'Platform'},
            {name: 'link', type: 'string', title: 'Link'},
          ],
        }),
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'text',
    }),
  ],
})
