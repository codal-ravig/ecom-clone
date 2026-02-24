
import {categoryType }from './categoryType'
import {brandType} from './brandType'
import {collectionType} from './collectionType'
import { productType } from './product/productType'
import { variantType } from './product/variantType'
import { productQNA } from './product/productQNAType'

export const schemaTypes = [
  productType,
  categoryType,
  brandType,
  collectionType,
  variantType,
  productQNA
]
