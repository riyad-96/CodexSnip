import { PencilLineIcon, Trash2Icon } from 'lucide-react';
import type { Folder } from '../../types/types';
import { useFolderStore } from '../../store/folder.store';
import { Tooltip } from 'kitzo';
import Button from '@/shared/components/ui/Button';
import TooltipContent from '@/shared/components/ui/TooltipContent';

type ActionMenuProps = {
  folder: Folder;
};

export default function FolderActionMenu({ folder }: ActionMenuProps) {
  const { _id, folder_name, folder_description } = folder;
  const { setFolderUpdateDetails, setFolderDeleteDetails } = useFolderStore();

  return (
    <div className="space-y-1">
      <Tooltip
        content={<TooltipContent children={'Edit'} />}
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
          className="grid place-items-center duration-150 pointer-fine:scale-0 pointer-fine:opacity-0 pointer-fine:transition-[opacity,scale]! pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"
        >
          <PencilLineIcon
            size={16}
            className="text-neutral-600"
          />
        </Button>
      </Tooltip>

      <Tooltip
        content={<TooltipContent children={'Delete!'} />}
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
          className="grid place-items-center duration-150 pointer-fine:scale-0 pointer-fine:opacity-0 pointer-fine:transition-[opacity,scale]! pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100"
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
