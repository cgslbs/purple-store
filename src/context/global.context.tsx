import { ReactNode } from 'react'
import { AgencyContextProvider } from './agencies.context'
import { CartContextProvider } from './cart.context'
import { StoreContextProvider } from './store.context'

export default function GlobalContext({ children }: { children: ReactNode }) {
	return (
		<AgencyContextProvider>
			<StoreContextProvider>
				<CartContextProvider>{children}</CartContextProvider>
			</StoreContextProvider>
		</AgencyContextProvider>
	)
}
