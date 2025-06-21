import { useEffect, useState } from "react";
import { useCurrentUserEmail } from "./useCurrentUserEmail";

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
    customOrder, sortToggle, setSortToggle
  };
}