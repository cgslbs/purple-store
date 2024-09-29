'use client'

import { useEffect } from 'react'
import { useAgency } from './AgencySelection.queries'
import { ActionIcon, Box, Grid, Group, Modal, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { AGENCY_ICON_KEYS } from './AgencySelection.constants'
import { IconDoor } from '@tabler/icons-react'

export default function AgencySelection() {
	const { data, status } = useAgency()

	if (data === undefined) return <div>Something wrong happened oops</div>

	return (
		<Modal
			// title='Choisissez votre agence / groupe !'
			opened={true}
			onClose={() => {}}
			closeOnEscape={false}
			closeOnClickOutside={false}
			withCloseButton={false}
			centered>
			<Stack py={'lg'} align='center' gap={'2rem'}>
				<Text fw={700} size={'1.25rem'}>
					Choisissez votre agence / groupe !
				</Text>
				<Grid grow justify='center' align='stretch'>
					{data
						.filter((agency) => agency.code !== 'HR')
						.map((agency) => {
							const currAgency = Object.entries(AGENCY_ICON_KEYS).find(([keys, _value]) => keys === agency.code)
							const Icon = currAgency !== undefined ? currAgency[1].icon : IconDoor
							return (
								<Grid.Col span={4}>
									<Stack gap={'0.5rem'} align='center' justify='center' w={'100%'} component={UnstyledButton}>
										<ActionIcon
											variant='filled'
											size='xl'
											radius='xl'
											aria-label={agency.name}
											color={currAgency?.[1].color}>
											<Icon />
										</ActionIcon>
										<Text fw={500} ta={'center'}>
											{agency.name}
										</Text>
									</Stack>
								</Grid.Col>
							)
						})}
				</Grid>
			</Stack>
		</Modal>
	)
}
