import {
	IconBolt,
	IconChairDirector,
	IconComet,
	IconFlower,
	IconMatchstick,
	IconMountain,
	IconRainbow,
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
		icon: IconBolt,
		color: 'lime',
	},
	WM: {
		icon: IconComet,
		color: 'cyan',
	},
	MC: {
		icon: IconRainbow,
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
		icon: IconSparkles,
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
