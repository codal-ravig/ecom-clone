import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { MenuButton, Menu, MenuItem, Stack, Text, Spinner, Flex, Avatar, Box, Button } from '@sanity/ui'
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

  const selectedOption = useMemo(() => 
    options.find(opt => opt.id === value), [options, value])

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
      <MenuButton
        id="pet-type-menu-button"
        button={
          <Button
            mode="ghost"
            text={selectedOption ? selectedOption.name : "Select pet type..."}
            icon={selectedOption ? <Avatar src={selectedOption.image} size={1} /> : undefined}
            disabled={readOnly}
            style={{ width: '100%', textAlign: 'left' }}
          />
        }
        menu={
          <Menu>
            {options.map((option) => (
              <MenuItem
                key={option.id}
                text={option.name}
                icon={<Avatar src={option.image} size={1} />}
                onClick={() => handleSelect(option.id)}
              />
            ))}
            {value && (
              <MenuItem
                text="Clear selection"
                tone="critical"
                onClick={() => handleSelect('')}
              />
            )}
          </Menu>
        }
        popover={{ portal: true, matchReferenceWidth: true }}
      />
      {error && <Text size={1} muted>{error}</Text>}
    </Stack>
  )
}
