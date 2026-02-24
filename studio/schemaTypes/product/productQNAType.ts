import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaQuestion} from 'react-icons/fa'
import { SiAnswer } from "react-icons/si";
export const productQNA = defineType({
  name: 'productQNA',
  title: 'Product Q&A',
  type: 'object',
  icon: FaQuestion,
  fields: [
    defineField({
      name: 'nickname',
      title: 'Asked By',
      type: 'string',
      validation: (Rule) => Rule.required().max(25),
    }),

    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'email',
      title: 'Email (Private)',
      type: 'email',
      description: 'Optional - not displayed publicly',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          icon: SiAnswer,
          fields: [
            defineField({
              name: 'nickname',
              title: 'Answered By',
              type: 'string',
              validation: (Rule) => Rule.required().max(25),
            }),

            defineField({
              name: 'answer',
              title: 'Answer',
              type: 'text',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'email',
              title: 'Email (Private)',
              type: 'email',
              description: 'Optional - not displayed publicly',
            }),
            defineField({
              name: 'location',
              title: 'Location',
              type: 'string',
            }),
            defineField({
              name: 'helpful',
              title: 'Helpful (Yes)',
              type: 'number',
              initialValue: 0,
            }),
            defineField({
              name: 'notHelpful',
              title: 'Not Helpful (No)',
              type: 'number',
              initialValue: 0,
            }),
          ],
        }),
      ],
    }),
  ],
})
