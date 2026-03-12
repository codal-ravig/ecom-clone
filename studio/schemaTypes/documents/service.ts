import {defineField, defineType} from 'sanity'
import {HeartIcon} from '@sanity/icons'

export const serviceType = defineType({
  name: 'service',
  title: 'Pet Services',
  type: 'document',
  icon: HeartIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Service Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Grooming, Dog Training, Veterinary Care',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon/Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      description: 'Brief text for cards or summaries.',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits/Features',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'serviceUrl',
      title: 'Booking Link',
      type: 'url',
      description: 'Link to Petco external booking system if applicable.',
    }),
  ],
})
