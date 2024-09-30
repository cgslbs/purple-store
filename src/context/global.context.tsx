import { ReactNode } from 'react'
import { AgencyContextProvider } from './agencies.context'
import { CartContextProvider } from './cart.context'

export default function GlobalContext({ children }: { children: ReactNode }) {
	return (
		<AgencyContextProvider>
			<CartContextProvider>{children}</CartContextProvider>
		</AgencyContextProvider>
	)
}
