'use client'
import { IItem } from '@/interfaces'
import { Accordion, ActionIcon, Badge, Button, Card, Group, Stack, Text } from '@mantine/core'
import {
	IconArrowBadgeUpFilled,
	IconCoin,
	IconInfoCircle,
	IconMinus,
	IconPlus,
	IconWorldUpload,
} from '@tabler/icons-react'
import { useState } from 'react'
import classes from './ItemCard.module.css'
import { CartActionEnum, useCartContext } from '@/context/cart.context'
import { ItemGainType } from '@/constants/item'

export default function ItemCard(item: IItem) {
	const { dispatch, cart } = useCartContext()
	const [accordionValue, setAccordionValue] = useState<string | null>(null)
	const itemInCart = cart.find((i) => i.id === item.id)

	return (
		<Card shadow='sm' padding='lg' withBorder component={Stack} h={'100%'} justify='space-between'>
			<Stack>
				<Text size={'1.25rem'} className={classes.itemName}>
					{item.name}
				</Text>
				{item.condition !== '' && (
					<Accordion value={accordionValue} onChange={setAccordionValue}>
						<Accordion.Item key={item.id} value={item.id.toString()}>
							<Accordion.Control icon={<IconInfoCircle size={'1rem'} />}>Condition</Accordion.Control>
							<Accordion.Panel>{item.condition}</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				)}
			</Stack>
			<Stack>
				<Group justify='flex-end'>
					<Badge
						variant='gradient'
						gradient={{ from: 'blue', to: 'violet', deg: 90 }}
						rightSection={<IconCoin size={'0.75rem'} />}>
						{item.price}
					</Badge>
					<Badge
						color='pink'
						rightSection={
							item.gainType === ItemGainType.XP ? (
								<IconArrowBadgeUpFilled size={'0.75rem'} />
							) : (
								<IconWorldUpload size={'0.75rem'} />
							)
						}>
						{item.gain}
					</Badge>
				</Group>
				{itemInCart !== undefined ? (
					<Group
						wrap='nowrap'
						justify='space-around'
						style={(theme) => ({ border: `1px solid ${theme.colors.gray[3]}`, borderRadius: '5rem' })}>
						<ActionIcon
							variant='transparent'
							c={'dark'}
							onClick={() => {
								if (itemInCart.quantity === 1) {
									dispatch({ type: CartActionEnum.REMOVE_FROM_CART, payload: itemInCart })
									return
								}
								dispatch({ type: CartActionEnum.DECREASE_QTY, payload: itemInCart })
							}}>
							<IconMinus size={'1rem'} />
						</ActionIcon>
						<Text size='sm'>{itemInCart.quantity}</Text>
						<ActionIcon
							variant='transparent'
							c={'dark'}
							onClick={() => dispatch({ type: CartActionEnum.INCREASE_QTY, payload: itemInCart })}>
							<IconPlus size={'1rem'} />
						</ActionIcon>
					</Group>
				) : (
					<Button onClick={() => dispatch({ type: CartActionEnum.ADD_TO_CART, payload: { ...item, quantity: 1 } })}>
						Ajouter au panier
					</Button>
				)}
			</Stack>
		</Card>
	)
}
