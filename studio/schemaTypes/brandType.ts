import { defineField, defineType } from 'sanity'
import { MdOutlineStorefront } from "react-icons/md";

export const brandType = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  icon: MdOutlineStorefront,
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Logo',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Used for the brand landing page header.',
    }),
    defineField({
      name: 'petTypes',
      title: 'Pet Types',
      type: 'array',
      group: 'content',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Dog', value: 'dog'},
          {title: 'Cat', value: 'cat'},
          {title: 'Fish', value: 'fish'},
          {title: 'Bird', value: 'bird'},
          {title: 'Reptile', value: 'reptile'},
          {title: 'Small Pet', value: 'small-pet'},
        ],
        layout: 'tags',
      },
      description: 'The pets this brand provides products for.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
})
