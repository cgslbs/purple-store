import { fetchStoreByAgency } from '@/services/Store.service'
import { useQuery } from 'react-query'

export const useStoreByAgency = () => {
	return useQuery(['storeByAgency'], () => fetchStoreByAgency())
}
