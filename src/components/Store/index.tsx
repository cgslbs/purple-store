'use client'

import { Container, Drawer } from '@mantine/core'
import { GroupStoreView } from './GroupStore'
import { useCartContext } from '@/context/cart.context'
import { Cart } from '../Cart'

export function MainStore() {
	// TODO: handle view according to current tab
	const { isOpened, toggleCart } = useCartContext()
	return (
		<Container size='md'>
			<Drawer opened={isOpened} onClose={() => toggleCart()} title='Panier' position='right'>
				<Cart />
			</Drawer>
			<GroupStoreView />
		</Container>
	)
}
