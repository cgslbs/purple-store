'use client'
import { Container, Group, Tabs, Burger, ActionIcon, Tooltip, Indicator } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from './header.module.css'
import { IconDoor, IconShoppingCart } from '@tabler/icons-react'
import { useAgencyContext } from '@/context/agencies.context'
import { AGENCIES, AgenciesEnum } from '@/constants/agency'
import { AgencyItem } from '@/interfaces'
import { DEFAULT_STORE_GROUP_TABS, GROUP_STORE_TABS, StoreGroupsEnum } from '@/constants/store'
import { useCartContext } from '@/context/cart.context'

const CartIndicator = () => {
	const { totalItems, toggleCart } = useCartContext()

	return (
		<Indicator radius={50} color='dark' inline label={totalItems} position='bottom-end' size={16}>
			<ActionIcon color='dark' variant='outline' aria-label='Cart' onClick={() => toggleCart()}>
				<IconShoppingCart size={16} />
			</ActionIcon>
		</Indicator>
	)
}

export function HeaderTabs() {
	const { state, dispatch } = useAgencyContext()
	const currentAgency = AGENCIES.find(
		// eslint-disable-next-line prettier/prettier
		(agency) => agency.value === state.defaultAgency
	)
	const defaultActionButton: Pick<AgencyItem, 'color' | 'icon'> =
		currentAgency === undefined ? { icon: IconDoor, color: 'blue' } : currentAgency

	const [opened, { toggle }] = useDisclosure(false)

	const tabStore =
		state.defaultAgency === AgenciesEnum.MT || state.defaultAgency === AgenciesEnum.HR
			? DEFAULT_STORE_GROUP_TABS
			: [...DEFAULT_STORE_GROUP_TABS, GROUP_STORE_TABS]

	const items = tabStore
		.sort((a, b) => a.id - b.id)
		.map((tab) => (
			<Tabs.Tab value={tab.id.toString()} key={tab.id}>
				{tab.title}
			</Tabs.Tab>
		))

	return (
		<div className={classes.header}>
			<Container className={classes.mainSection} size='md'>
				<Group justify='end'>
					<Burger opened={opened} onClick={toggle} hiddenFrom='xs' size='sm' />

					<Tooltip label="Changer d'agence">
						<ActionIcon
							variant='filled'
							aria-label='Change agency'
							onClick={() => dispatch(null)}
							color={defaultActionButton.color}>
							<defaultActionButton.icon style={{ width: '70%', height: '70%' }} stroke={1.5} />
						</ActionIcon>
					</Tooltip>
					<Tooltip label='Voir le panier'>
						<CartIndicator />
					</Tooltip>
				</Group>
			</Container>
			<Container size='md'>
				<Tabs
					defaultValue={StoreGroupsEnum.SOLO.toString()}
					variant='outline'
					visibleFrom='sm'
					classNames={{
						root: classes.tabs,
						list: classes.tabsList,
						tab: classes.tab,
					}}>
					<Tabs.List>{items}</Tabs.List>
				</Tabs>
			</Container>
		</div>
	)
}
