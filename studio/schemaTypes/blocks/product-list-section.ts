import {PackageIcon} from '@sanity/icons'
import {productListSectionFactory} from './product-list-factory'

export const productListSection = productListSectionFactory({
  name: 'productListSection',
  title: 'Product List / Carousel',
  icon: PackageIcon,
  defaultHeading: 'Recommended for You',
  categoryDescription: 'Select a category to automatically pull products from.',
})
