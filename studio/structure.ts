import {MdOutlineProductionQuantityLimits, MdOutlineCollectionsBookmark, MdStore, MdOutlineMedicalServices, MdCardMembership, MdMenu, MdPets, MdRateReview, MdQuestionAnswer} from 'react-icons/md'
import type {StructureBuilder} from 'sanity/structure'
import {TbBrandBadoo} from 'react-icons/tb'
import {BiCategory} from 'react-icons/bi'
import { FaTags, FaUser, FaNewspaper, FaDesktop, FaCogs} from 'react-icons/fa'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // 🚀 ROOM LEVEL (Quick Access & Moderation)
      
      // Grouping Pets and Breeds together as requested
      S.listItem()
        .title('Pet Management')
        .icon(MdPets)
        .child(
          S.list()
            .title('Pet Management')
            .items([
              S.listItem()
                .title('All Pet Profiles')
                .icon(MdPets)
                .child(S.documentTypeList('petProfile').title('All Pet Profiles')),
              S.listItem()
                .title('Pet Breeds')
                .icon(FaTags)
                .child(S.documentTypeList('breed').title('Master Breed List')),
            ])
        ),

      S.divider(),

      S.listItem()
        .title('Customer Moderation')
        .icon(MdRateReview)
        .child(
          S.list()
            .title('Moderation')
            .items([
              S.listItem()
                .title('Customer Reviews')
                .icon(MdRateReview)
                .child(S.documentTypeList('review').title('Manage Reviews')),
              S.listItem()
                .title('Customer Q&A')
                .icon(MdQuestionAnswer)
                .child(S.documentTypeList('productQNA').title('Manage Q&A')),
            ])
        ),

      S.listItem()
        .title('All Services')
        .icon(MdOutlineMedicalServices)
        .child(S.documentTypeList('service').title('Petco Services')),

      S.divider(),

      // Core Commerce
      S.listItem()
        .title('Products')
        .icon(MdOutlineProductionQuantityLimits)
        .child(S.documentTypeList('product').title('All Products')),
      S.listItem()
        .title('Brands')
        .icon(TbBrandBadoo)
        .child(S.documentTypeList('brand').title('All Brands')),
      S.listItem()
        .title('Categories')
        .icon(BiCategory)
        .child(S.documentTypeList('category').title('Main Categories')),

      S.divider(),

      // Pages & Articles
      S.listItem()
        .title('Pages')
        .icon(FaDesktop)
        .child(S.documentTypeList('page').title('All Pages')),
      S.listItem()
        .title('Articles')
        .icon(FaNewspaper)
        .child(S.documentTypeList('article').title('All Articles')),
      S.listItem()
        .title('Article Categories')
        .icon(FaTags)
        .child(S.documentTypeList('articleCategory').title('Article Categories')),

      S.divider(),

      // Experience & Settings
      S.listItem()
        .title('Physical Locations')
        .icon(MdStore)
        .child(S.documentTypeList('store').title('Store Locations')),
      S.listItem()
        .title('Membership (Vital Care)')
        .icon(MdCardMembership)
        .child(S.documentTypeList('membership').title('Membership Tiers')),

      S.divider(),

      S.listItem()
        .title('Settings')
        .icon(FaCogs)
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
                .icon(MdMenu)
                .child(S.document().schemaType('navigation').documentId('navigation')),
              S.listItem()
                .title('Users')
                .icon(FaUser)
                .child(S.documentTypeList('user').title('All Users')),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title('Collections')
        .icon(MdOutlineCollectionsBookmark)
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
