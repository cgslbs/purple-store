'use client'

import { useAgency } from './AgencySelection.queries'
import { Grid, LoadingOverlay, Modal, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { IconDoor } from '@tabler/icons-react'
import { useContext } from 'react'
import { AgencyContext } from '@/context/agencies.context'
import { AGENCY_ICON_KEYS, AgencyCodeEnum } from '@/constants/agency'
import { useRouter } from 'next/navigation'

export default function AgencySelection() {
	const { dispatch } = useContext(AgencyContext)
	const { data, isLoading, isFetching } = useAgency()
	const router = useRouter()

	const onAgencySelection = (agencyCode: string) => {
		dispatch(agencyCode as AgencyCodeEnum)
		router.push('/store')
	}

	if (isLoading || isFetching) return <LoadingOverlay />
	if (data === undefined) return <div>Something wrong happened oops</div>

	return (
		<Modal
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
				<Grid grow justify='center' align='stretch' gutter={{ base: 'md' }}>
					{data
						.filter((agency) => agency.code !== 'HR')
						.map((agency) => {
							const currAgency = Object.entries(AGENCY_ICON_KEYS).find(([keys, _value]) => keys === agency.code)
							const Icon = currAgency !== undefined ? currAgency[1].icon : IconDoor
							return (
								<Grid.Col key={`AGENCY_KEY_${agency.id}_${agency.code}`} span={4}>
									<UnstyledButton onClick={() => onAgencySelection(agency.code)} w={'100%'}>
										<Stack gap={'0.5rem'} align='center' justify='center' w={'100%'} h={'100%'}>
											<ThemeIcon
												variant='filled'
												size='xl'
												radius='xl'
												aria-label={agency.name}
												color={currAgency?.[1].color}>
												<Icon />
											</ThemeIcon>
											<Text fw={500} ta={'center'}>
												{agency.name}
											</Text>
										</Stack>
									</UnstyledButton>
								</Grid.Col>
							)
						})}
				</Grid>
			</Stack>
		</Modal>
	)
}
