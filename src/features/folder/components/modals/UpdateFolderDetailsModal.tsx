import { AnimatePresence } from 'motion/react';
import { useFolderStore } from '../../store/folder.store';
import type { UpdateFolderDetailsType } from '../../types/codeFolderTypes';
import Button from '@/shared/components/ui/Button';
import useUpdateFolderDetailsMutation from '../../hooks/useUpdateFolderDetailsMutation';
import Modal from '@/shared/components/ui/Modal';
import { isPointerDevice } from '@/shared/constants/general';

export default function UpdateFolderDetailsModal() {
  const { folderUpdateDetails, setFolderUpdateDetails } = useFolderStore();

  // mutation: update folder
  const { mutate: updateFolderDetails, isPending: updatingFolderDetails } =
    useUpdateFolderDetailsMutation();

  return (
    <AnimatePresence>
      {folderUpdateDetails && (
        <Modal
          className="w-full max-w-125 rounded-2xl border border-neutral-200 bg-white p-6"
          onMouseDown={() => setFolderUpdateDetails(null)}
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
                value={folderUpdateDetails.folder_name}
                onChange={(e) =>
                  setFolderUpdateDetails(
                    (prev) =>
                      ({
                        ...prev,
                        folder_name: e.target.value,
                      }) as UpdateFolderDetailsType,
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
                value={folderUpdateDetails.folder_description}
                onChange={(e) =>
                  setFolderUpdateDetails(
                    (prev) =>
                      ({
                        ...prev,
                        folder_description: e.target.value,
                      }) as UpdateFolderDetailsType,
                  )
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              onClick={() => setFolderUpdateDetails(null)}
              className="grid place-items-center"
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (updatingFolderDetails) return;
                updateFolderDetails({
                  folder_name: folderUpdateDetails.folder_name,
                  folder_description: folderUpdateDetails.folder_description,
                  folder_id: folderUpdateDetails.folder_id,
                });
              }}
              disabled={updatingFolderDetails}
              variant="default"
              className="grid place-items-center"
            >
              Update
            </Button>
          </div>
        </Modal>
      )}
    </AnimatePresence>
  );
}
