import api from '@/shared/api';
import { useCodeStore } from '../store/folder.store';
import { useMutation } from '@tanstack/react-query';
import type { UpdateFolderDetailsType } from '../types/codeFolderTypes';
import { queryClient } from '@/main';
import type { Folder, CodeFolderWithBlocks } from '../types/types';

export default function useUpdateFolderDetailsMutation() {
  const setFolderUpdateDetails = useCodeStore((s) => s.setFolderUpdateDetails);

  return useMutation({
    mutationFn: async (value: UpdateFolderDetailsType): Promise<string> => {
      const response = await api.patch<string>('/codefolder/update', value);
      return response.data;
    },
    onMutate: async (variable) => {
      setFolderUpdateDetails(null);
      // cancel queries
      await queryClient.cancelQueries({ queryKey: ['folders'] });
      await queryClient.cancelQueries({
        queryKey: ['folder_with_blocks', variable.folder_id],
      });

      // update query data
      const folders = queryClient.getQueryData(['folders']) as Folder[];

      if (folders) {
        const updatedFolders = folders.map((f) =>
          f._id === variable.folder_id
            ? {
                ...f,
                folder_name: variable.folder_name,
                folder_description: variable.folder_description,
                updated_at: new Date().toISOString(),
              }
            : f,
        );
        queryClient.setQueryData(['folders'], updatedFolders);
      }

      const folder = queryClient.getQueryData([
        'folder_with_blocks',
        variable.folder_id,
      ]) as CodeFolderWithBlocks;

      if (folder) {
        const updatedFolder = {
          ...folder,
          folder_name: variable.folder_name,
          folder_description: variable.folder_description,
          updated_at: new Date().toISOString(),
        };

        queryClient.setQueryData(
          ['folder_with_blocks', variable.folder_id],
          updatedFolder,
        );
      }

      return { prevFolders: folders, prevFolderWithBlocks: folder };
    },
    onError: (_, variable, mutateResult) => {
      // rollback query data
      if (mutateResult?.prevFolders) {
        queryClient.setQueryData(['folders'], mutateResult?.prevFolders);
      }
      if (mutateResult?.prevFolderWithBlocks) {
        queryClient.setQueryData(
          ['folder_with_blocks', variable.folder_id],
          mutateResult?.prevFolderWithBlocks,
        );
      }
    },
    onSettled: (_, __, variable) => {
      // invalidate queries
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      });
      queryClient.invalidateQueries({
        queryKey: ['folder_with_blocks', variable.folder_id],
      });
    },
  });
}
