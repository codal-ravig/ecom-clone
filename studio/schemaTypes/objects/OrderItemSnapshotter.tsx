import React, {useEffect} from 'react'
import {set, useFormValue, useClient} from 'sanity'
import type {ObjectInputProps} from 'sanity'
import {Box, Text} from '@sanity/ui'

export function OrderItemSnapshotter(props: ObjectInputProps) {
  const {onChange, path} = props
  const client = useClient({apiVersion: '2023-01-01'})

  // Get current values
  const parentPath = path.slice(0, -1)
  const productRef = useFormValue([...parentPath, 'product']) as { _ref: string } | undefined
  const variant = useFormValue([...parentPath, 'variant']) as string | undefined
  
  // Get existing snapshot values to avoid infinite loops
  const existingName = useFormValue([...parentPath, 'snapshotName'])
  const existingPrice = useFormValue([...parentPath, 'price'])
  const existingSku = useFormValue([...parentPath, 'snapshotSku'])
  const existingImage = useFormValue([...parentPath, 'snapshotImage'])

  useEffect(() => {
    if (!productRef?._ref) return

    const fetchProductData = async () => {
      const query = `*[_id == $id || _id == "drafts." + $id][0]{
        name,
        price,
        sku,
        "image": images[0],
        variants[combination == $variant || combinationLower == $variant][0]{
          name,
          price,
          sku,
          "image": images[0]
        }
      }`
      
      const variantLower = variant?.toLowerCase().replace(/\s*\/\s*/g, '-')
      const params = {
        id: productRef._ref.replace('drafts.', ''),
        variant: variantLower || ''
      }

      try {
        const data = await client.fetch(query, params)
        if (!data) return

        const targetData = data.variants || data
        const finalPrice = targetData.price ?? data.price
        const finalName = targetData.name ? `${data.name} (${targetData.name})` : (variant ? `${data.name} (${variant})` : data.name)
        const finalSku = targetData.sku ?? data.sku
        const finalImage = targetData.image ?? data.image

        const patches = []
        if (finalName !== existingName) patches.push(set(finalName, ['snapshotName']))
        if (finalPrice !== existingPrice) patches.push(set(finalPrice, ['price']))
        if (finalSku !== existingSku) patches.push(set(finalSku, ['snapshotSku']))
        
        // Deep compare or just update image if missing
        if (!existingImage && finalImage) {
           patches.push(set(finalImage, ['snapshotImage']))
        }

        if (patches.length > 0) {
          onChange(patches)
        }
      } catch (err) {
        console.error('Snapshotter error:', err)
      }
    }

    fetchProductData()
  }, [productRef?._ref, variant, client, onChange, existingName, existingPrice, existingSku, existingImage])

  return null // This is a background automation component
}
