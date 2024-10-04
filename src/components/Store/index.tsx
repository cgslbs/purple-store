import { Container, Drawer } from '@mantine/core'
import { useCartContext } from '@/context/cart.context'
import { Cart } from '../Cart'
import { StoreView } from './StoreView'

export function MainStore() {
	const { isOpened, toggleCart } = useCartContext()

	return (
		<Container size='md'>
			<Drawer opened={isOpened} onClose={() => toggleCart()} title='Panier' position='right'>
				<Cart />
			</Drawer>
			<StoreView />
		</Container>
	)
}
