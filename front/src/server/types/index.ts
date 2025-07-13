// import { Diary, Habit, Image, User } from '@prisma/client';

// // Prisma가 생성한 기본 타입을 그대로 사용하거나,
// // 특정 필드를 추가/수정하고 싶을 때 커스텀 타입을 만들 수 있어.

// // 1. Prisma 기본 타입 사용 (가장 일반적인 방법)
// export type UserType = User;
// export type HabitType = Habit;
// export type DiaryType = Diary;
// export type ImageType = Image;


// // 2. 커스텀 타입 예시
// // Diary 타입에 추가적인 정보(예: 완료된 습관 개수)를 포함하고 싶을 때
// export type DiaryWithHabitCount = Diary & {
//   _count: {
//     completedHabits: number;
//   }
// };

// // User 타입에서 비밀번호 같은 민감한 정보를 제외하고 싶을 때
// export type SafeUser = Omit<User, 'password'>; // 'password' 필드가 있다고 가정
