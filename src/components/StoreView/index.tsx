'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStoreByAgency } from './StoreView.queries'
import { Button, Container, Grid, Stack, Tabs, Text, Title } from '@mantine/core'
import { IconReceipt2 } from '@tabler/icons-react'
import ItemCard from './ItemCard'

export default function StoreView() {
	const router = useRouter()

	const { data } = useStoreByAgency()

	// CHECK IF AGENCY IS SELECTED
	useEffect(() => {
		const hasSelectedAgency = localStorage.getItem('agency_code') !== ''
		if (!hasSelectedAgency) {
			router.push('/')
		}
	}, [])

	if (data === undefined) return <div>Something wrong happened</div>

	return (
		<Container>
			<Tabs defaultValue={data.at(0)?.id.toString()}>
				<Tabs.List>
					{data.map((store) => {
						const splitStoreName = store.name.substring(8, store.name.length)
						return (
							<Tabs.Tab key={store.id} value={store.id.toString()} leftSection={<IconReceipt2 />}>
								{splitStoreName.toUpperCase()}
							</Tabs.Tab>
						)
					})}
				</Tabs.List>
				{data.map((store) => {
					return (
						<Tabs.Panel key={store.id} value={store.id.toString()}>
							<Stack py='lg' gap='lg'>
								<Button.Group>
									{store.category.map((category) => {
										return (
											<Button
												variant='light'
												component='a'
												key={`anchor_${category.id}`}
												href={`#${category.id}`}
												fullWidth>
												{category.name}
											</Button>
										)
									})}
								</Button.Group>
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
						</Tabs.Panel>
					)
				})}
			</Tabs>
		</Container>
	)
}
