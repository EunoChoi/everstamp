interface DiaryFormTextareaProps {
  text: string;
  setText: (v: string) => void;
}

const DiaryFormTextarea = ({
  text,
  setText,
}: DiaryFormTextareaProps) => (
  <div className="h-full w-full">
    <textarea
      name="diary-form-text"
      className="h-full w-full resize-none border-none text-base outline-none placeholder:pt-20 placeholder:text-center"
      onChange={(event) => setText(event.target.value)}
      value={text}
      maxLength={DIARY_TEXT_MAX_LENGTH}
      placeholder="일상의 작은 감정들을 기록하세요."
    />
  </div>
);

export default DiaryFormTextarea;
import { DIARY_TEXT_MAX_LENGTH } from '@/common/constants/diary';
