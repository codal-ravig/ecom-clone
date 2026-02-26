import {defineField, defineType} from 'sanity'
import {MdCode} from 'react-icons/md'

export const espotSection = defineType({
  name: 'espotSection',
  title: 'E-Spot (Custom HTML)',
  type: 'object',
  icon: MdCode,
  fields: [
    defineField({
      name: 'name',
      title: 'E-Spot Name',
      type: 'string',
      description: 'Internal reference name, e.g. "HP_Hero" or "Home_EmergencyBanner".',
    }),
    defineField({
      name: 'html',
      title: 'HTML Content',
      type: 'text',
      description: 'Direct HTML/Script content for the spot.',
      rows: 10,
    }),
    defineField({
      name: 'previewUrl',
      title: 'Preview URL',
      type: 'url',
    }),
  ],
})
