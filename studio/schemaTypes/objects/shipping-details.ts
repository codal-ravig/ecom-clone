import {defineField, defineType} from 'sanity'

export const shippingDetailsType = defineType({
  name: 'shippingDetails',
  title: 'Shipping Details',
  type: 'object',
  fields: [
    defineField({
      name: 'carrier',
      title: 'Carrier',
      type: 'string',
      options: {
        list: [
          {title: 'UPS', value: 'ups'},
          {title: 'FedEx', value: 'fedex'},
          {title: 'USPS', value: 'usps'},
          {title: 'DHL', value: 'dhl'},
          {title: 'Amazon Logistics', value: 'amazon'},
          {title: 'Other', value: 'other'},
        ],
      },
    }),
    defineField({
      name: 'method',
      title: 'Shipping Method',
      type: 'string',
      description: 'e.g. Ground, Next Day Air, Priority Mail',
    }),
    defineField({
      name: 'trackingNumber',
      title: 'Tracking Number',
      type: 'string',
    }),
    defineField({
      name: 'trackingUrl',
      title: 'Tracking URL',
      type: 'url',
    }),
    defineField({
      name: 'estimatedDelivery',
      title: 'Estimated Delivery',
      type: 'date',
    }),
  ],
})
