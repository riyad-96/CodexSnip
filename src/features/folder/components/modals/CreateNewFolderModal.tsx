import Modal from '@/shared/components/ui/Modal';
import { useFolderStore } from '../../store/folder.store';
import type { AddFolderDetailsType } from '../../types/codeFolderTypes';
import Button from '@/shared/components/ui/Button';
import { AnimatePresence } from 'motion/react';
import useCreateNewFolderMutation from '../../hooks/useCreateNewFolderMutation';
import { isPointerDevice } from '@/shared/constants/general';

export default function CreateNewFolderModal() {
  const { folderCreateDetails, setFolderCreateDetails } = useFolderStore();

  // mutation: create new folder
  const { mutate: createNewFolder, isPending: isNewFolderCreating } =
    useCreateNewFolderMutation({ setFolderCreateDetails });

  return (
    <AnimatePresence>
      {folderCreateDetails && (
        <Modal
          className="w-full max-w-125 rounded-2xl border border-neutral-200 bg-white p-6"
          onMouseDown={() => setFolderCreateDetails(null)}
        >
          <div className="mb-6 space-y-4">
            <div className="grid gap-2">
              <label
                className="text-sm text-neutral-700"
                htmlFor="folder-title"
              >
                Name
              </label>
              <input
                autoFocus={isPointerDevice}
                className="rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors outline-none focus:border-neutral-400"
                id="folder-title"
                type="text"
                placeholder="Folder name"
                value={folderCreateDetails.folder_name}
                onChange={(e) =>
                  setFolderCreateDetails(
                    (prev) =>
                      ({
                        ...prev,
                        folder_name: e.target.value,
                      }) as AddFolderDetailsType,
                  )
                }
              />
            </div>

            <div className="grid gap-2">
              <label
                className="text-sm text-neutral-700"
                htmlFor="folder-description"
              >
                Description
              </label>
              <textarea
                className="max-h-75 min-h-25 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors outline-none focus:border-neutral-400"
                id="folder-description"
                placeholder="Folder description"
                value={folderCreateDetails.folder_description}
                onChange={(e) =>
                  setFolderCreateDetails(
                    (prev) =>
                      ({
                        ...prev,
                        folder_description: e.target.value,
                      }) as AddFolderDetailsType,
                  )
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setFolderCreateDetails(null)}>
              <span className="grid h-9 place-items-center px-5">Cancel</span>
            </Button>
            <Button
              onClick={() => {
                if (isNewFolderCreating) return;
                createNewFolder({
                  folder_name: folderCreateDetails.folder_name,
                  folder_description: folderCreateDetails.folder_description,
                });
              }}
              primary
            >
              <span className="grid h-9 min-w-20 place-items-center px-5">
                {isNewFolderCreating ? (
                  <span className="loading loading-spinner loading-xs opacity-80"></span>
                ) : (
                  <span>Create</span>
                )}
              </span>
            </Button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
