import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'
import {PetTypeInput} from '../objects/pet-type-input'

export const breedType = defineType({
  name: 'breed',
  title: 'Pet Breeds',
  type: 'document',
  icon: TagIcon,
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
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'petType',
      title: 'Pet Type',
      type: 'string',
      components: {
        input: PetTypeInput,
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
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      title: 'name',
      petType: 'petType',
      media: 'image',
    },
    prepare({title, petType, media}) {
      return {
        title,
        subtitle: petType ? petType.charAt(0).toUpperCase() + petType.slice(1) : '',
        media,
      }
    },
  },
})
