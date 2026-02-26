import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: 'seo',
  title: 'SEO & Social',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'SEO Title',
      type: 'string',
      validation: Rule => Rule.max(60).warning('Titles over 60 characters may be truncated.')
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.max(160).warning('Descriptions over 160 characters may be truncated.')
    }),
    defineField({
      name: 'image',
      title: 'Share Image',
      type: 'image',
      description: 'Used for social media previews (Open Graph).'
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url'
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines (noindex)',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'structuredData',
      title: 'Structured Data (JSON-LD)',
      type: 'text',
      description: 'Custom JSON-LD for schema.org markup. Do not include <script> tags.',
      rows: 5,
    }),
  ]
});
