import Axios from "@/Axios/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateThemeColor = () => {
  const queryClient = useQueryClient();

  const { mutate: updateThemeColor } = useMutation({
    mutationFn: (themeColor: string) => Axios.patch('/user/theme', { themeColor }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      console.log('theme update success');
    },
    onError: () => {
      console.log('theme update error')
    },
  })

  return { updateThemeColor };
}