import { AGENCIES } from '@/constants/agency'
import { StoreSectionEnum } from '@/constants/store'
import { useAgencyContext } from '@/context/agencies.context'
import { CartActionEnum, useCartContext } from '@/context/cart.context'
import { CompleteItem } from '@/interfaces'
import { Card, Group, Badge, Button, Text, ActionIcon, Tooltip, ThemeIcon } from '@mantine/core'
import {
	IconCoins,
	IconBrandSpotify,
	IconPhotoCirclePlus,
	IconShoppingCartPlus,
	IconShoppingCartMinus,
	IconInfoCircle,
} from '@tabler/icons-react'

type CardItemProps = CompleteItem & {
	sectionId: StoreSectionEnum
}

const CardItem = (item: CardItemProps) => {
	const { price, gain, bonusStatus, condition, name, isBooster, doubleGain } = item

	const { state } = useAgencyContext()
	const { dispatch, cart } = useCartContext()

	const hasBonus = bonusStatus! && bonusStatus.includes(state.defaultAgency!)
	const agencyColor = hasBonus && AGENCIES.find((ag) => ag.value === state.defaultAgency)?.color
	const currentGain = hasBonus ? gain + 4 : gain

	const cartHasItem = cart.find((i) => i.id === item.id)

	return (
		<Card w='23%' shadow='sm'>
			<Text fw={500} size='sm' mt='md' style={{ flexGrow: 2 }}>
				{name}
			</Text>
			<Group p='xs' align='flex-end' justify='space-between'>
				{condition!! && (
					<Tooltip label={condition}>
						<ThemeIcon variant='light' radius='lg' size='sm' color='gray'>
							<IconInfoCircle />
						</ThemeIcon>
					</Tooltip>
				)}
				<Group style={{ flexGrow: 2 }} align='flex-end' justify='flex-end'>
					<Badge
						size='xs'
						variant='gradient'
						gradient={{ from: 'violet', to: 'cyan', deg: 273 }}
						rightSection={<IconCoins size='12' />}>
						{price}
					</Badge>
					<Badge
						size='xs'
						color={hasBonus ? `${agencyColor}` : 'teal'}
						rightSection={isBooster ? <IconBrandSpotify size='12' /> : <IconPhotoCirclePlus size='12' />}>
						{currentGain}
					</Badge>
					{!!doubleGain && (
						<Badge
							size='xs'
							color={hasBonus ? `${agencyColor}` : 'teal'}
							rightSection={<IconPhotoCirclePlus size='12' />}>
							{doubleGain}
						</Badge>
					)}
				</Group>
			</Group>
			{cartHasItem !== undefined ? (
				<Group grow>
					<ActionIcon
						variant='light'
						radius='lg'
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
					<Badge size='lg' variant='light' color='teal'>
						{cartHasItem.quantity}
					</Badge>
					<ActionIcon
						radius='lg'
						variant='light'
						color='lime'
						onClick={() => dispatch({ type: CartActionEnum.INCREASE_QTY, payload: cartHasItem })}>
						<IconShoppingCartPlus size={16} />
					</ActionIcon>
				</Group>
			) : (
				<Button
					size='xs'
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
