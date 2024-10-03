import { CartItemType } from '@/context/cart.context'
import { IItem } from '@/interfaces'

export type ProductRowProps = {
	item: CartItemType
}

export type QuantityCounterProps = ProductRowProps

export type ProjectItemProps = {
	index: number
}

export enum ProjectTypeEnum {
	NULL,
	RELEASE,
	PRODUCTION,
	DRAMA,
	CF_PHOTOSHOOT,
	AMBASSADOR_FACE_CONTRACT,
	OTHER,
}

export type ProjectItemType = {
	projectType: ProjectTypeEnum
	// SONG OR DRAMA
	title?: string
	artist?: string
	// RELEASE DATE FOR SONG OR DATE IRL FOR PHOTOSHOOT/CF
	releaseDate?: string
	// CF, PHOTOSHOOT & INTERVIEW
	url?: string
	// PHOTOSHOOT
	brandName?: string
	celebrityName?: string
	magazineName?: string
	// ROLE IN DRAMA
	roleName?: string
	items: IItem[]
}

export const defaultProjectItem: ProjectItemType = {
	projectType: ProjectTypeEnum.NULL,
	items: [],
}
