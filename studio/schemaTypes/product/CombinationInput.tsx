import React, {useCallback} from 'react'
import {set, unset, useFormValue} from 'sanity'
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

export function CombinationInput(props: StringInputProps) {
  const {value, onChange, readOnly} = props
  const options = useFormValue(['options']) as ProductOption[] | undefined
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

  if (validOptions.length === 0) {
    return (
      <p
        style={{
          margin: 0,
          padding: '0.75em 1em',
          background: 'var(--card-bg-color)',
          border: '1px solid var(--card-border-color)',
          borderRadius: 4,
          fontSize: '0.85em',
          color: 'var(--card-muted-fg-color)',
        }}
      >
        ⚠️ No product options defined yet. Add <strong>Size</strong>, <strong>Color</strong>, etc.
        above first — combinations will appear here automatically.
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
      <option value="">— Select a combination —</option>
      {combinations.map((combo) => (
        <option key={combo.value} value={combo.value}>
          {combo.title}
        </option>
      ))}
    </select>
  )
}
