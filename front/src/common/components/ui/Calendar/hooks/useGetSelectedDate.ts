import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export const useGetSelectedDate = () => {
  const params = useSearchParams();

  const selectedDate = useMemo(() => {
    const dateFromParams = params.get('date');

    if (!dateFromParams || isNaN(Number(dateFromParams))) {
      return new Date();
    }
    const date = new Date(Number(dateFromParams));
    return isNaN(date.getTime()) ? new Date() : date;
  }, [params]);

  return { selectedDate };
}