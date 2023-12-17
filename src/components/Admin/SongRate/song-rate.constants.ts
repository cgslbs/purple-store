import { ParticipantCategory } from '@/interfaces'

type SelectCategoryType = {
	label: string
	value: ParticipantCategory
}

export const SELECT_CATEGROY: SelectCategoryType[] = [
	{
		label: 'MountainTop',
		value: 'MT',
	},
	{ label: 'Staff', value: 'STAFF' },
	{ label: 'Trainee', value: 'TRAINEE' },
	{ label: 'Auto prod.', value: 'AUTO-PROD' },
	{ label: 'Idol', value: 'IDOL' },
]
