'use client'
import { Container, Group, Tabs, Burger, ActionIcon, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import classes from './header.module.css'
import { IconDoor } from '@tabler/icons-react'
import { useAgencyContext } from '@/context/agencies.context'
import { AGENCIES, AgenciesEnum } from '@/constants/agency'
import { AgencyItem } from '@/interfaces'
import { DEFAULT_STORE_GROUP_TABS, GROUP_STORE_TABS, StoreGroupsEnum } from '@/constants/store'

const user = {
	name: 'Jane Spoonfighter',
	email: 'janspoon@fighter.dev',
	image: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-5.png',
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
