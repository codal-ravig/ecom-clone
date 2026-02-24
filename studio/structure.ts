import {MdOutlineProductionQuantityLimits, MdOutlineCollectionsBookmark} from 'react-icons/md'
import type {StructureBuilder} from 'sanity/structure'
import {TbBrandBadoo} from 'react-icons/tb'
import {BiCategory} from 'react-icons/bi'
import {FaFileAlt, FaTags, FaUser, FaNewspaper, FaDesktop, FaCogs} from 'react-icons/fa'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Settings Section
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
            ]),
        ),

      S.divider(),

      // Pages Section
      S.listItem()
        .title('Pages')
        .icon(FaDesktop)
        .child(S.documentTypeList('page').title('All Pages')),

      S.divider(),

      S.listItem()
        .title('Products')
        .icon(MdOutlineProductionQuantityLimits)
        .child(S.documentTypeList('product').title('All Products')),

      S.divider(),
      S.listItem()
        .title('Article Management')
        .icon(FaNewspaper)
        .child(
          S.list()
            .title('Article Management')
            .items([
              S.listItem()
                .title('Articles')
                .icon(FaFileAlt)
                .child(S.documentTypeList('article').title('All Articles')),
              S.listItem()
                .title('Article Categories')
                .icon(FaTags)
                .child(S.documentTypeList('articleCategory').title('All Categories')),
              S.listItem()
                .title('Users')
                .icon(FaUser)
                .child(S.documentTypeList('user').title('All Users')),
            ]),
        ),

      S.divider(),
      S.listItem()
        .title('Taxonomy')
        .icon(BiCategory)
        .child(
          S.list()
            .title('Taxonomy')
            .items([
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('category').title('Main Categories')),
                S.listItem()
        .title('Brands')
        .icon(TbBrandBadoo)
        .child(S.documentTypeList('brand').title('All Brands')),

            ]),
        ),

      S.divider(),
      S.listItem()
        .title('Collections')
        .icon(MdOutlineCollectionsBookmark)
        .child(S.documentTypeList('collection').title('All Collections')),

      // Filter out types that are manually listed above to avoid duplicates at the root
      ...S.documentTypeListItems().filter(
        (listItem) =>
          ![
            'product',
            'category',
            'subCategory',
            'childCategory',
            'brand',
            'collection',
            'article',
            'articleCategory',
            'user',
            'page',
            'header',
            'footer',
          ].includes(listItem.getId() || ''),
      ),
    ])
