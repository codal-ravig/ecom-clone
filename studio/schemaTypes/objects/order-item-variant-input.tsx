import React, {useCallback, useEffect, useState} from 'react'
import {set, unset, useFormValue, useClient} from 'sanity'
import type {StringInputProps} from 'sanity'

type ProductOption = {
  name?: string
  values?: string[]
}

function cartesian(arrays: string[][]): string[][] {
  return arrays.reduce<string[][]>(
    (acc, curr) => acc.flatMap((existing) => curr.map((val) => [...existing, val])),
    [[]],
  )
}

export function OrderItemVariantInput(props: StringInputProps) {
  const {value, onChange, readOnly, path} = props
  const client = useClient({apiVersion: '2023-01-01'})

  // Get the product reference from the current orderItem (sibling to this field)
  const parentPath = path.slice(0, -1)
  const productRef = useFormValue([...parentPath, 'product']) as { _ref: string } | undefined
  
  const [options, setOptions] = useState<ProductOption[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!productRef?._ref) {
      setOptions([])
      return
    }

    setLoading(true)
    const query = `*[_id == $id || _id == "drafts." + $id][0].options`
    const params = {id: productRef._ref.replace('drafts.', '')}

    client.fetch(query, params).then((res) => {
      setOptions(res || [])
      setLoading(false)
    }).catch(err => {
      console.error('Error fetching product options:', err)
      setLoading(false)
    })
  }, [productRef?._ref, client])

  const validOptions = (options ?? []).filter(
    (opt) => opt?.name && Array.isArray(opt?.values) && opt.values.length > 0,
  )

  const combinations: Array<{title: string; value: string}> =
    validOptions.length > 0
      ? cartesian(validOptions.map((opt) => opt.values as string[])).map((combo) => {
          const label = combo.join(' / ')
          return {title: label, value: label.toLowerCase().replace(/\s*\/\s*/g, '-')}
        })
      : []

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const val = event.currentTarget.value
      onChange(val ? set(val) : unset())
    },
    [onChange],
  )

  if (!productRef?._ref) {
    return (
      <p style={{fontSize: '0.85em', color: 'var(--card-muted-fg-color)', margin: '0.5em 0'}}>
        ⚠️ Please select a product first to pick a variant.
      </p>
    )
  }

  if (loading) {
    return <p style={{fontSize: '0.85em', color: 'var(--card-muted-fg-color)', margin: '0.5em 0'}}>Loading variants...</p>
  }

  if (validOptions.length === 0) {
    return (
      <p style={{fontSize: '0.85em', color: 'var(--card-muted-fg-color)', margin: '0.5em 0'}}>
        This product has no variants defined.
      </p>
    )
  }

  return (
    <select
      value={value ?? ''}
      onChange={handleChange}
      disabled={readOnly ?? false}
      style={{
        width: '100%',
        padding: '0.6em 0.75em',
        fontSize: '0.9em',
        borderRadius: 4,
        border: '1px solid var(--card-border-color)',
        background: 'var(--card-bg-color)',
        color: 'var(--card-fg-color)',
        cursor: readOnly ? 'not-allowed' : 'pointer',
      }}
    >
      <option value="">— Select a variant —</option>
      {combinations.map((combo) => (
        <option key={combo.value} value={combo.value}>
          {combo.title}
        </option>
      ))}
    </select>
  )
}
