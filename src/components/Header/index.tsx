'use client'
import { ActionIcon, Container, Group, Indicator, Tooltip } from '@mantine/core'

import classes from './header.module.css'
import { IconDoor, IconShoppingCart } from '@tabler/icons-react'
import { useCartContext } from '@/context/cart.context'
import { useRouter } from 'next/navigation'
import { AGENCY_ICON_KEYS } from '@/constants/agency'

const CartIndicator = () => {
	const router = useRouter()
	const { totalItems } = useCartContext()

	const onCartRedirect = () => {
		router.push('/cart')
	}

	return (
		<Indicator radius={50} color='dark' inline label={totalItems} position='bottom-end' size={16}>
			<ActionIcon color='dark' variant='outline' aria-label='Cart' onClick={onCartRedirect}>
				<IconShoppingCart size={16} />
			</ActionIcon>
		</Indicator>
	)
}

export default function Header() {
	const router = useRouter()

	const onChangeAgency = () => {
		localStorage.setItem('agency_code', '')
		router.push('/')
	}

	const currAgencyCode = localStorage.getItem('agency_code')
	const currAgency = Object.entries(AGENCY_ICON_KEYS).find(([keys, _value]) => keys === currAgencyCode)
	const Icon = currAgency !== undefined ? currAgency[1].icon : IconDoor

	return (
		<div className={classes.header}>
			<Container className={classes.mainSection} size='md'>
				<Group justify='end'>
					<Tooltip label="Changer d'agence">
						<ActionIcon
							variant='filled'
							aria-label={`agency ${currAgencyCode}`}
							onClick={onChangeAgency}
							color={currAgency !== undefined ? currAgency[1].color : 'violet'}>
							<Icon style={{ width: '70%', height: '70%' }} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
					<CartIndicator />
				</Group>
			</Container>
		</div>
	)
}
