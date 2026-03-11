import {defineField, defineType} from 'sanity'
import {MdPets} from 'react-icons/md'
import {PetTypeInput} from './PetTypeInput'
export const petProfileType = defineType({
  name: 'petProfile',
  title: 'Pet Profile',
  type: 'document',
  icon: MdPets,
  fields: [
    defineField({
      name: 'name',
      title: 'Pet Name',
      type: 'string',
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
      name: 'breed',
      title: 'Breed',
      type: 'reference',
      to: [{type: 'breed'}],
      options: {
        filter: ({document, parent}: any) => {
          const petType = (parent as any)?.petType
          if (!petType) return {filter: 'false'}
          return {
            filter: 'petType == $petType',
            params: {petType},
          }
        },
      },
    }),
    defineField({
      name: 'birthday',
      title: 'Birthday',
      type: 'date',
    }),
    defineField({
      name: 'weight',
      title: 'Weight (lbs)',
      type: 'number',
    }),
    defineField({
      name: 'image',
      title: 'Pet Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'healthIssues',
      title: 'Health Considerations',
      type: 'array',
      of: [{type: 'string'}],
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
