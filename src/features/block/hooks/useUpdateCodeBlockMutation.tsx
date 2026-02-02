import type { EditorUpdateValuesType } from '@/features/folder/types/editor';
import { queryClient } from '@/main';
import api from '@/shared/api';
import { useMutation } from '@tanstack/react-query';
import { useBlockStore } from '../store/block.store';
import type { CodeFolderWithBlocks } from '@/features/folder/types/types';

export default function useUpdateCodeBlockMutation() {
  const { setBlockEditDetails, setEditorState } = useBlockStore();

  return useMutation({
    mutationFn: async (variable: EditorUpdateValuesType) => {
      const response = await api.patch('/code/update', { ...variable });
      return response.data;
    },
    onMutate: async (variable) => {
      setEditorState(null);
      setBlockEditDetails(null);

      const folderKey = ['folder_with_blocks', variable.folder_id];

      await queryClient.cancelQueries({
        queryKey: ['folders'],
      });
      await queryClient.cancelQueries({
        queryKey: folderKey,
      });

      const previousFolderData =
        queryClient.getQueryData<CodeFolderWithBlocks>(folderKey);

      queryClient.setQueryData<CodeFolderWithBlocks>(folderKey, (prev) => {
        if (!prev) return prev;

        const latestBlockData = {
          code: variable.code,
          title: variable.title,
          description: variable.description,
          theme: variable.theme,
          language: variable.language,
          updated_at: new Date().toISOString(),
        };
        return {
          ...prev,
          code_blocks: prev.code_blocks.map((b) =>
            b._id === variable.code_block_id ? { ...b, ...latestBlockData } : b,
          ),
        };
      });

      return {
        previousFolderData,
      };
    },
    onError: (_, variable, mutateResult) => {
      const folderKey = ['folder_with_blocks', variable.folder_id];
      queryClient.setQueryData(folderKey, mutateResult?.previousFolderData);
    },
    onSettled: (_, __, variable) => {
      const folderKey = ['folder_with_blocks', variable.folder_id];
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      });
      queryClient.invalidateQueries({
        queryKey: folderKey,
      });
    },
  });
}
