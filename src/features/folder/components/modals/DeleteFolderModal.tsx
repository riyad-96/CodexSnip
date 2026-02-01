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
          title="Delete this folder!"
          description={
            <span className="text-neutral-600">
              Permanently delete the{' '}
              <span className="text-neutral-900 font-medium">
                '{folderDeleteDetails.folder_name || 'Unknown'}'
              </span>{' '}
              folder? This action is{' '}
              <span className="text-neutral-900 font-medium"> irreversible</span> and will
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
