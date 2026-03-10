import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { Autocomplete, Stack, Text, Card, Spinner, Flex, Avatar, Box } from '@sanity/ui'
import { set, unset, type StringInputProps } from 'sanity'

interface PetTypeOption {
  id: string
  name: string
  image: string
}

export function PetTypeInput(props: StringInputProps) {
  const { value, onChange, readOnly } = props
  const [options, setOptions] = useState<PetTypeOption[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function fetchPetTypes() {
      try {
        setLoading(true)
        
        await new Promise(resolve => setTimeout(resolve, 800)) 
        
        const petData: PetTypeOption[] = [
          { id: 'dog', name: 'Dog', image: 'https://cdn-icons-png.flaticon.com/512/616/616408.png' },
          { id: 'cat', name: 'Cat', image: 'https://cdn-icons-png.flaticon.com/512/616/616430.png' },
          { id: 'fish', name: 'Fish', image: 'https://cdn-icons-png.flaticon.com/512/616/616421.png' },
          { id: 'bird', name: 'Bird', image: 'https://cdn-icons-png.flaticon.com/512/616/616412.png' },
          { id: 'reptile', name: 'Reptile', image: 'https://cdn-icons-png.flaticon.com/512/616/616428.png' },
          { id: 'small-pet', name: 'Small Pet', image: 'https://cdn-icons-png.flaticon.com/512/616/616417.png' },
        ]

        if (isMounted) {
          setOptions(petData)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load pet types')
          setLoading(false)
        }
      }
    }

    fetchPetTypes()
    return () => { isMounted = false }
  }, [])

  const handleSelect = useCallback(
    (nextValue: string) => {
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange]
  )

  const autocompleteOptions = useMemo(() => 
    options.map(opt => ({
      value: opt.id,
      payload: opt
    })), [options])

  const renderOption = useCallback((option: { value: string; payload: PetTypeOption }) => (
    <Card as="button" padding={2}>
      <Flex align="center">
        <Avatar src={option.payload.image} size={1} />
        <Box flex={1} marginLeft={3}>
          <Text size={1}>{option.payload.name}</Text>
        </Box>
      </Flex>
    </Card>
  ), [])

  if (loading) {
    return (
      <Flex align="center" justify="center" padding={3}>
        <Spinner muted />
        <Box marginLeft={2}><Text size={1} muted>Loading Pet Types...</Text></Box>
      </Flex>
    )
  }

  return (
    <Stack space={3}>
      <Autocomplete
        id="pet-type-autocomplete"
        options={autocompleteOptions}
        value={value || ''}
        onSelect={handleSelect}
        readOnly={readOnly}
        placeholder="Type to search pet types (Dog, Cat...)"
        renderOption={renderOption}
        filterOption={(query, option) => 
          option.payload.name.toLowerCase().includes(query.toLowerCase())
        }
      />
      {error && <Text size={1} muted>{error}</Text>}
    </Stack>
  )
}
