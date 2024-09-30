'use client'
import { AgencyCodeEnum } from '@/constants/agency'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type StateType = {
	defaultAgency: AgencyCodeEnum | null
}

type ActionType = AgencyCodeEnum | null

const initialState: StateType = {
	defaultAgency: null,
}

const reducer = (state: StateType, action: ActionType) => {
	if (action !== null) {
		localStorage.setItem('agency_code', action)
		return { ...state, defaultAgency: action }
	}
	localStorage.setItem('agency_code', '')
	return { ...state, defaultAgency: null }
}

type AgencyContextType = {
	state: StateType
	dispatch: Dispatch<AgencyCodeEnum | null>
}

export const AgencyContext = createContext<AgencyContextType>({
	state: initialState,
	dispatch: () => null,
})

type GroupProviderProps = {
	children: ReactNode
}

export function AgencyContextProvider({ children }: GroupProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialState)

	return <AgencyContext.Provider value={{ state, dispatch }}>{children}</AgencyContext.Provider>
}

export function useAgencyContext() {
	return useContext(AgencyContext)
}
