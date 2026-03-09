import { createClient } from '@sanity/client';
import axios from 'axios';

const client = createClient({
  projectId: 'i9lae4hh',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2023-01-01',
});

async function uploadImage(url: string) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const asset = await client.assets.upload('image', buffer, {
      filename: url.split('/').pop(),
    });
    return asset._id;
  } catch (error) {
    console.error('Image upload failed:', url, error);
    return null;
  }
}

async function getOrCreateRef(type: string, name: string) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const existing = await client.fetch(`*[_type == "${type}" && slug.current == "${slug}"][0]`);

  if (existing) return existing._id;

  const doc = await client.create({
    _type: type,
    name: name,
    title: name,
    slug: { _type: 'slug', current: slug },
  });

  return doc._id;
}

async function migrate() {
  try {
    const response = await axios.get('https://dummyjson.com/products');
    const products = response.data.products;

    for (const item of products) {
      console.log(`Migrating: ${item.title}`);

      // Handle Category and Brand References
      const categoryId = await getOrCreateRef('category', item.category);
      const brandId = await getOrCreateRef('brand', item.brand);

      // Handle Images
      const imageAssets = [];
      for (const imgUrl of item.images) {
        const assetId = await uploadImage(imgUrl);
        if (assetId) {
          imageAssets.push({
            _key: Math.random().toString(36).substring(7),
            _type: 'image',
            asset: { _type: 'reference', _ref: assetId },
          });
        }
      }

      // Handle Reviews
      const reviewData = item.reviews.map((rev: any) => ({
        _key: Math.random().toString(36).substring(7),
        _type: 'review',
        reviewerName: rev.reviewerName,
        rating: rev.rating,
        comment: rev.comment,
        date: rev.date,
      }));

      const productDoc = {
        _type: 'product',
        _id: `product-${item.id}`,
        name: item.title,
        slug: { _type: 'slug', current: item.title.toLowerCase().replace(/\s+/g, '-') },
        description: [
          {
            _key: Math.random().toString(36).substring(7),
            _type: 'block',
            children: [{ _key: Math.random().toString(36).substring(7), _type: 'span', text: item.description }],
            markDefs: [],
            style: 'normal',
          },
        ],
        price: item.price,
        discountPercentage: item.discountPercentage,
        rating: item.rating,
        stock: item.stock,
        sku: item.sku,
        barcode: item.meta.barcode,
        category: { _type: 'reference', _ref: categoryId },
        brand: { _type: 'reference', _ref: brandId },
        warranty: item.warrantyInformation,
        shippingInformation: item.shippingInformation,
        availabilityStatus: item.availabilityStatus,
        returnPolicy: item.returnPolicy,
        minimumOrderQuantity: item.minimumOrderQuantity,
        images: imageAssets,
        review: reviewData,
        specifications: {
          weight: item.weight.toString(),
          widthIn: item.dimensions.width,
          heightIn: item.dimensions.height,
          depthIn: item.dimensions.depth,
        },
      };

      await client.createOrReplace(productDoc);
      console.log(`✓ Success: ${item.title}`);
    }
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

migrate();
