import {defineField, defineType} from 'sanity'

export const contactHeroSection = defineType({
  name: 'contactHeroSection',
  title: 'Contact/Help Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: "We're here to help",
    }),
    defineField({
      name: 'image',
      title: 'Pet Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})
