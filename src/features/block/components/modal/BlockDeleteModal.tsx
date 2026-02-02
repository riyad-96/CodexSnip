import { useParams } from 'react-router-dom';
import useDeleteCodeBlockMutation from '../../hooks/useDeleteCodeBlockMutation';
import { useBlockStore } from '../../store/block.store';
import { AnimatePresence } from 'motion/react';
import DeleteModal from '@/shared/components/ui/DeleteModal';
import { UNTITLED_BLOCK } from '@/shared/constants/fallbacks';

export default function BlockDeleteModal() {
  const { blockDeleteDetails, setBlockDeleteDetails } = useBlockStore();
  const codeFolderId = useParams().id as string;

  // mutation: delete code block
  const { mutate: deleteCodeBlock, isPending: isDeletingCodeBlock } =
    useDeleteCodeBlockMutation({ codeFolderId });

  return (
    <AnimatePresence>
      {blockDeleteDetails && (
        <DeleteModal
          title="Delete code block!"
          description={
            <span className="tracking-wide text-neutral-600">
              Delete '
              <span className="text-neutral-900">
                {blockDeleteDetails.code_block_title || UNTITLED_BLOCK}
              </span>
              ' code block permanently? This action is irreversible.
            </span>
          }
          isLoading={isDeletingCodeBlock}
          cancelFn={() => setBlockDeleteDetails(null)}
          clickFn={() => {
            if (isDeletingCodeBlock) return;
            deleteCodeBlock(blockDeleteDetails.code_block_id);
          }}
        />
      )}
    </AnimatePresence>
  );
}
