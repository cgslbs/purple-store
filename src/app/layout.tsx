import type { Metadata } from 'next'
import { MantineProvider } from '@mantine/core'
import { AgencyContextProvider } from '@/context/agencies.context'
import '@mantine/core/styles.css'
import { CartContextProvider } from '@/context/cart.context'
import { StoreContextProvider } from '@/context/store.context'

import { Playfair_Display, Gruppo } from 'next/font/google'
import { theme } from '@/styles/theme'

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
				<MantineProvider theme={theme}>
					<AgencyContextProvider>
						<StoreContextProvider>
							<CartContextProvider>{children}</CartContextProvider>
						</StoreContextProvider>
					</AgencyContextProvider>
				</MantineProvider>
			</body>
		</html>
	)
}
