import { StoreGroupsEnum } from '@/constants/store';
import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';

type StoreGroupType = {
  defaultStore: string;
};

type StoreGroupAction = StoreGroupsEnum;

const updateStore = (state: StoreGroupType, action: StoreGroupAction) => {
  return { ...state, defaultStore: action.toString() };
};

type StoreContextType = {
  groupStore: StoreGroupType;
  dispatch: Dispatch<StoreGroupAction>;
};

const initStoreState: StoreGroupType = {
  defaultStore: StoreGroupsEnum.SOLO.toString(),
};

export const StoreContext = createContext<StoreContextType>({
  groupStore: initStoreState,
  dispatch: () => null,
});

type ContextProviderProps = {
  children: ReactNode;
};

export function StoreContextProvider({ children }: ContextProviderProps) {
  const [groupStore, dispatch] = useReducer(updateStore, initStoreState);

  return (
    <StoreContext.Provider value={{ groupStore, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStoreContext() {
  return useContext(StoreContext);
}
