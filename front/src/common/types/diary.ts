// 일기 관련 공통 타입

export interface DiaryImage {
  id: string;
  src: string;
}

export interface DiaryHabit {
  UserId: number;
  id: number;
  email: string;
  name: string;
  priority: number;
}

export interface DiaryData {
  email: string;
  id: number;
  date: Date;
  text: string;
  emotion: number;        // 0: 화남 ~ 4: 기쁨
  Images: DiaryImage[];
  Habits: DiaryHabit[];
  visible: boolean;       // 일기 작성 여부
}

// 컴포넌트용 타입
export type DiaryHeaderData = Pick<DiaryData, 'date' | 'visible' | 'emotion' | 'text' | 'id'>;
export type DiaryMenuData = Pick<DiaryData, 'date' | 'visible' | 'emotion' | 'text' | 'id'>;

// 빈 일기 생성 함수
export const createEmptyDiary = (date: Date | string): DiaryData => ({
  email: '',
  id: 0,
  date: typeof date === 'string' ? new Date(date) : date,
  text: '',
  emotion: 2,
  Images: [],
  Habits: [],
  visible: false,
});
