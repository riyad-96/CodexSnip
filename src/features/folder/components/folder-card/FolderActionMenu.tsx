import { PencilLineIcon, Trash2Icon } from 'lucide-react';
import type { Folder } from '../../types/types';
import { useFolderStore } from '../../store/folder.store';
import { Tooltip } from 'kitzo';
import Button from '@/shared/components/ui/Button';

type ActionMenuProps = {
  folder: Folder;
};

export default function FolderActionMenu({ folder }: ActionMenuProps) {
  const { _id, folder_name, folder_description } = folder;
  const { setFolderUpdateDetails, setFolderDeleteDetails } = useFolderStore();

  return (
    <div className="space-y-1 pointer-fine:opacity-0 pointer-fine:group-hover:opacity-100">
      <Tooltip
        content="Edit"
        position="left"
        smartHover={false}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setFolderUpdateDetails({
              folder_id: _id,
              folder_name: folder_name,
              folder_description: folder_description,
            });
          }}
          variant="outline"
          size="icon"
          className="grid place-items-center"
        >
          <PencilLineIcon
            size={16}
            className="text-neutral-600"
          />
        </Button>
      </Tooltip>

      <Tooltip
        content="Delete"
        position="left"
        smartHover={false}
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setFolderDeleteDetails({
              folder_id: _id,
              folder_name: folder_name,
            });
          }}
          variant="outline"
          size="icon"
          className="grid place-items-center"
        >
          <Trash2Icon
            size={16}
            className="text-neutral-600"
          />
        </Button>
      </Tooltip>
    </div>
  );
}
