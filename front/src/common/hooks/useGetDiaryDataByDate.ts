// /hooks/useDiaryByDate.ts

import { getDiaryByDate } from "@/server/actions/diary.actions";
import { DiaryWithRelations } from "@/server/types";
import { useEffect, useState, useTransition } from "react";
import { useGetSelectedDate } from "./useGetSelectedDate";

export const useGetDiaryDataByDate = () => {

  const { selectedDate } = useGetSelectedDate();
  const [diaryData, setDiaryData] = useState<DiaryWithRelations | null>(null);
  const [isLoading, startTransition] = useTransition();

  useEffect(() => {
    if (!selectedDate || isNaN(selectedDate.date.getTime())) {
      setDiaryData(null);
      return;
    };

    startTransition(async () => {
      const result = await getDiaryByDate(selectedDate.isoString);

      if (result.success && result.data) {
        setDiaryData(result.data);
      } else {
        console.error(result.message);
        setDiaryData(null);
      }
    });
  }, [selectedDate]);

  return {
    selectedDate,
    diaryData,
    isLoading,
  };
};