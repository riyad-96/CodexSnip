import type { Folder } from '@/features/folder/types/types';
import api from '@/shared/lib/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { queryClient } from '@/main';
import { Tooltip } from 'kitzo';
import { FileBracesCornerIcon } from 'lucide-react';
import FormatedDate from '@/shared/components/ui/FormatedDate';
import { UNTITLED_FOLDER } from '@/shared/constants/fallbacks';
import FolderActionMenu from './FolderActionMenu';
import TooltipContent from '@/shared/components/ui/TooltipContent';

type EachFolderCard = {
  folder: Folder;
};

export default function EachFolderCard({ folder }: EachFolderCard) {
  const { _id, code_blocks, folder_name, folder_description, updated_at } =
    folder;

  const navigate = useNavigate();

  // prefetch folder data
  function prefetchFolderData() {
    const data = queryClient.getQueryData(['folder_with_blocks', _id]);

    if (!data) {
      queryClient.prefetchQuery({
        queryKey: ['folder_with_blocks', _id],
        queryFn: async () => {
          const response = await api.get(`/codefolder/get/${_id}`);
          return response.data;
        },
      });
    }
  }

  return (
    <motion.div
      layout
      onClick={() => navigate(`/folder/${_id}`)}
      className={`group relative isolate grid min-h-[clamp(8.75rem,7.5rem+6.25vw,12.5rem)] cursor-pointer grid-rows-[1fr_auto] rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-lg/3 transition-[border-color,box-shadow] duration-200 pointer-fine:hover:border-neutral-300 pointer-fine:hover:shadow-lg/5`}
      onMouseEnter={prefetchFolderData}
      onTouchStart={prefetchFolderData}
    >
      <div className="flex">
        <div className="mb-4 flex-1 space-y-2">
          <h3 className="line-clamp-2 max-w-8/10 tracking-tight">
            {folder_name || UNTITLED_FOLDER}
          </h3>
          <p className="line-clamp-2 leading-relaxed text-neutral-600 sm:line-clamp-3 lg:line-clamp-4">
            {folder_description || 'Click to view folder content'}
          </p>
        </div>

        <FolderActionMenu folder={folder} />
      </div>

      <div className="relative flex w-fit gap-2">
        <Tooltip
          content={<TooltipContent children={'Updated on'} />}
          animation={{ startDelay: 40 }}
          hideOnTouch={false}
          smartHover={false}
        >
          <FormatedDate
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-700"
            time={updated_at}
          />
        </Tooltip>

        <Tooltip
          content={<TooltipContent children={`${code_blocks.length} Blocks`} />}
          animation={{ startDelay: 40 }}
          hideOnTouch={false}
          smartHover={false}
        >
          <div className="flex w-fit cursor-default items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-700">
            <FileBracesCornerIcon
              size={14}
              className="text-neutral-600"
            />
            <span>{code_blocks.length}</span>
          </div>
        </Tooltip>
      </div>
    </motion.div>
  );
}
