import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const productAnswerType = defineType({
  name: 'productAnswer',
  title: 'Product Answer',
  type: 'object',
  icon: CommentIcon,
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
})
