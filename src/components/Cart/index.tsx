'use client'

import { CartActionEnum, CartItemType, useCartContext } from '@/context/cart.context'
import {
	ActionIcon,
	Button,
	Container,
	Group,
	NumberFormatter,
	ScrollArea,
	Stack,
	Table,
	Text,
	Title,
} from '@mantine/core'
import { IconArrowBack, IconMinus, IconPlus, IconX } from '@tabler/icons-react'
import { ItemGainType } from '@/constants/item'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const RemoveItem = (item: CartItemType) => {
	const { dispatch } = useCartContext()
	return (
		<ActionIcon
			variant='subtle'
			color='gray'
			onClick={() => dispatch({ type: CartActionEnum.REMOVE_FROM_CART, payload: item })}>
			<IconX size={'1rem'} />
		</ActionIcon>
	)
}

const QuantityCounter = (item: CartItemType) => {
	const { dispatch } = useCartContext()

	return (
		<Group
			wrap='nowrap'
			justify='space-around'
			grow
			style={(theme) => ({ border: `1px solid ${theme.colors.gray[3]}`, borderRadius: '5rem', overflow: 'hidden' })}>
			<ActionIcon
				radius={0}
				variant='transparent'
				c={'dark'}
				disabled={item.quantity === 1}
				onClick={() => {
					dispatch({ type: CartActionEnum.DECREASE_QTY, payload: item })
				}}>
				<IconMinus size={'1rem'} />
			</ActionIcon>
			<Text ta={'center'} size='sm'>
				{item.quantity}
			</Text>
			<ActionIcon
				radius={0}
				variant='transparent'
				c={'dark'}
				onClick={() => dispatch({ type: CartActionEnum.INCREASE_QTY, payload: item })}>
				<IconPlus size={'1rem'} />
			</ActionIcon>
		</Group>
	)
}

const ProductRow = (item: CartItemType) => {
	return (
		<Table.Tr>
			<Table.Td>{item.name}</Table.Td>
			<Table.Td>
				<QuantityCounter {...item} />
			</Table.Td>
			<Table.Td>{item.price}</Table.Td>
			<Table.Td>
				{item.gain}
				{item.gainType === ItemGainType.XP ? 'XP' : ' streams'}
				{item.doubleGain !== null && `& ${item.doubleGain} streams`}
			</Table.Td>
			<Table.Td>
				{item.doubleGain !== null
					? `${item.gain * item.quantity}XP ${item.doubleGain * item.quantity} streams`
					: `${item.gain * item.quantity}XP`}
			</Table.Td>
			<Table.Td>{item.quantity * item.price}pts</Table.Td>
			<Table.Td>
				<RemoveItem {...item} />
			</Table.Td>
		</Table.Tr>
	)
}

const Total = () => {
	const { totalGain, totalStream, totalPrice, totalDoubleGain } = useCartContext()

	return (
		<Group>
			<Text fw={600}>Total:</Text>
			<NumberFormatter suffix='points' thousandSeparator value={totalPrice} />
			{totalGain > 0 && <NumberFormatter suffix='XP' thousandSeparator value={totalGain} />}
			{totalStream > 0 && <NumberFormatter suffix='streams' thousandSeparator value={totalStream} />}
			{totalDoubleGain > 0 && <NumberFormatter suffix='streams' thousandSeparator value={totalDoubleGain} />}
		</Group>
	)
}

export default function ShoppingCart() {
	const router = useRouter()
	const { cart } = useCartContext()

	const projectForm = useForm()

	return (
		<Container>
			<Group pt='lg'>
				<Stack>
					<Title order={1} size={'2.25rem'}>
						Shopping Cart.
					</Title>
					<ScrollArea h={'35vh'}>
						<Table miw={700}>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>Item</Table.Th>
									<Table.Th>Quantité</Table.Th>
									<Table.Th>Gain</Table.Th>
									<Table.Th>Prix</Table.Th>
									<Table.Th>Gain Total</Table.Th>
									<Table.Th>Prix Total</Table.Th>
									<Table.Th></Table.Th>
								</Table.Tr>
							</Table.Thead>
							<Table.Tbody>
								{cart.map((item) => (
									<ProductRow key={`tr_${item.id}`} {...item} />
								))}
							</Table.Tbody>
						</Table>
					</ScrollArea>
					<Group justify='space-between'>
						<Button
							radius='xl'
							leftSection={<IconArrowBack size={'1rem'} />}
							onClick={() => {
								router.push('/store')
							}}>
							Retour à la boutique
						</Button>
						<Total />
					</Group>
				</Stack>
				<Stack>
					<Title order={1} size={'2.25rem'}>
						Project.
					</Title>
				</Stack>
			</Group>
		</Container>
	)
}

// import { CartActionEnum, CartItemType, useCartContext } from '@/context/cart.context'
// import { CodeHighlight } from '@mantine/code-highlight'
// import {
// 	ActionIcon,
// 	Anchor,
// 	Button,
// 	Group,
// 	NumberFormatter,
// 	Stack,
// 	Text,
// 	TextInput,
// 	Tooltip,
// 	useMantineTheme,
// } from '@mantine/core'
// import {
// 	IconArrowBackUpDouble,
// 	IconLink,
// 	IconMicrophone2,
// 	IconMinus,
// 	IconPlus,
// 	IconShoppingCartOff,
// 	IconTrash,
// 	IconX,
// } from '@tabler/icons-react'
// import moment from 'moment'
// import { DispatchWithoutAction, useReducer, useState } from 'react'
// import { useForm } from 'react-hook-form'

// const TotalCodeHighlight = () => {
// 	const { totalPrice, totalGain, totalStream, totalDoubleGain, cart } = useCartContext()
// 	const theme = useMantineTheme()
// 	const itemList: () => string = () => {
// 		// item, 00pts & 0xp.
// 		let items = ''
// 		cart.map((item) => {
// 			items += `${item.name}, ${item.price}pts & ${item.gain} ${item.isBooster ? `streams` : `xp`} ${
// 				item.isBooster && item.doubleGain !== undefined ? `+ ${item.doubleGain}xp` : ``
// 			}${
// 				item.quantity > 1
// 					? `*${item.quantity} = ${item.price * item.quantity}pts & ${item.gain * item.quantity}${
// 							item.isBooster ? ` streams` : `xp`
// 					  } ${item.isBooster && item.doubleGain !== undefined ? `+ ${item.doubleGain * item.quantity}xp` : ``}`
// 					: ``
// 			}\n`
// 		})

// 		return items
// 	}

// 	const total: () => string = () => {
// 		// Total: XXpts, XXxp & XXstreams.
// 		let gainedExp = ``

// 		const totalXP = () => {
// 			if (totalGain > 0 && totalDoubleGain > 0) {
// 				return totalGain + totalDoubleGain
// 			}
// 			if (totalDoubleGain > 0) return totalDoubleGain
// 			return totalGain
// 		}
// 		console.log('Total', totalDoubleGain)

// 		gainedExp += `${totalXP()}xp`

// 		if (totalStream > 0) {
// 			if (gainedExp.length !== 0) {
// 				gainedExp += ` & `
// 			}
// 			gainedExp += `${totalStream / 1000}k streams`
// 		}

// 		return `Total : ${totalPrice}pts, ${gainedExp}`
// 	}

// 	const historyCode: () => string = () => {
// 		// [code]<u4>0000</u4>, item (artiste, chanson - mois année), <xp>0 XP</xp>.[/code]
// 		const currentDate = `${moment().format('DDMM')}`

// 		let itemsHistory = ''

// 		cart
// 			.filter((i) => !i.isBooster)
// 			.map((i, idx) => {
// 				let itemDetail = ''
// 				if (i.title && i.artist && i.releaseDate) {
// 					itemDetail += ` ('${i.title}', ${i.artist} - ${i.releaseDate})`
// 				}
// 				if (i.title && i.link) {
// 					itemDetail += ` ([url=${i.link}]${i.title}[/url] )`
// 				}
// 				itemsHistory += `${i.name}${i.quantity > 1 ? ` *${i.quantity}` : ''},${itemDetail} <xp>${
// 					i.gain * i.quantity
// 				}</xp>${idx !== cart.length - 1 ? ` \n` : ``}`
// 			})

// 		const doubleGainItems = cart.filter((i) => i.isBooster && i.doubleGain !== undefined)
// 		const sumBoosters = cart
// 			.filter((i) => i.isBooster)
// 			.reduce((prvValue, cartItem) => {
// 				return prvValue + cartItem.quantity
// 			}, 0)

// 		if (sumBoosters > 0) {
// 			if (doubleGainItems.length > 0) {
// 				doubleGainItems.map((i, idx) => {
// 					let itemDetail = ''
// 					if (i.title && i.artist && i.releaseDate) {
// 						itemDetail += ` ('${i.title}', ${i.artist} - ${i.releaseDate})`
// 					}
// 					itemsHistory += `${i.name},${itemDetail} <xp>${i.doubleGain! * i.quantity}</xp>${
// 						idx != doubleGainItems.length ? `\n` : ``
// 					}`
// 				})
// 			}
// 			itemsHistory += `boosters * ${sumBoosters}, <xp>${totalStream / 1000}k streams</xp>`
// 		}

// 		return `[code]<u4>${currentDate}</u4>, ${itemsHistory}.[/code]`
// 	}

// 	const code = `${itemList()}\n${total()}\n${historyCode()}`

// 	return <CodeHighlight c='dark' style={{ backgroundColor: theme.colors.gray[1] }} code={code} />
// }

// const CartItem = (item: CartItemType) => {
// 	const { dispatch } = useCartContext()
// 	const [showOption, toggleOption] = useReducer((s) => !s, false)
// 	const [isSong, setIsSong] = useState(false)

// 	return (
// 		<Stack gap='xs'>
// 			<Text fw={500}>{item.name}</Text>
// 			<Text c='dimmed' size='sm'>
// 				{item.price}pts &{' '}
// 				<NumberFormatter suffix={item.isBooster ? 'streams' : 'xp'} value={item.gain} thousandSeparator />{' '}
// 				{item.isBooster && !!item.doubleGain && (
// 					<NumberFormatter suffix={'xp'} value={item.doubleGain} thousandSeparator />
// 				)}
// 			</Text>
// 			{!!item.title && item.artist && (
// 				<Text fs='italic' size='xs'>
// 					{item.title}, {item.artist} - {item.releaseDate}
// 				</Text>
// 			)}
// 			{!!item.title && !!item.link && (
// 				<Anchor size='xs' href={item.link} target='_blank' underline='never'>
// 					{item.title}
// 				</Anchor>
// 			)}
// 			{!showOption && !item.isBooster && (
// 				<Group>
// 					<Tooltip label='Associer une chanson'>
// 						<ActionIcon
// 							c='dark'
// 							variant='light'
// 							onClick={() => {
// 								toggleOption(), setIsSong(true)
// 							}}>
// 							<IconMicrophone2 size={16} />
// 						</ActionIcon>
// 					</Tooltip>
// 					<Tooltip label='Associer un lien'>
// 						<ActionIcon
// 							c='dark'
// 							variant='light'
// 							onClick={() => {
// 								toggleOption(), setIsSong(false)
// 							}}>
// 							<IconLink size={16} />
// 						</ActionIcon>
// 					</Tooltip>
// 				</Group>
// 			)}
// 			{showOption && <OptionForm item={item} isSongForm={isSong} toggleOption={toggleOption} />}
// 			<Group justify='flex-end'>
// 				<QtySelector {...item} />
// 				<ActionIcon
// 					variant='subtle'
// 					color='dark'
// 					onClick={() => dispatch({ type: CartActionEnum.REMOVE_FROM_CART, payload: item })}>
// 					<IconTrash size={16} />
// 				</ActionIcon>
// 			</Group>
// 		</Stack>
// 	)
// }

// export function Cart() {
// 	const { dispatch, cart } = useCartContext()
// 	const [itemValid, toggleValid] = useReducer((s) => !s, false)

// 	return (
// 		<Stack>
// 			{itemValid ? (
// 				<Stack>
// 					<Group justify='flex-start'>
// 						<ActionIcon variant='outline' onClick={toggleValid}>
// 							<IconArrowBackUpDouble size={16} />
// 						</ActionIcon>
// 					</Group>
// 					<TotalCodeHighlight />
// 				</Stack>
// 			) : (
// 				<>
// 					<Stack style={{ overflowY: 'auto' }} h={'80vh'} gap='xs'>
// 						{cart.map((item) => {
// 							return <CartItem key={item.id} {...item} />
// 						})}
// 					</Stack>
// 					<Group>
// 						<Button style={{ flexGrow: 2 }} color='dark' onClick={toggleValid}>
// 							Valider les achats
// 						</Button>
// 						<ActionIcon
// 							size='lg'
// 							radius='sm'
// 							variant='outline'
// 							color='dark'
// 							onClick={() => {
// 								dispatch({ type: CartActionEnum.CLEAR })
// 							}}>
// 							<IconShoppingCartOff size={18} />
// 						</ActionIcon>
// 					</Group>
// 				</>
// 			)}
// 		</Stack>
// 	)
// }
