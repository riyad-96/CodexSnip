import Button from '@/shared/components/ui/Button';
import { PlusIcon } from 'lucide-react';
import { useFolderStore } from '../store/folder.store';

export default function FolderActionBar({ count }: { count: number }) {
  const setFolderCreateDetails = useFolderStore(
    (s) => s.setFolderCreateDetails,
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="pl-2">
        <span className="flex items-center text-xl font-medium">
          <span>Code folders</span>
          <span className="ml-2 text-sm font-normal text-neutral-500">
            ({count})
          </span>
        </span>
      </div>

      <Button
        onClick={() => {
          setFolderCreateDetails({
            folder_name: '',
            folder_description: '',
          });
        }}
        variant="default"
      >
        <span className="flex items-center gap-2">
          <PlusIcon
            size={16}
            strokeWidth="3"
          />
          <span>Add Folder</span>
        </span>
      </Button>
    </div>
  );
}
