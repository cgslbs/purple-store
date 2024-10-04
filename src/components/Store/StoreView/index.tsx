import {
	DEFAULT_STORE_ACTING,
	DEFAULT_STORE_GROUP,
	DEFAULT_STORE_MODEL,
	DEFAULT_STORE_SOLO,
	DEFAULT_STORE_STAFF,
	DEFAULT_STORE_TRAINEES,
	StoreGroupsEnum,
} from '@/constants/store'
import { Flex, Stack, Title, Text } from '@mantine/core'
import CardItem from '../CardItem'
import { StoreByGroup } from '@/interfaces'
import { useStoreContext } from '@/context/store.context'

export function StoreView() {
	const { groupStore } = useStoreContext()

	const currentStore: () => StoreByGroup = () => {
		switch (groupStore.defaultStore) {
			case StoreGroupsEnum.ACTING.toString():
				return DEFAULT_STORE_ACTING

			case StoreGroupsEnum.MODEL.toString():
				return DEFAULT_STORE_MODEL
			case StoreGroupsEnum.SOLO.toString():
				return DEFAULT_STORE_SOLO
			case StoreGroupsEnum.STAFF.toString():
				return DEFAULT_STORE_STAFF
			case StoreGroupsEnum.TRAINEE.toString():
				return DEFAULT_STORE_TRAINEES
			case StoreGroupsEnum.GROUP.toString():
			default:
				return DEFAULT_STORE_GROUP
		}
	}

	return (
		<Stack>
			{currentStore().sectionItems.map((section) => {
				return (
					<Stack key={section.id} gap='xs'>
						<Title order={4}>{section.title.toUpperCase()}</Title>
						<Text size='xs' c='dimmed'>
							{section.description}
						</Text>
						<Flex direction='row' wrap='wrap' gap='md'>
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
