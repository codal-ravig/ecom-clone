import { groq } from 'sanity'

export const productWithVariantValues = groq`*[_type == 'product']{
  name,
    price,
  "totalCount": count(review.userReviews),
  "avgStar": select(
    count(review.userReviews) > 0 =>
      round(
        math::sum(review.userReviews[].review) /
        count(review.userReviews),
        3
      ),
    0
  ),
    "variants": variant[]->{
    name,
    "key": key.current,
    "values": values[]{
    price, value
    },
  },
}`

export const productVariantData = groq`*[_type == 'product']{
  name,
    price,
  "totalCount": count(review.userReviews),
  "avgStar": select(
    count(review.userReviews) > 0 =>
      round(
        math::sum(review.userReviews[].review) /
        count(review.userReviews),
        3
      ),
    0
  ),
    "variants": variant[]->{
    name,
    "key": key.current,
    values
  },
}`