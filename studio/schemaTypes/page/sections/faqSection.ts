import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaQuestionCircle} from 'react-icons/fa'

export const faqSection = defineType({
  name: 'faqSection',
  title: 'FAQ Section',
  type: 'object',
  icon: FaQuestionCircle,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            {name: 'question', type: 'string', title: 'Question'},
            {
              name: 'answer',
              type: 'array',
              title: 'Answer',
              of: [
                defineArrayMember({
                  type: 'block',
                  styles: [
                    {title: 'Normal', value: 'normal'},
                    {title: 'H1', value: 'h1'},
                    {title: 'H2', value: 'h2'},
                    {title: 'H3', value: 'h3'},
                    {title: 'H4', value: 'h4'},
                    {title: 'Quote', value: 'blockquote'},
                  ],
                  lists: [
                    {title: 'Bullet', value: 'bullet'},
                    {title: 'Number', value: 'number'},
                  ],
                }),
                defineArrayMember({
                  type: 'image',
                  options: {hotspot: true},
                  fields: [
                    {
                      name: 'alt',
                      type: 'string',
                      title: 'Alternative Text',
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
