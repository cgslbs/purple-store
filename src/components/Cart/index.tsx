'use client'

import { CartActionEnum, CartItemType, useCartContext } from '@/context/cart.context'
import { CodeHighlight } from '@mantine/code-highlight'
import {
	ActionIcon,
	Button,
	Group,
	NumberFormatter,
	Stack,
	Text,
	TextInput,
	Tooltip,
	useMantineTheme,
} from '@mantine/core'
import {
	IconArrowBackUpDouble,
	IconLink,
	IconMicrophone2,
	IconMinus,
	IconPlus,
	IconShoppingCartOff,
	IconTrash,
	IconX,
} from '@tabler/icons-react'
import moment from 'moment'
import { DispatchWithoutAction, useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'

const QtySelector = (item: CartItemType) => {
	const { dispatch } = useCartContext()
	const theme = useMantineTheme()
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				gap: '4px',
				backgroundColor: theme.colors.gray[2],
				alignItems: 'center',
				borderRadius: '4px',
			}}>
			<ActionIcon
				c='dark'
				variant='transparent'
				onClick={() => dispatch({ type: CartActionEnum.DECREASE_QTY, payload: item })}>
				<IconMinus size={12} />
			</ActionIcon>
			<Text size='xs'>{item.quantity}</Text>
			<ActionIcon
				c='dark'
				variant='transparent'
				onClick={() => dispatch({ type: CartActionEnum.INCREASE_QTY, payload: item })}>
				<IconPlus size={12} />
			</ActionIcon>
		</div>
	)
}

const TotalCodeHighlight = () => {
	const { totalPrice, totalGain, totalStream, totalDoubleGain, cart } = useCartContext()
	const theme = useMantineTheme()
	const itemList: () => string = () => {
		// item, 00pts & 0xp.
		let items = ''
		cart.map((item) => {
			items += `${item.name}, ${item.price}pts & ${item.gain} ${item.isBooster ? `streams` : `xp`} ${
				item.isBooster && item.doubleGain !== undefined ? `+ ${item.doubleGain}xp` : ``
			}${
				item.quantity > 1
					? `*${item.quantity} = ${item.price * item.quantity}pts & ${item.gain * item.quantity}${
							item.isBooster ? ` streams` : `xp`
					  } ${item.isBooster && item.doubleGain !== undefined ? `+ ${item.doubleGain * item.quantity}xp` : ``}`
					: ``
			}\n`
		})

		return items
	}

	const total: () => string = () => {
		// Total: XXpts, XXxp & XXstreams.
		let gainedExp = ``

		const totalXP = () => {
			if (totalGain > 0 && totalDoubleGain > 0) {
				return totalGain + totalDoubleGain
			}
			if (totalDoubleGain > 0) return totalDoubleGain
			return totalGain
		}
		console.log('Total', totalDoubleGain)

		gainedExp += `${totalXP()}xp`

		if (totalStream > 0) {
			if (gainedExp.length !== 0) {
				gainedExp += ` & `
			}
			gainedExp += `${totalStream / 1000}k streams`
		}

		return `Total : ${totalPrice}pts, ${gainedExp}`
	}

	const historyCode: () => string = () => {
		// [code]<u4>0000</u4>, item (artiste, chanson - mois année), <xp>0 XP</xp>.[/code]
		const currentDate = `${moment().format('DDMM')}`

		let itemsHistory = ''

		cart
			.filter((i) => !i.isBooster)
			.map((i, idx) => {
				let itemDetail = ''
				if (i.title && i.artist && i.releaseDate) {
					itemDetail += ` ('${i.title}', ${i.artist} - ${i.releaseDate})`
				}
				if (i.title && i.link) {
					itemDetail += ` ([url=${i.link}]${i.title}[/url] )`
				}
				itemsHistory += `${i.name}${i.quantity > 1 ? ` *${i.quantity}` : ''},${itemDetail} <xp>${
					i.gain * i.quantity
				}</xp>${idx !== cart.length - 1 ? ` \n` : ``}`
			})

		const doubleGainItems = cart.filter((i) => i.isBooster && i.doubleGain !== undefined)
		const sumBoosters = cart
			.filter((i) => i.isBooster)
			.reduce((prvValue, cartItem) => {
				return prvValue + cartItem.quantity
			}, 0)

		if (sumBoosters > 0) {
			if (doubleGainItems.length > 0) {
				doubleGainItems.map((i, idx) => {
					let itemDetail = ''
					if (i.title && i.artist && i.releaseDate) {
						itemDetail += ` ('${i.title}', ${i.artist} - ${i.releaseDate})`
					}
					itemsHistory += `${i.name},${itemDetail} <xp>${i.doubleGain! * i.quantity}</xp>${
						idx != doubleGainItems.length ? `\n` : ``
					}`
				})
			}
			itemsHistory += `boosters * ${sumBoosters}, <xp>${totalStream / 1000}k streams</xp>`
		}

		return `[code]<u4>${currentDate}</u4>, ${itemsHistory}.[/code]`
	}

	const code = `${itemList()}\n${total()}\n${historyCode()}`

	return <CodeHighlight c='dark' style={{ backgroundColor: theme.colors.gray[1] }} code={code} />
}

type OptionFormProps = {
	item: CartItemType
	isSongForm: boolean
	toggleOption: DispatchWithoutAction
}
const OptionForm = ({ item, isSongForm, toggleOption }: OptionFormProps) => {
	const { register, getValues } = useForm<CartItemType>({ defaultValues: item })
	const { dispatch } = useCartContext()
	return (
		<Stack gap='xs'>
			<TextInput size='xs' label={`${isSongForm ? `Nom de la chanson` : `Titre`} `} {...register('title')} />
			{isSongForm && <TextInput size='xs' label="Nom de l'artiste" {...register('artist')} />}
			{isSongForm && (
				<TextInput size='xs' label='Date de la release' placeholder='mois année' {...register('releaseDate')} />
			)}
			{!isSongForm && (
				<TextInput
					size='xs'
					leftSection={<IconLink size={12} />}
					label='Lien url'
					placeholder='mois année'
					{...register('link')}
				/>
			)}
			<Group>
				<Button
					style={{ flexGrow: 2 }}
					size='xs'
					onClick={() => {
						dispatch({ type: CartActionEnum.ADD_SONG, payload: getValues() })
						toggleOption()
					}}>
					Enregistrer
				</Button>
				<Tooltip label='Annuler'>
					<ActionIcon variant='outline' color='red' onClick={toggleOption}>
						<IconX size={12} />
					</ActionIcon>
				</Tooltip>
			</Group>
		</Stack>
	)
}

const CartItem = (item: CartItemType) => {
	const { dispatch } = useCartContext()

	const [showOption, toggleOption] = useReducer((s) => !s, false)
	const [isSong, setIsSong] = useState(false)

	return (
		<Stack gap='xs'>
			<Text fw={500}>{item.name}</Text>
			<Text c='dimmed' size='sm'>
				{item.price}pts &{' '}
				<NumberFormatter suffix={item.isBooster ? 'streams' : 'xp'} value={item.gain} thousandSeparator />{' '}
				{item.isBooster && !!item.doubleGain && (
					<NumberFormatter suffix={'xp'} value={item.doubleGain} thousandSeparator />
				)}
			</Text>
			{!!item.title && (
				<Text fs='italic' size='xs'>
					{item.title}, {item.artist} - {item.releaseDate}
				</Text>
			)}
			{!showOption && !item.isBooster && (
				<Group>
					<Tooltip label='Associer une chanson'>
						<ActionIcon
							c='dark'
							variant='light'
							onClick={() => {
								toggleOption(), setIsSong(true)
							}}>
							<IconMicrophone2 size={16} />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Associer un lien'>
						<ActionIcon
							c='dark'
							variant='light'
							onClick={() => {
								toggleOption(), setIsSong(false)
							}}>
							<IconLink size={16} />
						</ActionIcon>
					</Tooltip>
				</Group>
			)}
			{showOption && <OptionForm item={item} isSongForm={isSong} toggleOption={toggleOption} />}
			<Group justify='flex-end'>
				<QtySelector {...item} />
				<ActionIcon
					variant='subtle'
					color='dark'
					onClick={() => dispatch({ type: CartActionEnum.REMOVE_FROM_CART, payload: item })}>
					<IconTrash size={16} />
				</ActionIcon>
			</Group>
		</Stack>
	)
}

export function Cart() {
	const { dispatch, cart } = useCartContext()
	const [itemValid, toggleValid] = useReducer((s) => !s, false)

	return (
		<Stack>
			{itemValid ? (
				<Stack>
					<Group justify='flex-start'>
						<ActionIcon variant='outline' onClick={toggleValid}>
							<IconArrowBackUpDouble size={16} />
						</ActionIcon>
					</Group>
					<TotalCodeHighlight />
				</Stack>
			) : (
				<>
					<Stack style={{ overflowY: 'auto' }} h={'80vh'} gap='xs'>
						{cart.map((item) => {
							return <CartItem key={item.id} {...item} />
						})}
					</Stack>
					<Group>
						<Button style={{ flexGrow: 2 }} color='dark' onClick={toggleValid}>
							Valider les achats
						</Button>
						<ActionIcon
							size='lg'
							radius='sm'
							variant='outline'
							color='dark'
							onClick={() => {
								dispatch({ type: CartActionEnum.CLEAR })
							}}>
							<IconShoppingCartOff size={18} />
						</ActionIcon>
					</Group>
				</>
			)}
		</Stack>
	)
}
