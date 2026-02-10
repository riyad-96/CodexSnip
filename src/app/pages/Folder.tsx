import { useFolderStore } from '@/features/folder/store/folder.store';
import { useParams } from 'react-router-dom';
import { Tooltip } from 'kitzo';
import Button from '@/shared/components/ui/Button';
import { PencilLineIcon } from 'lucide-react';
import FolderContent from '@/features/folder/components/FolderContent';
import useFetchFolderQuery from '@/features/folder/hooks/useFetchFolderQuery';
import { UNTITLED_FOLDER } from '@/shared/constants/fallbacks';
import TooltipContent from '@/shared/components/ui/TooltipContent';

export default function Folder() {
  const codeFolderId = useParams().id as string;

  const {
    data: codeFolder,
    isLoading: codeFolderLoading,
    error: codeFolderError,
  } = useFetchFolderQuery({ folderId: codeFolderId });

  // udpate folder details
  const setFolderUpdateDetails = useFolderStore(
    (s) => s.setFolderUpdateDetails,
  );

  if (codeFolderLoading) {
    return (
      <div className="flex justify-center pt-42">
        <span className="loading loading-spinner loading-xl opacity-80"></span>
      </div>
    );
  }

  if (codeFolderError || !codeFolder) {
    return (
      <div className="pt-20">
        <div className="mx-auto max-w-md text-center">
          <div className="rounded-2xl border border-neutral-200 bg-white px-8 py-12">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-100">
              <svg
                className="size-8 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mb-2 tracking-tight">Folder not found</h3>
            <p className="text-neutral-600">
              This folder doesn't exist or you don't have access to it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <div className="mb-6 flex items-start gap-3">
        <div className="flex-1 space-y-2 pl-2">
          <h2 className="text-2xl tracking-tight">
            {codeFolder?.folder_name || UNTITLED_FOLDER}
          </h2>
          <p className="leading-relaxed text-neutral-600">
            {codeFolder?.folder_description || 'No description yet'}
          </p>
        </div>

        <div>
          <Tooltip
            content={
              <TooltipContent
                className="text-center"
                children={'Edit folder \nname & description'}
              />
            }
            position="left-start"
            animation={{
              startDelay: 400,
            }}
          >
            <Button
              onClick={() =>
                setFolderUpdateDetails({
                  folder_name: codeFolder.folder_name,
                  folder_description: codeFolder.folder_description,
                  folder_id: codeFolder._id,
                })
              }
              variant="outline"
            >
              <span className="grid place-items-center">
                <PencilLineIcon
                  size={16}
                  className="text-neutral-700"
                />
              </span>
            </Button>
          </Tooltip>
        </div>
      </div>

      <FolderContent code_blocks={codeFolder.code_blocks} />
    </div>
  );
}
