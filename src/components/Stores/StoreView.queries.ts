import { fetchStoreByAgency } from '@/services/Store.service'
import { useQuery } from 'react-query'

export const useStoreByAgency = () => {
	const currAgencyCode = localStorage.getItem('agency_code')
	return useQuery(['storeByAgency', currAgencyCode], () => fetchStoreByAgency(), { enabled: currAgencyCode !== null })
}
