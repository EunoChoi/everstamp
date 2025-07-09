import { useCurrentUserEmail } from "@/common/hooks/useCurrentUserEmail";
import { useLocalStorage } from "@/common/hooks/useLocalStorage";
import { LocalUserStorage } from "@/common/types";
import { useCallback } from "react";

export const useCustomHabitOrder = () => {
  const { currentUserEmail } = useCurrentUserEmail();
  const { storedValue, setValue } = useLocalStorage<LocalUserStorage>(currentUserEmail, {});
  const customOrder = storedValue?.habitCustomOrder ?? [];  //기본값 처리

  const setCustomOrder = useCallback((value: number[]) => {
    setValue({ ...storedValue, habitCustomOrder: value });
  }, [storedValue]);

  return {
    customOrder,
    setCustomOrder,
  };
}