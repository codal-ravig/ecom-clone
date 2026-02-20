import type {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Products Section
      S.listItem()
        .title('Products')
        .child(S.documentTypeList('product').title('All Products')),

      S.divider(),

      // Taxonomy Section
      S.listItem()
        .title('Taxonomy')
        .child(
          S.list()
            .title('Taxonomy')
            .items([
              // Categories
              S.listItem()
                .title('Categories')
                .child(S.documentTypeList('category').title('Main Categories')),
              // Sub Categories
              S.listItem()
                .title('Sub Categories')
                .child(S.documentTypeList('subCategory').title('Sub Categories')),
              // Child Categories
              S.listItem()
                .title('Child Categories')
                .child(S.documentTypeList('childCategory').title('Child Categories')),
            ]),
        ),

      S.divider(),

      // Brands Section
      S.listItem()
        .title('Brands')
        .child(S.documentTypeList('brand').title('All Brands')),

      S.divider(),

      // Collections Section
      S.listItem()
        .title('Collections')
        .child(S.documentTypeList('collection').title('All Collections')),

      // Filter out types that are manually listed above to avoid duplicates at the root
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !['product', 'category', 'subCategory', 'childCategory', 'brand', 'collection'].includes(
            listItem.getId() || '',
          ),
      ),
    ])
