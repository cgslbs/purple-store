import { HeaderTabs } from '@/components/Header'
import SelectAgency from '@/components/SelectAgency'
import { MainStore } from '@/components/Store'

export default function Home() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
			<HeaderTabs />
			<SelectAgency />
			<MainStore />
		</div>
	)
}
