
import {categoryType }from './categoryType'
import {brandType} from './brandType'
import {collectionType} from './collectionType'
import { productType } from './product/productType'
import { variantType } from './product/variantType'
import { productQNA } from './product/productQNAType'
import { userType } from './Users/UserType'
import { articleCategoryType } from './article/articleCategory'
import { articleType } from './article/articleType'

export const schemaTypes = [
  productType,
  categoryType,
  brandType,
  collectionType,
  variantType,
  productQNA,
  userType,
  articleCategoryType,
  articleType,
]
