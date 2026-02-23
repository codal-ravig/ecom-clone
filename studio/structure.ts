import { MdOutlineProductionQuantityLimits, MdOutlineCollectionsBookmark } from 'react-icons/md'
import type {StructureBuilder} from 'sanity/structure'
import { TbBrandBadoo } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Products Section
      S.listItem()
        .title('Products')
        .icon(MdOutlineProductionQuantityLimits)
        .child(S.documentTypeList('product').title('All Products')),

      S.divider(),

      // Taxonomy Section
      S.listItem()
        .title('Taxonomy')
        .icon(BiCategory)
        .child(
          S.list()
            .title('Taxonomy')
            .items([
              // Categories
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('category').title('Main Categories')),
            ]),
        ),

      S.divider(),

      // Brands Section
      S.listItem()
        .title('Brands')
        .icon(TbBrandBadoo)
        .child(S.documentTypeList('brand').title('All Brands')),

      S.divider(),

      // Collections Section
      S.listItem()
        .title('Collections')
        .icon(MdOutlineCollectionsBookmark)
        .child(S.documentTypeList('collection').title('All Collections')),

      // Filter out types that are manually listed above to avoid duplicates at the root
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['product', 'category', 'subCategory', 'childCategory', 'brand', 'collection'].includes(
            listItem.getId() || '',
          ),
      ),
    ])
