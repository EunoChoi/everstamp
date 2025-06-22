import { getYear } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useFilter = () => {
  const searchParams = useSearchParams();

  const [selectedYear, setSelectedYear] = useState<number>(getYear(new Date()));
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [emotionToggle, setEmotionToggle] = useState<number>(5);

  const queryParamsYear = searchParams.get('year');
  const queryParamsMonth = searchParams.get('month');
  const queryParamsEmotion = searchParams.get('emotion');

  useEffect(() => {
    if (queryParamsYear) setSelectedYear(Number(queryParamsYear));
    if (queryParamsMonth) setSelectedMonth(Number(queryParamsMonth));
    if (queryParamsEmotion) setEmotionToggle(Number(queryParamsEmotion));
  }, [queryParamsYear, queryParamsMonth, queryParamsEmotion])


  return { selectedYear, selectedMonth, emotionToggle, setSelectedYear, setSelectedMonth, setEmotionToggle };
}