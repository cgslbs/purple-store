import { AgenciesEnum, GroupsEnum } from '@/constants';

export interface Item {
  name: string;
  requirement?: string;
  isBooster: boolean;
  bonusStatus?: AgenciesEnum[];
}

export interface User {
  defaultAgency: AgenciesEnum | null;
}

export interface FullItem extends Item {
  price: number;
  gain: number;
}

export interface StoreByGroup {
  id: GroupsEnum;
  title: string;
  items: FullItem[];
}
