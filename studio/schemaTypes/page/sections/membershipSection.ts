import { defineField, defineType } from 'sanity'
import { MdCardMembership } from "react-icons/md";

export const membershipSection = defineType({
  name: 'membershipSection',
  title: 'Membership Promotion Section',
  type: 'object',
  icon: MdCardMembership,
  fields: [
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Unlock More with Vital Care',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'tiers',
      title: 'Display Tiers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'membership' }] }],
      description: 'Select the membership tiers to feature in this section.',
    }),
  ],
})
