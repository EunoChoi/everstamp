import { useCurrentUserEmail } from "@/common/hooks/useCurrentUserEmail";
import { MutableRefObject, useCallback, useEffect, useState } from "react";


export const useListSortOrder = ({ ref }: { ref: MutableRefObject<HTMLDivElement | null> }) => {
  const { currentUserEmail } = useCurrentUserEmail();

  const [sortToggle, setSortToggle] = useState<'ASC' | 'DESC'>(() => {
    const localData = localStorage.getItem(currentUserEmail)
    if (localData) {
      const jsonLocalData = JSON.parse(localData);
      return jsonLocalData['listSortType'] ? jsonLocalData['listSortType'] : 'DESC';
    }
    else return 'DESC';
  });

  const listSortOrderChange = useCallback(() => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      if (sortToggle === 'DESC') setSortToggle('ASC');
      else setSortToggle('DESC');
    }, 50);
  }, [sortToggle])

  useEffect(() => {
    const localData = localStorage.getItem(currentUserEmail)
    let jsonLocalData;
    if (localData) {
      jsonLocalData = JSON.parse(localData);
    }

    localStorage.setItem(currentUserEmail, JSON.stringify({ ...jsonLocalData, listSortType: sortToggle }));
  }, [currentUserEmail, sortToggle])

  return { sortToggle, setSortToggle, listSortOrderChange }
}