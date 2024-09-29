import type { Metadata } from 'next'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'

import { Playfair_Display, Gruppo } from 'next/font/google'
import { theme } from '@/styles/theme'
import GlobalContext from '@/context/global.context'
import { QueryClient, QueryClientProvider } from 'react-query'
import ReactQueryProvider from '@/utils/ReactQueryProvider'

// Google font here
const playfairDisplay = Playfair_Display({
	subsets: ['latin'],
	variable: '--font-playfair',
	display: 'swap',
})

const gruppo = Gruppo({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-gruppo',
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Purple store',
	description: 'Purple night web app store by bastille.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='fr'>
			<body className={`${playfairDisplay.variable} ${gruppo.variable}`}>
				<ReactQueryProvider>
					<MantineProvider theme={theme}>
						<GlobalContext>{children}</GlobalContext>
					</MantineProvider>
				</ReactQueryProvider>
			</body>
		</html>
	)
}
