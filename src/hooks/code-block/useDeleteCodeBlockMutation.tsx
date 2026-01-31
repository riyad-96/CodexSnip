import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../axios.hook';
import { queryClient } from '@/main';
import { useCodeStore } from '@/store/code.store';

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
