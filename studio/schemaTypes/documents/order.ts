import {defineArrayMember, defineField, defineType} from 'sanity'
import {BasketIcon} from '@sanity/icons'

export const orderType = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'orderNumber',
      title: 'Order Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customer',
      title: 'Customer',
      type: 'reference',
      to: [{type: 'user'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orderDate',
      title: 'Order Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
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
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Customer Phone',
      type: 'string',
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
    }),
    defineField({
      name: 'billingAddress',
      title: 'Billing Address',
      type: 'address',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
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
