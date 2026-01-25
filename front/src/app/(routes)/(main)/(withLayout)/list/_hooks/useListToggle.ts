import { useCurrentUserEmail } from "@/common/hooks/useCurrentUserEmail";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { LocalUserStorage } from "@/common/types";
import { MutableRefObject, useCallback } from "react";


type SORT = 'ASC' | 'DESC';
const SORT_TYPE: SORT[] = ['ASC', 'DESC'];

export const useListToggle = ({ ref }: { ref: MutableRefObject<HTMLDivElement | null> }) => {
  const { currentUserEmail } = useCurrentUserEmail();

  const { storedValue, setValue } = useLocalStorage<LocalUserStorage>(currentUserEmail, {});
  const toggleValue = storedValue?.listSortType ?? 'DESC';

  const sortOrderChange = useCallback(() => {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });

    const currentIdx = SORT_TYPE.findIndex(e => e === toggleValue);
    const nextIdx = (currentIdx + 1) % SORT_TYPE.length;
    setValue({ ...storedValue, listSortType: SORT_TYPE[nextIdx] });
  }, [toggleValue]);

  return { toggleValue, sortOrderChange };
}