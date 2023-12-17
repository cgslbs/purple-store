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

export type AgencyYtbProps = {
	channelName: string
	imgIcon: string
	subscribers: string
}

export type ParticipantCategory = 'MT' | 'IDOL' | 'STAFF' | 'TRAINEE' | 'AUTO-PROD'

export type SongParticipant = {
	fullname: string
	category?: ParticipantCategory
	qty: number
	rating: number
}

export type SongRateType = {
	releaseDate: string
	songTitle: string
	artist: string
	ytb_code: string
	img_url: string
	artistRate: number
	participant?: SongParticipant[]
	featArtist?: SongParticipant[]
	collabArtist?: SongParticipant[]
}

export type SongRateStreams = {
	defaultStreams: number
	bonusStreams: number
	streamByParticipant?: number
}
