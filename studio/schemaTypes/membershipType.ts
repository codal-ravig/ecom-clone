import { defineField, defineType } from 'sanity'
import { MdCardMembership } from "react-icons/md";

export const membershipType = defineType({
  name: 'membership',
  title: 'Membership Tiers (Vital Care)',
  type: 'document',
  icon: MdCardMembership,
  fields: [
    defineField({
      name: 'name',
      title: 'Tier Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Vital Care Core, Vital Care Premier',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Monthly Price',
      type: 'number',
    }),
    defineField({
      name: 'benefits',
      title: 'Member Benefits',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Benefit Title' },
          { name: 'detail', type: 'text', title: 'Benefit Detail' },
          { name: 'icon', type: 'image', title: 'Benefit Icon' },
        ]
      }]
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Text',
      type: 'string',
      initialValue: 'Join Now',
    }),
    defineField({
      name: 'badgeColor',
      title: 'Badge Color',
      type: 'string',
      description: 'Hex or CSS color for branding.',
    }),
  ],
})
