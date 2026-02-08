import { PencilLineIcon, Trash2Icon } from 'lucide-react';
import type { Folder } from '../../types/types';
import { useFolderStore } from '../../store/folder.store';

type ActionMenuProps = {
  folder: Folder;
};

export default function FolderActionMenu({ folder }: ActionMenuProps) {
  const { _id, folder_name, folder_description } = folder;
  const { setFolderUpdateDetails, setFolderDeleteDetails } = useFolderStore();

  return (
    <div className="space-y-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFolderUpdateDetails({
            folder_id: _id,
            folder_name: folder_name,
            folder_description: folder_description,
          });
        }}
        className="grid size-8 place-items-center border rounded-md border-neutral-200 pointer-fine:hover:border-neutral-300 pointer-fine:hover:bg-neutral-100"
      >
        <PencilLineIcon
          size={16}
          className="text-neutral-600"
        />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFolderDeleteDetails({
            folder_id: _id,
            folder_name: folder_name,
          });
        }}
        className="grid size-8 place-items-center border rounded-md border-neutral-200 pointer-fine:hover:border-neutral-300 pointer-fine:hover:bg-neutral-100"
      >
        <Trash2Icon
          size={16}
          className="text-neutral-600"
        />
      </button>
    </div>
  );
}
