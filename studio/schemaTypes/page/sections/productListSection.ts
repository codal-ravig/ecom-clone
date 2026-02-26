import {MdOutlineProductionQuantityLimits} from 'react-icons/md'
import {productListSectionFactory} from './productListFactory'

export const productListSection = productListSectionFactory({
  name: 'productListSection',
  title: 'Product List / Carousel',
  icon: MdOutlineProductionQuantityLimits,
  defaultHeading: 'Recommended for You',
  categoryDescription: 'Select a category to automatically pull products from.',
})
