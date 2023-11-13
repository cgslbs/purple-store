import { AgenciesEnum } from '@/constants/agency';
import { MantineColor } from '@mantine/core';
import { Icon } from '@tabler/icons-react';
import { StoreGroupsEnum } from '@/constants/store';

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
  id: StoreGroupsEnum;
  title: string;
  items: FullItem[];
}

export type AgencyItem = {
  label: string;
  value: AgenciesEnum;
  icon: Icon;
  color: MantineColor;
};
