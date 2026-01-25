import { StaticImageData } from 'next/image';

import emotion0 from '/public/img/emotion/emotion0.png';
import emotion1 from '/public/img/emotion/emotion1.png';
import emotion2 from '/public/img/emotion/emotion2.png';
import emotion3 from '/public/img/emotion/emotion3.png';
import emotion4 from '/public/img/emotion/emotion4.png';

export interface Emotion {
  id: number;
  name: string;
  src: StaticImageData;
}

// 감정 데이터 (인덱스 = id)
export const EMOTIONS: Emotion[] = [
  { id: 0, name: 'angry', src: emotion0 },
  { id: 1, name: 'sad', src: emotion1 },
  { id: 2, name: 'common', src: emotion2 },
  { id: 3, name: 'happy', src: emotion3 },
  { id: 4, name: 'joyful', src: emotion4 },
];
