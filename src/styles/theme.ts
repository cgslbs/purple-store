'use client'
import { createTheme } from '@mantine/core'

export const theme = createTheme({
	focusRing: 'never',

	primaryColor: 'violet',
	colors: {
		blue: [
			'#F2F5F9',
			'#D7E0EC',
			'#C4D1E3',
			'#A9BBD6',
			'#99AECE',
			'#7F9AC2',
			'#748CB1',
			'#5A6D8A',
			'#46556B',
			'#354151',
		],
		violet: [
			'#F8F7FB',
			'#E9E7F2',
			'#DEDBEB',
			'#CFCBE2',
			'#C6C1DD',
			'#B8B1D4',
			'#A7A1C1',
			'#837E97',
			'#656175',
			'#4D4A59',
		],
		pink: [
			'#FEFAFD',
			'#FCF0F8',
			'#FAE9F5',
			'#F8DFF0',
			'#F6D9ED',
			'#F4CFE9',
			'#DEBCD4',
			'#AD93A5',
			'#867280',
			'#665762',
		],
	},
})
