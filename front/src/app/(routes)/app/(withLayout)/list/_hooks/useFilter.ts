import { getYear } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

export const useFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filterState = useMemo(() => ({
    selectedYear: Number(searchParams.get('year')) || getYear(new Date()),
    selectedMonth: Number(searchParams.get('month')) || 0,
    emotionToggle: Number(searchParams.get('emotion')) || 5,
    isFilterOpen: searchParams.get('listFilterOpen') === 'true',
  }), [searchParams]);

  const setFilterState = useCallback((query: {
    isOpen?: boolean;
    emotion?: number;
    year?: number;
    month?: number;
  }) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (query.isOpen !== undefined) {
      currentParams.set('listFilterOpen', String(query.isOpen));
    }
    if (query.emotion !== undefined) {
      currentParams.set('emotion', String(query.emotion));
    }
    if (query.year !== undefined) {
      currentParams.set('year', String(query.year));
    }
    if (query.month !== undefined) {
      currentParams.set('month', String(query.month));
    }
    router.push(`${pathname}?${currentParams.toString()}`);
  }, [pathname, router, searchParams])

  return {
    ...filterState,
    setFilterState
  };
}