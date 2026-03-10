import {defineArrayMember, defineField, defineType} from 'sanity'
import {FaQuestion} from 'react-icons/fa'
export const productQNA = defineType({
  name: 'productQNA',
  title: 'Customer Q&A',
  type: 'document',
  icon: FaQuestion,
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nickname',
      title: 'Asked By',
      type: 'string',
      validation: (Rule) => Rule.required().max(25),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answers',
      title: 'Answers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'productAnswer',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      question: 'question',
      productName: 'product.name',
      answers: 'answers',
    },
    prepare({ question, productName, answers }) {
      const answerCount = answers?.length || 0
      return {
        title: question,
        subtitle: `For: ${productName || 'Unknown Product'} (${answerCount} answers)`,
      }
    },
  },
})
