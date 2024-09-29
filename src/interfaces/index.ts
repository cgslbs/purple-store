import { AgenciesEnum } from '@/constants/agency'
import { MantineColor } from '@mantine/core'
import { Icon } from '@tabler/icons-react'
import { StoreGroupsEnum, StoreSectionEnum } from '@/constants/store'
import { SpecificItemEnum } from '@/constants/item'

export interface Item {
	id: number
	name: string
	bonusStatus?: AgenciesEnum[]
}

export interface User {
	defaultAgency: AgenciesEnum | null
}

export interface CompleteItem extends Item {
	price: number
	gain: number
	isBooster: boolean
	doubleGain?: number
	condition?: string
	specificITem?: SpecificItemEnum
	title?: string
	artist?: string
	link?: string
	releaseDate?: string
}

export interface ItemBySection {
	id: StoreSectionEnum
	title: string
	description?: string
	items: CompleteItem[]
}

export interface StoreByGroup {
	id: StoreGroupsEnum
	title: string
	sectionItems: ItemBySection[]
}

export type StoryByGroupTabs = Pick<StoreByGroup, 'id' | 'title'>

export type AgencyItem = {
	label: string
	value: AgenciesEnum
	icon: Icon
	color: MantineColor
}

export interface IAgency {
	id: number
	code: string
	name: string
}
