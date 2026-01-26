import { StaticImageData } from 'next/image';

import emotion0 from '/public/img/emotion/emotion0.png';
import emotion1 from '/public/img/emotion/emotion1.png';
import emotion2 from '/public/img/emotion/emotion2.png';
import emotion3 from '/public/img/emotion/emotion3.png';
import emotion4 from '/public/img/emotion/emotion4.png';

export interface Emotion {
  id: number;
  name: string;
  nameKr: string;
  src: StaticImageData;
}

// 감정 데이터 (인덱스 = id)
export const EMOTIONS: Emotion[] = [
  { id: 0, name: 'angry', nameKr: '화남', src: emotion0 },
  { id: 1, name: 'sad', nameKr: '슬픔', src: emotion1 },
  { id: 2, name: 'common', nameKr: '보통', src: emotion2 },
  { id: 3, name: 'happy', nameKr: '행복', src: emotion3 },
  { id: 4, name: 'joyful', nameKr: '기쁨', src: emotion4 },
];
