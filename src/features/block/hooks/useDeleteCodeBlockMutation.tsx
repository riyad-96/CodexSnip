import { queryClient } from '@/main';
import useAxios from '@/shared/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { useBlockStore } from '../store/block.store';

type UseDeleteCodeBlockMutation = {
  codeFolderId: string;
};

export default function useDeleteCodeBlockMutation({
  codeFolderId,
}: UseDeleteCodeBlockMutation) {
  const server = useAxios();

  const setBlockDeleteDetails = useBlockStore((s) => s.setBlockDeleteDetails);

  return useMutation({
    mutationFn: async (code_block_id: string) => {
      const response = await server.delete(
        `/code/delete/${codeFolderId}/${code_block_id}`,
      );
      return response.data;
    },
    onSuccess: () => {
      setBlockDeleteDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folder', codeFolderId],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_partials', codeFolderId],
      });
    },
  });
}
