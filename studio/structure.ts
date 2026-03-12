import {
  ArchiveIcon,
  CircleIcon,
  CogIcon,
  CommentIcon,
  DocumentIcon,
  DocumentTextIcon,
  HeartIcon,
  HelpCircleIcon,
  HomeIcon,
  MenuIcon,
  PackageIcon,
  StackIcon,
  StarIcon,
  TagIcon,
  UserIcon,
} from '@sanity/icons'
import type {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // 🚀 ROOM LEVEL (Quick Access & Moderation)

      // Grouping Pets and Breeds together as requested
      S.listItem()
        .title('Pet Management')
        .icon(HeartIcon)
        .child(
          S.list()
            .title('Pet Management')
            .items([
              S.listItem()
                .title('All Pet Profiles')
                .icon(HeartIcon)
                .child(S.documentTypeList('petProfile').title('All Pet Profiles')),
              S.listItem()
                .title('Pet Breeds')
                .icon(TagIcon)
                .child(S.documentTypeList('breed').title('Master Breed List')),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Customer Moderation')
        .icon(CommentIcon)
        .child(
          S.list()
            .title('Moderation')
            .items([
              S.listItem()
                .title('Customer Reviews')
                .icon(StarIcon)
                .child(S.documentTypeList('review').title('Manage Reviews')),
              S.listItem()
                .title('Customer Q&A')
                .icon(HelpCircleIcon)
                .child(S.documentTypeList('productQNA').title('Manage Q&A')),
            ]),
        ),

      S.listItem()
        .title('All Services')
        .icon(HeartIcon)
        .child(S.documentTypeList('service').title('Petco Services')),

      S.divider(),

      // Core Commerce
      S.listItem()
        .title('Products')
        .icon(PackageIcon)
        .child(S.documentTypeList('product').title('All Products')),
      S.listItem()
        .title('Brands')
        .icon(TagIcon)
        .child(S.documentTypeList('brand').title('All Brands')),
      S.listItem()
        .title('Categories')
        .icon(TagIcon)
        .child(S.documentTypeList('category').title('Main Categories')),

      S.divider(),

      // Pages & Articles
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('page').title('All Pages')),
      S.listItem()
        .title('Articles')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('article').title('All Articles')),
      S.listItem()
        .title('Article Categories')
        .icon(TagIcon)
        .child(S.documentTypeList('articleCategory').title('Article Categories')),

      S.divider(),

      // Experience & Settings
      S.listItem()
        .title('Physical Locations')
        .icon(HomeIcon)
        .child(S.documentTypeList('store').title('Store Locations')),
      S.listItem()
        .title('Membership (Vital Care)')
        .icon(CircleIcon)
        .child(S.documentTypeList('membership').title('Membership Tiers')),

      S.divider(),

      S.listItem()
        .title('Settings')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Settings')
            .items([
              S.listItem()
                .title('Header')
                .child(S.document().schemaType('header').documentId('header')),
              S.listItem()
                .title('Footer')
                .child(S.document().schemaType('footer').documentId('footer')),
              S.listItem()
                .title('Main Navigation')
                .icon(MenuIcon)
                .child(S.document().schemaType('navigation').documentId('navigation')),
              S.listItem()
                .title('Users')
                .icon(UserIcon)
                .child(S.documentTypeList('user').title('All Users')),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Collections')
        .icon(StackIcon)
        .child(S.documentTypeList('collection').title('All Collections')),

      // Filter
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'product',
            'category',
            'brand',
            'collection',
            'article',
            'articleCategory',
            'user',
            'page',
            'header',
            'footer',
            'navigation',
            'store',
            'service',
            'membership',
            'breed',
            'petProfile',
            'review',
            'productQNA',
          ].includes(listItem.getId() || ''),
      ),
    ])
