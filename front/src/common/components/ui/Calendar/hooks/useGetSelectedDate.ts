import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useGetSelectedDate = () => {
  const params = useSearchParams();

  const selectedDate = useMemo(() => {
    const dateString = params.get('date');

    if (!dateString) {
      return new Date();
    }
    const selectedDate = new Date(dateString);
    if (isNaN(selectedDate.getTime())) {
      console.error(`URL의 날짜 값이 유효하지 않습니다. "${dateString}". 오늘 날짜로 대체합니다.`);
      return new Date();
    }
    return selectedDate;
  }, [params]);

  return { selectedDate };
}