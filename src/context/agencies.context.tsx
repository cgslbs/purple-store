'use client'
import { AgenciesEnum } from '@/constants/agency'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type StateType = {
	defaultAgency: AgenciesEnum | null
}

type ActionType = AgenciesEnum | null

const initialState: StateType = {
	defaultAgency: null,
}

const reducer = (state: StateType, action: ActionType) => {
	if (action !== null) {
		return { ...state, defaultAgency: action }
	}
	return { ...state, defaultAgency: null }
}

type AgencyContextType = {
	state: StateType
	dispatch: Dispatch<AgenciesEnum | null>
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
