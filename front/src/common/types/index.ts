type LIST_SORT = 'ASC' | 'DESC';
type HABIT_SORT = 'ASC' | 'DESC' | 'PRIORITY' | 'CUSTOM';

export type LocalUserStorage = {
  listSortType?: LIST_SORT;
  habitSortType?: HABIT_SORT;
  habitCustomOrder?: number[];
  fontSize?: string;
  themeColor?: string;
};