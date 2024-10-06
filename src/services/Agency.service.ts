import { IAgency } from '@/interfaces'
import { axiosInstance } from './axiosInstance'

export function fetchAgencies() {
	return axiosInstance.get<IAgency[]>('/Agency').then((res) => res.data)
}
