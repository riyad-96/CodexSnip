import type { FolderDeleteDetailsType } from '@/types/codeFolderTypes';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../axios.hook';
import { useCodeStore } from '@/store/code.store';
import { queryClient } from '@/main';

export default function useDeleteFolderMutation() {
  const server = useAxios();
  const setFolderDeleteDetails = useCodeStore((s) => s.setFolderDeleteDetails);

  return useMutation({
    mutationFn: async (value: FolderDeleteDetailsType): Promise<string> => {
      const response = await server.delete<string>(
        `/codefolder/delete/${value.folder_id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      setFolderDeleteDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
    },
  });
}
