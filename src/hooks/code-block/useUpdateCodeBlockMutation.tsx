import { queryClient } from '@/main';
import type { EditorUpdateValuesType } from '@/pages/client/code/types/types';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../axios.hook';
import { useCodeStore } from '@/store/code.store';

type UseUpdateCodeBlockMutation = {
  codeFolderId: string;
};

export default function useUpdateCodeBlockMutation({
  codeFolderId,
}: UseUpdateCodeBlockMutation) {
  const server = useAxios();

  const setEditorState = useCodeStore(s => s.setEditorState);

  return useMutation({
    mutationFn: async (values: EditorUpdateValuesType) => {
      const response = await server.patch('/code/update', {
        folder_id: codeFolderId,
        ...values,
      });
      return response.data;
    },
    onSuccess: (_data, { code_block_id }) => {
      setEditorState(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folder', codeFolderId],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_block', code_block_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_partials', codeFolderId],
      });
    },
  });
}
