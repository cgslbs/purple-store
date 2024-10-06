'use client'
import { StoreProps } from './Store.types'
import { ActionIcon, Button, Grid, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconArrowRight, IconSearch } from '@tabler/icons-react'
import { useForm, useWatch } from 'react-hook-form'
import ItemCard from '../ItemCard'
import { useMemo } from 'react'

export default function Store({ store }: StoreProps) {
	const searchForm = useForm<{ search: string }>()
	const currSearch = useWatch({
		control: searchForm.control,
		name: 'search',
	})

	const filteredSearch = useMemo(() => {
		if (currSearch !== undefined) {
			// filter items
			return store.category.map((category) => {
				return {
					...category,
					items: category.items.filter((item) =>
						item.name.trim().toLowerCase().includes(currSearch.trim().toLowerCase())
					),
				}
			})
		}

		return store.category
	}, [currSearch, store.category])

	return (
		<Stack py='lg' gap='lg'>
			<Button.Group>
				{filteredSearch.map((category) => {
					return (
						<Button variant='light' component='a' key={`anchor_${category.id}`} href={`#${category.id}`} fullWidth>
							{category.name}
						</Button>
					)
				})}
			</Button.Group>
			<TextInput
				radius='xl'
				size='md'
				placeholder='Search item'
				rightSectionWidth={42}
				leftSection={<IconSearch style={{ width: '1.125rem', height: '1.125rem' }} stroke={1.5} />}
				rightSection={
					<ActionIcon size={32} radius='xl' variant='filled'>
						<IconArrowRight style={{ width: '1.125rem', height: '1.125rem' }} stroke={1.5} />
					</ActionIcon>
				}
				{...searchForm.register('search')}
			/>
			{filteredSearch.map((category, idx) => {
				return (
					<Stack id={category.id.toString()} key={`KEY_CATEGORY_${category.id}_${idx}`} gap={'sm'}>
						<Title order={1} size={'1.5rem'} tt='uppercase'>
							{category.name}
						</Title>
						<Text c='dimmed' fs='italic' px='sm'>
							{category.description}
						</Text>
						<Grid justify='flex-start' align='stretch'>
							{category.items.map((item, idx) => (
								<Grid.Col key={`KEY_COL_${category.id}_${item.id}_${idx}`} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
									<ItemCard {...item} idx={idx} />
								</Grid.Col>
							))}
						</Grid>
					</Stack>
				)
			})}
		</Stack>
	)
}
