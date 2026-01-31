import type { EditorUpdateValuesType } from '@/features/folder/types/editor';
import { queryClient } from '@/main';
import useAxios from '@/shared/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { useBlockStore } from '../store/block.store';

export default function useUpdateCodeBlockMutation() {
  const server = useAxios();

  const { blockEditDetails, setBlockEditDetails, setEditorState } =
    useBlockStore();

  return useMutation({
    mutationFn: async (values: EditorUpdateValuesType) => {
      const response = await server.patch('/code/update', {
        folder_id: blockEditDetails?.folder_id,
        ...values,
      });
      return response.data;
    },
    onSuccess: (_data, { code_block_id }) => {
      setEditorState(null);
      setBlockEditDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folder', blockEditDetails?.folder_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_block', code_block_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_partials', blockEditDetails?.folder_id],
      });
    },
  });
}
