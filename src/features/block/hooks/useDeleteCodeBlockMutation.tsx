import { queryClient } from '@/main';
import useAxios from '@/shared/hooks/useAxios';
import { useMutation } from '@tanstack/react-query';
import { useBlockStore } from '../store/block.store';
import type { CodeFolderWithBlocks } from '@/features/folder/types/types';

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
    onMutate: async (code_block_id) => {
      setBlockDeleteDetails(null);

      // cancel queries
      await queryClient.cancelQueries({
        queryKey: ['folder_with_blocks', codeFolderId],
      });

      // update query data
      const folder = queryClient.getQueryData([
        'folder_with_blocks',
        codeFolderId,
      ]) as CodeFolderWithBlocks;

      const remainningBlocks = folder.code_blocks.filter(
        (b) => b._id !== code_block_id,
      );

      queryClient.setQueryData(['folder_with_blocks', codeFolderId], {
        ...folder,
        code_blocks: remainningBlocks,
      });

      return { ...folder };
    },
    onError: (_, __, mutateResult) => {
      // rollback query data
      queryClient.setQueryData(
        ['folder_with_blocks', codeFolderId],
        mutateResult,
      );
    },
    onSettled: () => {
      // invalidate queries
      queryClient.invalidateQueries({
        queryKey: ['folder_with_blocks', codeFolderId],
      });
    },
  });
}
