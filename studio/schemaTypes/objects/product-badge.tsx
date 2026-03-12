import React from 'react'
import { defineField, defineType } from 'sanity'
import {TagIcon} from '@sanity/icons'

export const productBadgeType = defineType({
  name: 'productBadge',
  title: 'Product Badge',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The label for the badge (e.g. New, Sale)',
    }),
    defineField({
      name: 'color',
      title: 'Badge Color',
      type: 'color',
      description: 'Select a color for the badge',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      color: 'color.hex',
    },
    prepare({ title, color }) {
      return {
        title,
        subtitle: color ? `Color: ${color}` : 'No color selected',
        media: () => (
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: color || '#ccc',
              borderRadius: '50%',
            }}
          />
        )
      }
    }
  }
})
