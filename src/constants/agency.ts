import {
	IconChairDirector,
	IconComet,
	IconDiamond,
	IconFlower,
	IconMatchstick,
	IconMountain,
	IconPlant2,
	IconSparkles,
} from '@tabler/icons-react'

export const AGENCY_ICON_KEYS = {
	A7: {
		icon: IconChairDirector,
		color: 'dark',
	},
	MT: {
		icon: IconMountain,
		color: 'orange',
	},
	GN: {
		icon: IconDiamond,
		color: 'lime',
	},
	WM: {
		icon: IconComet,
		color: 'cyan',
	},
	MC: {
		icon: IconSparkles,
		color: 'grape',
	},
	XY: {
		color: 'red',
		icon: IconFlower,
	},
	INDIE: {
		color: 'yellow',
		icon: IconMatchstick,
	},
	FL: {
		color: 'indigo',
		icon: IconPlant2,
	},
}

export enum AgencyCodeEnum {
	A7 = 'A7',
	FREELANCE = 'FL',
	INDIE = 'INDIE',
	XY = 'XY',
	MT = 'MT',
	GN = 'GN',
	WM = 'WM',
	MC = 'MC',
}
