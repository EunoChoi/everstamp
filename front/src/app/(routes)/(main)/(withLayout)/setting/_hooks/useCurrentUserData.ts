import { getCurrentUser } from "@/common/fetchers/user";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

export const useCurrentUserData = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })
  const email = data?.email ?? '-';
  const provider = data?.provider ?? '-';
  const createAt = data?.createdAt ? format(data?.createdAt, 'yyyy.MM.dd') : '-';

  return { email, provider, createAt };
}