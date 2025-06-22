import { getCurrentUser } from "@/common/fetchers/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUserEmail = () => {
  const { data: user = { email: '' } } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })
  const currentUserEmail: string = user.email ?? '';

  return { currentUserEmail };
}