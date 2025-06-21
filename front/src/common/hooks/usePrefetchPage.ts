import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const usePrefetchPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/app/calendar');
    router.prefetch('/app/list');
    router.prefetch('/app/habit');
    router.prefetch('/app/setting');
  }, [])
}