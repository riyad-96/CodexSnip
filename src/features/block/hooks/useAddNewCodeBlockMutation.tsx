import type { EditorValuesType } from '@/features/folder/types/editor';
import { queryClient } from '@/main';
import useAxios from '@/shared/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { useBlockStore } from '../store/block.store';
import { useParams } from 'react-router-dom';

export default function useAddNewCodeBlockMutation() {
  const server = useAxios();

  const folder_id = useParams().id;

  const { setBlockEditDetails, setEditorState } = useBlockStore();

  return useMutation({
    mutationFn: async (values: EditorValuesType) => {
      const response = await server.post('/code/add', {
        folder_id: folder_id,
        ...values,
      });
      return response.data;
    },
    onSuccess: () => {
      setEditorState(null);
      setBlockEditDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['folder_with_blocks', folder_id],
      });
    },
  });
}
