import {defineArrayMember, defineField, defineType} from 'sanity'
import {MdOutlineProductionQuantityLimits} from 'react-icons/md'
export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: MdOutlineProductionQuantityLimits,
  groups: [
    {name: 'general', title: 'General Info'},
    {name: 'categorization', title: 'Categorization'},
    {name: 'variants', title: 'Variants'},
    {name: 'attributes', title: 'Attributes'},
    {name: 'content', title: 'Detailed Content'},
    {name: 'delivery', title: 'Delivery & Promotions'},
    {name: 'seo', title: 'SEO'},
  ],
  preview: {
    select: {
      title: 'name',
      price: 'price',
      stock: 'stock',
      media: 'images.0.asset',
    },
    prepare(selection) {
      const {title, price, stock, media} = selection
      return {
        title,
        subtitle: `Price:${price ?? 0} • Stock: ${stock ?? 0}`,
        media,
      }
    },
  },
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string' as const,
      group: 'general',
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug' as const,
      group: 'general',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Main Category',
      type: 'reference' as const,
      to: [{type: 'category'}],
      group: 'categorization',
      options: {
        filter: '!defined(parent)',
      },
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'subCategory',
      title: 'Sub Category',
      type: 'reference' as const,
      to: [{type: 'category'}],
      group: 'categorization',
      options: {
        filter: ({document}: any) => {
          if (!document.category) return {filter: 'false'}
          return {
            filter: 'parent._ref == $parentId',
            params: {parentId: (document.category as any)._ref},
          }
        },
      },
      hidden: ({document}: any) => !document.category,
    }),
    defineField({
      name: 'childCategory',
      title: 'Child Category',
      type: 'reference' as const,
      to: [{type: 'category'}],
      group: 'categorization',
      options: {
        filter: ({document}: any) => {
          if (!document.subCategory) return {filter: 'false'}
          return {
            filter: 'parent._ref == $parentId',
            params: {parentId: (document.subCategory as any)._ref},
          }
        },
      },
      hidden: ({document}: any) => !document.subCategory,
    }),
    defineField({
      name: 'review',
      title: 'Review',
      type: 'array' as const,
      group: 'attributes',
      of: [
        defineArrayMember({
          type: 'review' as const,
        }),
      ],
    }),
    defineField({
      name: 'productQNA',
      title: 'Product QNA',
      type: 'array' as const,
      group: 'attributes',
      of: [
        defineArrayMember({
          type: 'productQNA' as const,
        }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Base Price',
      type: 'number' as const,
      group: 'general',
      description: 'The default price for the product. Variants can override this.',
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare-at Price',
      type: 'number' as const,
      group: 'general',
      description: 'Original "was" price shown crossed out. Used when no variants are defined.',
    }),
    defineField({
      name: 'stock',
      title: 'Total/Base Stock',
      type: 'number' as const,
      group: 'general',
      description: 'Used if no variants are defined.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array' as const,
      group: 'general',
      of: [
        defineArrayMember({
          type: 'image' as const,
          options: {hotspot: true},
          fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string' as const})],
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array' as const,
      group: 'general',
      of: [defineArrayMember({type: 'block' as const})],
    }),
    defineField({
      name: 'options',
      title: 'Product Options',
      type: 'array' as const,
      group: 'variants',
      description: 'Define dimensions like Color, Size, etc.',
      of: [defineArrayMember({type: 'productOption'})],
    }),
    defineField({
      name: 'variants',
      title: 'Product Variants (SKUs)',
      type: 'array' as const,
      group: 'variants',
      description: 'The actual combinations (Cartesian products) of the options defined above.',
      of: [defineArrayMember({type: 'productVariant'})],
      validation: (Rule: any) =>
        Rule.custom((variants: any[]) => {
          if (!variants) return true
          const combinations = variants.map((v) => v.combination).filter(Boolean)
          const duplicates = combinations.filter(
            (item, index) => combinations.indexOf(item) !== index,
          )
          if (duplicates.length > 0) {
            return `Duplicate combinations found: ${duplicates.join(', ')}`
          }
          return true
        }),
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'productSpecification' as const,
      group: 'attributes',
    }),
    defineField({
      name: 'additionalFeatures',
      title: 'Additional Features',
      type: 'array' as const,
      group: 'attributes',
      of: [
        defineArrayMember({
          type: 'productFeature' as const,
        }),
      ],
    }),
    defineField({
      name: 'warranty',
      title: 'Warranty',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'directions',
      title: 'Directions',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'warnings',
      title: 'Warnings',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'ingredients',
      title: 'Ingredients',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'guaranteedAnalysis',
      title: 'Guaranteed Analysis',
      type: 'text' as const,
      group: 'content',
    }),
    defineField({
      name: 'moreInformation',
      title: 'More Information',
      type: 'array' as const,
      group: 'content',
      of: [defineArrayMember({type: 'block' as const})],
    }),
    // ─── Delivery & Promotions ────────────────────────────────────────────
    defineField({
      name: 'deliveryMethods',
      title: 'Delivery Methods',
      type: 'array' as const,
      group: 'delivery',
      description: 'Configure which fulfilment options are available and their promo badge text.',
      of: [
        defineArrayMember({
          type: 'object' as const,
          fields: [
            defineField({
              name: 'method',
              title: 'Method',
              type: 'string' as const,
              options: {
                list: [
                  {title: 'Pickup (In-Store)', value: 'Pickup'},
                  {title: 'Same-Day Delivery', value: 'SameDay'},
                  {title: 'Ship to Me', value: 'ShipToMe'},
                ],
                layout: 'radio',
              },
              validation: (Rule: any) => Rule.required(),
            }),
            defineField({
              name: 'available',
              title: 'Available',
              type: 'boolean' as const,
              initialValue: true,
            }),
            defineField({
              name: 'badge',
              title: 'Promo Badge',
              type: 'string' as const,
              description:
                'Short promo label shown above the option, e.g. "10% off $50+" or "Free Same Day $35+"',
            }),
          ],
          preview: {
            select: {method: 'method', badge: 'badge', available: 'available'},
            prepare({method, badge, available}: any) {
              const labels: Record<string, string> = {
                Pickup: '🏪 Pickup',
                SameDay: '🚴 Same-Day',
                ShipToMe: '📦 Ship to Me',
              }
              return {
                title: labels[method] ?? method,
                subtitle: badge
                  ? `${badge}${available ? '' : ' (unavailable)'}`
                  : available
                    ? 'Available'
                    : 'Unavailable',
              }
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'repeatDeliveryDiscount',
      title: 'Repeat Delivery Discount (%)',
      type: 'number' as const,
      group: 'delivery',
      description: 'Ongoing % discount on all Repeat Delivery orders, e.g. 5 for 5% off.',
      initialValue: 5,
    }),
    defineField({
      name: 'repeatDeliveryFirstOrderDiscount',
      title: 'First Repeat Delivery Discount (%)',
      type: 'number' as const,
      group: 'delivery',
      description:
        'Discount % for the very first Repeat Delivery order, e.g. 35 for 35% off (up to $20).',
      initialValue: 35,
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      group: 'seo',
    }),
  ],
})
