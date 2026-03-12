import {defineField, defineType} from 'sanity'

export const timelineEventType = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'object',
  fields: [
    defineField({
      name: 'timestamp',
      title: 'Timestamp',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'event',
      title: 'Event',
      type: 'string',
      options: {
        list: [
          {title: 'Order Placed', value: 'placed'},
          {title: 'Payment Received', value: 'payment_received'},
          {title: 'Fulfillment Started', value: 'fulfillment_started'},
          {title: 'Label Created', value: 'label_created'},
          {title: 'Shipped', value: 'shipped'},
          {title: 'Delivered', value: 'delivered'},
          {title: 'Cancelled', value: 'cancelled'},
          {title: 'Comment', value: 'comment'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      event: 'event',
      timestamp: 'timestamp',
      author: 'author',
    },
    prepare({event, timestamp, author}) {
      const date = new Date(timestamp).toLocaleString()
      return {
        title: event.toUpperCase(),
        subtitle: `${date}${author ? ` by ${author}` : ''}`,
      }
    },
  },
})
