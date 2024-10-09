'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useStoreByAgency } from './StoreView.queries'
import { Container, LoadingOverlay, ScrollArea, Stack, Tabs } from '@mantine/core'
import { IconReceipt2 } from '@tabler/icons-react'
import Store from './Store'
import Header from '../Header'
import React from 'react'

export default function Stores() {
	const router = useRouter()
	const { data, isFetching, isLoading } = useStoreByAgency()

	// CHECK IF AGENCY IS SELECTED
	useEffect(() => {
		const hasSelectedAgency = localStorage.getItem('agency_code') !== ''
		if (!hasSelectedAgency) {
			router.push('/')
		}
	}, [])

	if (isFetching || isLoading)
		return <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
	if (data === undefined) return <div>Something wrong happened</div>

	return (
		<>
			<Header />
			<Container size='lg'>
				<Stack>
					<Tabs variant='outline' defaultValue={data.at(0)?.id.toString()}>
						<Tabs.List>
							{data.map((store) => {
								const splitStoreName = store.name.substring(8, store.name.length)
								return (
									<Tabs.Tab
										key={`KEY_TAB_${store.id}`}
										value={store.id.toString()}
										leftSection={<IconReceipt2 size={'1rem'} />}>
										{splitStoreName.toUpperCase()}
									</Tabs.Tab>
								)
							})}
						</Tabs.List>
						{data.map((store) => {
							return (
								<Tabs.Panel key={`KEY_TABPANEL_${store.id}`} value={store.id.toString()}>
									<ScrollArea h='90vh' offsetScrollbars>
										<Stack gap='lg'>
											<Store store={store} />
										</Stack>
									</ScrollArea>
								</Tabs.Panel>
							)
						})}
					</Tabs>
				</Stack>
			</Container>
		</>
	)
}
