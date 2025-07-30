import DiaryForm from "@/common/components/views/DiaryForm";
import { isDateValidation } from "@/common/functions/isDateValidation";
import { getDiaryByDate } from "@/server/actions/diary.actions";
import { DiaryWithRelations } from "@/server/types";

interface Props {
  searchParams: {
    date: string
  };
}

//data prefetch in server component
const EditDiaryPage = async ({ searchParams }: Props) => {
  let selectedDate: string;
  let diaryData: DiaryWithRelations | null;

  try {
    if (!isDateValidation(searchParams.date)) throw new Error('유효하지 않은 날짜 형식의 주소로 접근하였습니다.');
    selectedDate = searchParams.date;

    const result = await getDiaryByDate(selectedDate);
    if (!result?.success) {
      throw new Error('다이어리 데이터 로드 중 문제가 발생하였습니다.');
    }
    diaryData = result?.data || null;
  } catch (error) {
    throw error;
  }

  return (<DiaryForm selectedDate={selectedDate} initialData={diaryData} />);
}

export default EditDiaryPage;