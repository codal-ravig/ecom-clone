import { defineField, defineType } from 'sanity'
import { MdCampaign } from "react-icons/md";

export const promotionType = defineType({
  name: 'promotion',
  title: 'Site Promotions',
  type: 'document',
  icon: MdCampaign,
  fields: [
    defineField({
      name: 'title',
      title: 'Promotion Title',
      type: 'string',
      description: 'Internal name for identification.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Banner Text',
      type: 'string',
      description: 'The text shown in the announcement bar (e.g., "Spend $50, Get $20 Reward").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Where the user is taken when they click the banner.',
    }),
    defineField({
      name: 'type',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          { title: 'Announcement Bar (Top)', value: 'announcement' },
          { title: 'Homepage Hero Banner', value: 'hero' },
          { title: 'Promo Ribbon', value: 'ribbon' },
        ],
      },
      initialValue: 'announcement',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      description: 'Choose a background color for the banner.',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
