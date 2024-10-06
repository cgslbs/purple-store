import { CartItemType } from '@/context/cart.context'
import { ProjectTypeEnum } from '@/interfaces'
import { TextInputProps } from '@mantine/core'

export type ProductRowProps = {
	item: CartItemType
}

export type QuantityCounterProps = ProductRowProps

export type ProjectItemProps = {
	index: number
	onRemove: () => void
}

export type ItemsMultiselectProps = Pick<ProjectItemProps, 'index'> & {
	isEditMode: boolean
	currentTypeProject: ProjectTypeEnum
}

export type FormByProjectProps = {
	projectType: ProjectTypeEnum
	index: number
	isEditMode: boolean
}

export type InputEditModeProps = TextInputProps & {
	isEditMode: boolean
	textValue: string
}

export type ProjectItemType = {
	projectType: ProjectTypeEnum
	// SONG OR DRAMA
	title?: string
	subTitle?: string
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
	items: CartItemType[]
}

export const defaultProjectItem: ProjectItemType = {
	projectType: ProjectTypeEnum.NONE,
	items: [],
}
