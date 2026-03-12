import {defineArrayMember, defineField, defineType} from 'sanity'
import {BasketIcon} from '@sanity/icons'

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon,
  groups: [
    {name: 'logistics', title: 'Logistics'},
    {name: 'cx', title: 'Customer Experience'},
    {name: 'metadata', title: 'Metadata'},
  ],
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      group: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference' as const,
      to: [{type: 'user'}],
      group: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      group: 'metadata',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Pending', value: 'pending'},
          {title: 'Authorized', value: 'authorized'},
          {title: 'Paid', value: 'paid'},
          {title: 'Partially Refunded', value: 'partially_refunded'},
          {title: 'Refunded', value: 'refunded'},
          {title: 'Voided', value: 'voided'},
        ],
      },
      initialValue: 'pending',
      group: 'logistics',
    }),
    defineField({
      name: 'fulfillmentStatus',
      title: 'Fulfillment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Unfulfilled', value: 'unfulfilled'},
          {title: 'Partially Fulfilled', value: 'partially_fulfilled'},
          {title: 'Fulfilled', value: 'fulfilled'},
          {title: 'Restocked', value: 'restocked'},
        ],
      },
      initialValue: 'unfulfilled',
      group: 'logistics',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
      group: 'metadata',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
      group: 'metadata',
    }),
    defineField({
      name: 'items',
      title: 'Order Items',
      type: 'array' as const,
      of: [defineArrayMember({type: 'orderItem'})],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'orderSummary',
      title: 'Order Summary',
      type: 'orderSummary',
    }),
    defineField({
      name: 'shippingAddress',
      title: 'Shipping Address',
      type: 'address',
      group: 'logistics',
    }),
    defineField({
      name: 'billingAddress',
      title: 'Billing Address',
      type: 'address',
      group: 'logistics',
    }),
    defineField({
      name: 'shippingDetails',
      title: 'Shipping Details',
      type: 'shippingDetails',
      group: 'logistics',
    }),
    defineField({
      name: 'deliveryInstructions',
      title: 'Delivery Instructions',
      type: 'text',
      group: 'cx',
      rows: 3,
    }),
    defineField({
      name: 'isGift',
      title: 'Is this a gift?',
      type: 'boolean',
      initialValue: false,
      group: 'cx',
    }),
    defineField({
      name: 'giftMessage',
      title: 'Gift Message',
      type: 'text',
      group: 'cx',
      hidden: ({parent}) => !parent?.isGift,
      rows: 3,
    }),
    defineField({
      name: 'salesChannel',
      title: 'Sales Channel',
      type: 'string',
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'iOS App', value: 'ios'},
          {title: 'Android App', value: 'android'},
          {title: 'In-Store POS', value: 'pos'},
        ],
      },
      group: 'metadata',
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
      group: 'metadata',
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      group: 'metadata',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array' as const,
      of: [defineArrayMember({type: 'timelineEvent'})],
    }),
  ],
  preview: {
    select: {
      title: 'orderNumber',
      customerName: 'customer.title',
      totalPrice: 'orderSummary.total',
      paymentStatus: 'paymentStatus',
      fulfillmentStatus: 'fulfillmentStatus',
    },
    prepare({title, customerName, totalPrice, paymentStatus, fulfillmentStatus}) {
      return {
        title: `Order #${title}`,
        subtitle: `${customerName || 'Unknown'} • $${totalPrice || 0} • ${paymentStatus.toUpperCase()} / ${fulfillmentStatus.toUpperCase()}`,
      }
    },
  },
})
