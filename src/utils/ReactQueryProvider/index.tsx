'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false, // default: true
					},
				},
			})
	)

	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
