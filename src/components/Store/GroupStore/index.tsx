'use client'

import { DEFAULT_STORE_GROUP } from '@/constants/store'
import { Stack, Title, Text, Flex } from '@mantine/core'
import CardItem from '../CardItem'

export function GroupStoreView() {
	return (
		<Stack>
			<Title order={2}>{DEFAULT_STORE_GROUP.title}</Title>
			{DEFAULT_STORE_GROUP.sectionItems.map((section) => {
				return (
					<Stack key={section.id} gap='xs'>
						<Title order={3}>{section.title}</Title>
						<Text size='xs' c='dimmed'>
							{section.description}
						</Text>
						<Flex direction='row' wrap='wrap' gap='md' style={{ justifyContent: 'space-between' }}>
							{section.items.map((item) => (
								<CardItem key={item.id} {...item} sectionId={section.id} />
							))}
						</Flex>
					</Stack>
				)
			})}
		</Stack>
	)
}
