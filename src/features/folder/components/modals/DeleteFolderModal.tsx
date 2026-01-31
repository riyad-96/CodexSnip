import DeleteModal from '@/shared/components/ui/DeleteModal';
import { AnimatePresence } from 'motion/react';
import { useCodeStore } from '../../store/folder.store';
import useDeleteFolderMutation from '../../hooks/useDeleteFolderMutation';

export default function DeleteFolderModal() {
  const { folderDeleteDetails, setFolderDeleteDetails } = useCodeStore();

  // mutation: delete folder
  const { mutate: deleteFolder, isPending: deletingFolder } =
    useDeleteFolderMutation();

  return (
    <AnimatePresence>
      {folderDeleteDetails && (
        <DeleteModal
          layoutId={`delete-modal_${folderDeleteDetails.folder_id}`}
          title="Delete this folder!"
          description={
            <span className="text-neutral-600">
              Permanently delete the{' '}
              <span className="text-neutral-900">
                '{folderDeleteDetails.folder_name || 'Unknown'}'
              </span>{' '}
              folder? This action{' '}
              <span className="text-neutral-900">is irreversible</span> and will
              remove all code blocks inside it.
            </span>
          }
          cancelFn={() => setFolderDeleteDetails(null)}
          clickFn={() => deleteFolder(folderDeleteDetails)}
          isLoading={deletingFolder}
        />
      )}
    </AnimatePresence>
  );
}
