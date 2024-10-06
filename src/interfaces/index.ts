import { ItemGainType } from '@/constants/item'

// export interface Item {
// 	id: number
// 	name: string
// 	bonusStatus?: AgenciesEnum[]
// }

// export interface User {
// 	defaultAgency: AgenciesEnum | null
// }

// export interface CompleteItem extends Item {
// 	price: number
// 	gain: number
// 	isBooster: boolean
// 	doubleGain?: number
// 	condition?: string
// 	specificITem?: SpecificItemEnum
// 	title?: string
// 	artist?: string
// 	link?: string
// 	releaseDate?: string
// }

// export interface ItemBySection {
// 	id: StoreSectionEnum
// 	title: string
// 	description?: string
// 	items: CompleteItem[]
// }

// export interface StoreByGroup {
// 	id: StoreGroupsEnum
// 	title: string
// 	sectionItems: ItemBySection[]
// }

// export type StoryByGroupTabs = Pick<StoreByGroup, 'id' | 'title'>

// export type AgencyItem = {
// 	label: string
// 	value: AgenciesEnum
// 	icon: Icon
// 	color: MantineColor
// }

// export interface IAgency {
// 	id: number
// 	code: string
// 	name: string
// }

export enum ProjectTypeEnum {
	NONE,
	RELEASE,
	PRODUCTION,
	DRAMA,
	CF_PHOTOSHOOT,
	AMBASSADOR_FACE_CONTRACT,
	OTHER,
	OST_DRAMA,
	IG_YTB_POST,
	TITLE,
}

export interface IItem {
	id: number
	name: string
	gainType: ItemGainType
	price: number
	gain: number
	doubleGain: number | null
	condition: string
	type: ProjectTypeEnum
	hasBonus: boolean
}

export interface ICategory {
	id: number
	name: string
	description: string
	items: IItem[]
}

export interface IStore {
	id: number
	name: string
	category: ICategory[]
}
