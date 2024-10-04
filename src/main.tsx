import '@mantine/core/styles.css'
import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import Home from './routes/home'
import { AgencyContextProvider } from './context/agencies.context'
import { CartContextProvider } from './context/cart.context'
import { StoreContextProvider } from './context/store.context'
import Generate from './routes/generate'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/generate',
		element: <Generate />,
	},
])

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MantineProvider>
			<AgencyContextProvider>
				<StoreContextProvider>
					<CartContextProvider>
						<RouterProvider router={router} />
					</CartContextProvider>
				</StoreContextProvider>
			</AgencyContextProvider>
		</MantineProvider>
	</StrictMode>
)
