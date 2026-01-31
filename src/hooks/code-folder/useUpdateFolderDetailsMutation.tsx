import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/main';
import { useAxios } from '../axios.hook';
import type { UpdateFolderDetailsType } from '@/types/codeFolderTypes';
import { useCodeStore } from '@/store/code.store';

export default function useUpdateFolderDetailsMutation() {
  const setUpdateDetails = useCodeStore((s) => s.setUpdateDetails);
  const server = useAxios();

  return useMutation({
    mutationFn: async (value: UpdateFolderDetailsType): Promise<string> => {
      const response = await server.patch<string>('/codefolder/update', value);
      return response.data;
    },
    onSuccess: (_, value) => {
      setUpdateDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folder', value.folder_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
    },
  });
}
