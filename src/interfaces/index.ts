import { AgenciesEnum, GroupsEnum } from '@/constants';
import { MantineColor } from '@mantine/core';
import { Icon, TablerIconsProps } from '@tabler/icons-react';

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

export type AgencyItem = {
  label: string;
  value: AgenciesEnum;
  icon: Icon;
  color: MantineColor;
};
