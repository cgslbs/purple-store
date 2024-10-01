'use client'
import { StoreProps } from './Store.types'
import { ActionIcon, Button, Grid, Stack, Text, TextInput, Title } from '@mantine/core'
import { IconArrowRight, IconSearch } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import ItemCard from '../ItemCard'

export default function Store({ store }: StoreProps) {
	// TODO: handle the search functionality
	const searchForm = useForm<{ search: string }>()

	return (
		<Stack py='lg' gap='lg'>
			<Button.Group>
				{store.category.map((category) => {
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
			{store.category.map((category) => {
				return (
					<Stack id={category.id.toString()} key={category.id} gap={'sm'}>
						<Title order={1} size={'1.5rem'} tt='uppercase'>
							{category.name}
						</Title>
						<Text c='dimmed' fs='italic' px='sm'>
							{category.description}
						</Text>
						<Grid justify='flex-start' align='stretch'>
							{category.items.map((item) => (
								<Grid.Col key={item.id} span={{ base: 12, md: 6, lg: 4, xl: 3 }}>
									<ItemCard {...item} />
								</Grid.Col>
							))}
						</Grid>
					</Stack>
				)
			})}
		</Stack>
	)
}
