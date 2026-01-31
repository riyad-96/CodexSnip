import { useCodeStore } from "@/features/folder/store/code.store";
import type { EditorValuesType } from "@/features/folder/types/editor";
import { queryClient } from "@/main";
import useAxios from "@/shared/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";


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
