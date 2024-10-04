import { StoreGroupsEnum } from '@/constants/store'
import { Dispatch, ReactNode, createContext, useContext, useReducer } from 'react'

type StoreGroupType = {
	defaultStore: string
}

type StoreGroupAction = string

const updateStore = (state: StoreGroupType, action: string) => {
	return { ...state, defaultStore: action }
}

type StoreContextType = {
	groupStore: StoreGroupType
	dispatch: Dispatch<StoreGroupAction>
}

const initStoreState: StoreGroupType = {
	defaultStore: StoreGroupsEnum.SOLO.toString(),
}

export const StoreContext = createContext<StoreContextType>({
	groupStore: initStoreState,
	dispatch: () => null,
})

type ContextProviderProps = {
	children: ReactNode
}

export function StoreContextProvider({ children }: ContextProviderProps) {
	const [groupStore, dispatch] = useReducer(updateStore, initStoreState)

	return <StoreContext.Provider value={{ groupStore, dispatch }}>{children}</StoreContext.Provider>
}

export function useStoreContext() {
	return useContext(StoreContext)
}
