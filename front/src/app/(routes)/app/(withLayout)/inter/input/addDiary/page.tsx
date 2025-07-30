import DiaryForm from "@/common/components/views/DiaryForm";
import { isDateValidation } from "@/common/functions/isDateValidation";

interface Props {
  searchParams: {
    date: string
  };
}

const AddDiaryPage = async ({ searchParams }: Props) => {
  let selectedDate: string;

  try {
    if (!isDateValidation(searchParams.date)) throw new Error('유효하지 않은 날짜 형식의 주소로 접근하였습니다.');
    selectedDate = searchParams.date;
  } catch (error) {
    throw error;
  }

  return (
    <>
      <DiaryForm selectedDate={selectedDate} initialData={null} />
    </>
  );
}

export default AddDiaryPage;