'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStoreByAgency } from './StoreView.queries'
import { Container, Stack, Tabs } from '@mantine/core'
import { IconReceipt2 } from '@tabler/icons-react'
import Store from './Store'

export default function Stores() {
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
			<Stack>
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
									<Store store={store} />
								</Stack>
							</Tabs.Panel>
						)
					})}
				</Tabs>
			</Stack>
		</Container>
	)
}
