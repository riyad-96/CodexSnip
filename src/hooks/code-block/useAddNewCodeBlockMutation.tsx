import type { EditorValuesType } from '@/pages/client/code/types/types';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../axios.hook';
import { useCodeStore } from '@/store/code.store';
import { queryClient } from '@/main';

type UseAddNewCodeBlockMutation = {
  codeFolderId: string;
};

export default function useAddNewCodeBlockMutation({
  codeFolderId,
}: UseAddNewCodeBlockMutation) {
  const server = useAxios();

  const setEditorState = useCodeStore((s) => s.setEditorState);

  return useMutation({
    mutationFn: async (values: EditorValuesType) => {
      const response = await server.post('/code/add', {
        folder_id: codeFolderId,
        ...values,
      });
      return response.data;
    },
    onSuccess: () => {
      setEditorState(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folder', codeFolderId],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_partials', codeFolderId],
      });
    },
  });
}
