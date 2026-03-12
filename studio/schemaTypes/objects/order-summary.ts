import {defineField, defineType} from 'sanity'

export const orderSummaryType = defineType({
  name: 'orderSummary',
  title: 'Order Summary',
  type: 'object',
  fields: [
    defineField({
      name: 'subtotal',
      title: 'Subtotal',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'shipping',
      title: 'Shipping',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'tax',
      title: 'Tax',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'discounts',
      title: 'Discounts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Discount Name'},
            {name: 'amount', type: 'number', title: 'Amount'},
          ],
        },
      ],
    }),
    defineField({
      name: 'total',
      title: 'Total',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'amountPaid',
      title: 'Amount Paid',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'amountDue',
      title: 'Amount Due',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
