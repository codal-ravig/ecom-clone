import {defineField, defineType} from 'sanity'
import {OrderItemVariantInput} from './order-item-variant-input'

export const orderItemType = defineType({
  name: 'orderItem',
  title: 'Order Item',
  type: 'object',
  fields: [
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{type: 'product'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'variant',
      title: 'Variant Combination',
      type: 'string',
      description: 'The specific variant selected (e.g. "Red / Large").',
      components: {
        input: OrderItemVariantInput,
      },
    }),
    defineField({
      name: 'quantity',
      title: 'Quantity',
      type: 'number',
      initialValue: 1,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'price',
      title: 'Price at Purchase',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'fulfillmentStatus',
      title: 'Fulfillment Status',
      type: 'string',
      options: {
        list: [
          {title: 'Unfulfilled', value: 'unfulfilled'},
          {title: 'Fulfilled', value: 'fulfilled'},
          {title: 'Cancelled', value: 'cancelled'},
        ],
      },
      initialValue: 'unfulfilled',
    }),
    defineField({
      name: 'snapshotName',
      title: 'Product Name (at time of purchase)',
      type: 'string',
      description: 'Stores the product name as it was when the order was placed.',
    }),
    defineField({
      name: 'snapshotSku',
      title: 'Product SKU (at time of purchase)',
      type: 'string',
      description: 'Stores the SKU as it was when the order was placed.',
    }),
  ],
  preview: {
    select: {
      title: 'product.name',
      quantity: 'quantity',
      price: 'price',
      variant: 'variant',
    },
    prepare({title, quantity, price, variant}) {
      return {
        title: title || 'Loading...',
        subtitle: `${quantity} x $${price} ${variant ? `(${variant})` : ''}`,
      }
    },
  },
})
