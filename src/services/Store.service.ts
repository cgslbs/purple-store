import { IStore } from '@/interfaces'
import { axiosInstance } from './axiosInstance'

// FETCH STORE
export const fetchStoreByAgency = () => {
	const currAgencyCode = localStorage.getItem('agency_code')
	return axiosInstance
		.get<IStore[]>('/Store', {
			headers: {
				'X-AGENCY': currAgencyCode,
			},
		})
		.then((res) => res.data)
}
