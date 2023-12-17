import { AgencyItem } from '@/interfaces'
import {
	IconBolt,
	IconChairDirector,
	IconComet,
	IconFlame,
	IconFlower,
	IconMountain,
	IconRainbow,
	IconSunset2,
} from '@tabler/icons-react'

export enum AgenciesEnum {
	MT = 'MOUNTAINTOP',
	WM = 'WISHMAKER',
	GN = 'GNATION',
	XY = 'XINGYUAN',
	HR = 'HORIZONRECORD',
	MC = 'MYSTIC',
	A7 = 'ACT7',
	INDIE = 'INDIE',
}

export const AGENCIES: AgencyItem[] = [
	{
		label: 'ACT.7',
		value: AgenciesEnum.A7,
		icon: IconChairDirector,
		color: 'dark',
	},
	{
		label: 'MOUNTAIN TOP',
		value: AgenciesEnum.MT,
		icon: IconMountain,
		color: 'orange',
	},
	{
		label: 'G.NATION',
		value: AgenciesEnum.GN,
		icon: IconBolt,
		color: 'lime',
	},
	{
		label: 'WISHMAKER',
		value: AgenciesEnum.WM,
		icon: IconComet,
		color: 'cyan',
	},
	{
		label: 'HORIZON RECORDS',
		value: AgenciesEnum.HR,
		icon: IconSunset2,
		color: 'violet',
	},
	{
		label: 'MYSTIC',
		value: AgenciesEnum.MC,
		icon: IconRainbow,
		color: 'grape',
	},
	{
		label: 'XINGYUAN',
		value: AgenciesEnum.XY,
		icon: IconFlower,
		color: 'red',
	},
	{
		label: 'INDÉPENDANTS & FREELANCE',
		value: AgenciesEnum.INDIE,
		icon: IconFlame,
		color: 'indigo',
	},
]
