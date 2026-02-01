import useAxios from '@/shared/hooks/useAxios';
import { useCodeStore } from '../store/folder.store';
import { useMutation } from '@tanstack/react-query';
import type { FolderDeleteDetailsType } from '../types/codeFolderTypes';
import { queryClient } from '@/main';
import type { CodeFolder } from '../types/types';

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
    onMutate: async (variable) => {
      setFolderDeleteDetails(null);
      // cancel queries
      await queryClient.cancelQueries({ queryKey: ['folders'] });

      // update query data
      const folders = queryClient.getQueryData([
        'folders',
      ]) as CodeFolder[];

      queryClient.setQueryData(
        ['folders'],
        folders.filter((f) => f._id !== variable.folder_id),
      );

      return [...folders];
    },
    onError: (_, __, mutateResult) => {
      // rollback query data
      queryClient.setQueryData(['folders'], mutateResult);
    },
    onSettled: () => {
      // invalidate queries
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      });
    },
  });
}
