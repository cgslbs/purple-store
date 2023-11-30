import { AGENCIES } from '@/constants/agency'
import { StoreSectionEnum } from '@/constants/store'
import { useAgencyContext } from '@/context/agencies.context'
import { CartActionEnum, useCartContext } from '@/context/cart.context'
import { CompleteItem } from '@/interfaces'
import { Card, Group, Badge, Button, Text, ActionIcon } from '@mantine/core'
import {
	IconCoins,
	IconBrandSpotify,
	IconPhotoCirclePlus,
	IconShoppingCartPlus,
	IconShoppingCartMinus,
} from '@tabler/icons-react'

type CardItemProps = CompleteItem & {
	sectionId: StoreSectionEnum
}

const CardItem = (item: CardItemProps) => {
	const { price, gain, bonusStatus, condition, name, isBooster } = item

	const { state } = useAgencyContext()
	const { dispatch, cart } = useCartContext()

	const hasBonus = bonusStatus! && bonusStatus.includes(state.defaultAgency!)
	const agencyColor = hasBonus && AGENCIES.find((ag) => ag.value === state.defaultAgency)?.color
	const currentGain = hasBonus ? gain + 4 : gain

	const cartHasItem = cart.find((i) => i.id === item.id)

	return (
		<Card w='30%' shadow='sm' style={{ justifyContent: 'space-between' }}>
			<Text fw={500} size='lg' mt='md'>
				{name}
			</Text>

			{condition!! && (
				<Text mt='xs' c='dimmed' size='xs' style={{ flexGrow: 2 }}>
					{condition}
				</Text>
			)}
			<Group p='xs' align='flex-end' justify='flex-end' style={{ flexGrow: 2 }}>
				<Badge
					size='md'
					variant='gradient'
					gradient={{ from: 'violet', to: 'cyan', deg: 273 }}
					rightSection={<IconCoins size='12' />}>
					{price}
				</Badge>
				<Badge
					size='md'
					color={hasBonus ? `${agencyColor}` : 'teal'}
					rightSection={isBooster ? <IconBrandSpotify size='12' /> : <IconPhotoCirclePlus size='12' />}>
					{currentGain}
				</Badge>
			</Group>
			{cartHasItem !== undefined ? (
				<Group grow>
					<ActionIcon
						variant='light'
						color='red'
						onClick={() => {
							if (cartHasItem.quantity === 1) {
								dispatch({ type: CartActionEnum.REMOVE_FROM_CART, payload: cartHasItem })
								return
							}
							dispatch({ type: CartActionEnum.DECREASE_QTY, payload: cartHasItem })
						}}>
						<IconShoppingCartMinus size={16} />
					</ActionIcon>
					<Badge variant='light' color='teal'>
						{cartHasItem.quantity}
					</Badge>
					<ActionIcon
						variant='light'
						color='lime'
						onClick={() => dispatch({ type: CartActionEnum.INCREASE_QTY, payload: cartHasItem })}>
						<IconShoppingCartPlus size={16} />
					</ActionIcon>
				</Group>
			) : (
				<Button
					color='teal'
					variant='light'
					fullWidth
					mt='md'
					radius='md'
					onClick={() => dispatch({ type: CartActionEnum.ADD_TO_CART, payload: item })}>
					Ajouter au panier
				</Button>
			)}
		</Card>
	)
}

export default CardItem
