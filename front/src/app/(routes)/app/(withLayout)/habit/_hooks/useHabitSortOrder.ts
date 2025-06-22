import { useCurrentUserEmail } from "@/common/hooks/useCurrentUserEmail";
import { useCallback, useEffect, useState } from "react";

export const useHabitSortOrder = () => {
  const { currentUserEmail } = useCurrentUserEmail();
  const [customOrder] = useState<number[]>(() => {
    const localData = localStorage.getItem(currentUserEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['habitCustomOrder'] ? jsonLocalData['habitCustomOrder'] : [];
    }
    else return [];
  });

  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC' | 'CUSTOM'>(() => {
    const localData = localStorage.getItem(currentUserEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['habitSortType'] ? jsonLocalData['habitSortType'] : 'DESC';
    }
    else return 'DESC';
  });

  const sortOrderChange = useCallback(() => {
    if (sortToggle === 'DESC') setSortToggle('ASC');
    else if (sortToggle === 'ASC') setSortToggle('CUSTOM');
    else if (sortToggle === 'CUSTOM') setSortToggle('DESC');
  }, [sortToggle])

  //sort 변경되면 로컬 스토리지 값에 적용
  useEffect(() => {
    const localData = localStorage.getItem(currentUserEmail)
    let jsonLocalData;
    if (localData) {
      jsonLocalData = JSON.parse(localData);
    }

    localStorage.setItem(currentUserEmail, JSON.stringify({ ...jsonLocalData, habitSortType: sortToggle }));
  }, [currentUserEmail, sortToggle])
  return {
    customOrder, sortToggle, setSortToggle, sortOrderChange
  };
}