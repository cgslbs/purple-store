'use client'

import { fetchAgencies } from '@/services/Agency.service'
import { useQuery } from 'react-query'

export const useAgency = () => {
	return useQuery(['agencies'], () => fetchAgencies())
}
