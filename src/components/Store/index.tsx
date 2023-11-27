'use client'

import { Container } from '@mantine/core'
import { GroupStoreView } from './GroupStore'

export function MainStore() {
	// TODO: handle view according to current tab
	return (
		<Container size='md'>
			<GroupStoreView />
		</Container>
	)
}
