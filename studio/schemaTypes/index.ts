
import {categoryType }from './categoryType'
import {brandType} from './brandType'
import {collectionType} from './collectionType'
import { productType } from './product/productType'
import { variantType } from './product/variantType'
import { productQNA } from './product/productQNAType'
import { userType } from './Users/UserType'
import { articleCategoryType } from './article/articleCategory'
import { articleType } from './article/articleType'
import { pageType } from './page/pageType'
import { heroSection } from './page/sections/heroSection'
import { textSection } from './page/sections/textSection'
import { infoSection } from './page/sections/infoSection'
import { faqSection } from './page/sections/faqSection'
import { featuredArticlesSection } from './page/sections/featuredArticlesSection'
import { featuredProductsSection } from './page/sections/featuredProductsSection'
import { contactHeroSection } from './page/sections/contactHeroSection'
import { gridSection } from './page/sections/gridSection'
import { headerType } from './settings/headerType'
import { footerType } from './settings/footerType'

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
  pageType,
  heroSection,
  textSection,
  infoSection,
  faqSection,
  featuredArticlesSection,
  featuredProductsSection,
  contactHeroSection,
  gridSection,
  headerType,
  footerType,
]
