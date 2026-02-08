import DeleteModal from '@/shared/components/ui/DeleteModal';
import { AnimatePresence } from 'motion/react';
import { useFolderStore } from '../../store/folder.store';
import useDeleteFolderMutation from '../../hooks/useDeleteFolderMutation';
import { UNTITLED_FOLDER } from '@/shared/constants/fallbacks';

export default function DeleteFolderModal() {
  const { folderDeleteDetails, setFolderDeleteDetails } = useFolderStore();

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
              <span className="font-medium text-neutral-900">
                '{folderDeleteDetails.folder_name || UNTITLED_FOLDER}'
              </span>{' '}
              folder? This action is{' '}
              <span className="font-medium text-neutral-900">
                {' '}
                irreversible
              </span>{' '}
              and will remove all code blocks inside it.
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
