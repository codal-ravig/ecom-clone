import { defineField, defineType } from 'sanity'
import { MdOutlineMedicalServices } from "react-icons/md";

export const serviceGridSection = defineType({
  name: 'serviceGridSection',
  title: 'Services Grid Section',
  type: 'object',
  icon: MdOutlineMedicalServices,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Our Professional Pet Services',
    }),
    defineField({
      name: 'services',
      title: 'Services to Show',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Choose which services to show in this grid.',
    }),
  ],
})
