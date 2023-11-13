import { StoryByGroupTabs } from '@/interfaces';

export enum StoreGroupsEnum {
  SOLO,
  GROUP,
  STAFF,
  TRAINEE,
  ACTING,
  MODEL,
}

export const DEFAULT_STORE_GROUP: StoryByGroupTabs[] = [
  {
    title: 'Solistes',
    id: StoreGroupsEnum.SOLO,
  },
  {
    title: 'Trainees',
    id: StoreGroupsEnum.TRAINEE,
  },
  {
    title: 'Staffs',
    id: StoreGroupsEnum.STAFF,
  },
  {
    title: 'Acteurs',
    id: StoreGroupsEnum.ACTING,
  },
  {
    title: 'Influenceur, models & sportifs',
    id: StoreGroupsEnum.MODEL,
  },
];

export const GROUP_STORE: StoryByGroupTabs = {
  title: 'Groupes',
  id: StoreGroupsEnum.GROUP,
};
