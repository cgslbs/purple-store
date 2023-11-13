'use client';
import { AgenciesEnum } from '@/constants/agency';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { User } from '../interfaces/index';

type StateType = {
  defaultAgency: AgenciesEnum | null;
};

type ActionType = AgenciesEnum;

const initialState: StateType = {
  defaultAgency: null,
};

const reducer = (state: User, action: ActionType) => {
  if (action !== null) {
    return { ...state, defaultAgency: action };
  }
  return { ...state, defaultAgency: null };
};

type AgencyContextType = {
  state: StateType;
  dispatch: Dispatch<AgenciesEnum>;
};

export const AgencyContext = createContext<AgencyContextType>({
  state: initialState,
  dispatch: () => null,
});

type GroupProviderProps = {
  children: ReactNode;
};

export function AgencyContextProvider({ children }: GroupProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AgencyContext.Provider value={{ state, dispatch }}>
      {children}
    </AgencyContext.Provider>
  );
}

export function useAgencyContext() {
  return useContext(AgencyContext);
}
