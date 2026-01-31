import { useCodeStore } from "@/features/folder/store/code.store";
import { queryClient } from "@/main";
import useAxios from "@/shared/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

type UseDeleteCodeBlockMutation = {
  codeFolderId: string;
};

export default function useDeleteCodeBlockMutation({
  codeFolderId,
}: UseDeleteCodeBlockMutation) {
  const server = useAxios();

  const setDeletingInfo = useCodeStore((s) => s.setDeletingInfo);

  return useMutation({
    mutationFn: async (code_block_id: string) => {
      const response = await server.delete(
        `/code/delete/${codeFolderId}/${code_block_id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      setDeletingInfo(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folder', codeFolderId],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_partials', codeFolderId],
      });
    },
  });
}
