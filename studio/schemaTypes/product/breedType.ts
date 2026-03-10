import { defineField, defineType } from 'sanity'
import { MdPets } from "react-icons/md";

export const breedType = defineType({
  name: 'breed',
  title: 'Pet Breeds',
  type: 'document',
  icon: MdPets,
  fields: [
    defineField({
      name: 'name',
      title: 'Breed Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'petType',
      title: 'Pet Type',
      type: 'string',
      options: {
        list: [
          {title: 'Dog', value: 'dog'},
          {title: 'Cat', value: 'cat'},
          {title: 'Fish', value: 'fish'},
          {title: 'Bird', value: 'bird'},
          {title: 'Reptile', value: 'reptile'},
          {title: 'Small Pet', value: 'small-pet'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Breed Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Breed Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      petType: 'petType',
      media: 'image',
    },
    prepare({ title, petType, media }) {
      return {
        title,
        subtitle: petType ? petType.charAt(0).toUpperCase() + petType.slice(1) : '',
        media,
      }
    },
  },
})
