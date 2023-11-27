import SelectAgency from '@/components/SelectAgency'
import { HeaderTabs } from '@/components/Header'
import { MainStore } from '@/components/Store'

export default function Home() {
	return (
		<div>
			<HeaderTabs />
			<SelectAgency />
			<MainStore />
		</div>
	)
}
