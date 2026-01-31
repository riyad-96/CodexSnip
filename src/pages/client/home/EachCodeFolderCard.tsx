import {
  EllipsisIcon,
  FileBracesCornerIcon,
  PencilLineIcon,
  Trash2Icon,
  X,
} from 'lucide-react';
import type { CodeFolder } from '../../../types/types';
import { Tooltip } from 'kitzo';
import { useNavigate } from 'react-router-dom';
import FormatedDate from './components/FormatedDate';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import useDropdownClose from '../../../hooks/useDropdownClose';
import { queryClient } from '@/main';
import { useAxios } from '@/hooks/axios.hook';
import { useCodeStore } from '@/store/code.store';

type EachCodeFolderCard = {
  i: number;
  folder: CodeFolder;
};

export default function EachCodeFolderCard({ i, folder }: EachCodeFolderCard) {
  const { _id, code_blocks, folder_name, folder_description, updated_at } =
    folder;
  const server = useAxios();
  const navigate = useNavigate();

  const [dropdownShowing, setDropdownShowing] = useState(false);

  const dropDownRef = useDropdownClose({
    ignoredSelectors: [`.dropdown-close-btn-${i}`, '.uni-modal'],
    isOpen: dropdownShowing,
    onClose: () => setDropdownShowing(false),
  });

  // update folder details
  const { setUpdateDetails, setFolderDeleteDetails } = useCodeStore();

  // delete folder

  return (
    <motion.div
      layout
      className={`group relative grid min-h-[clamp(8.75rem,7.5rem+6.25vw,12.5rem)] cursor-default grid-rows-[1fr_auto] overflow-hidden rounded-2xl border bg-white px-5 py-4 transition-colors duration-200 ${dropdownShowing ? 'border-neutral-400' : 'border-neutral-200 hover:border-neutral-400'}`}
      onMouseEnter={() => {
        queryClient.prefetchQuery({
          queryKey: ['code_folder', _id],
          queryFn: async () => {
            const response = await server.get(`/codefolder/get/${_id}`);
            return response.data;
          },
        });
      }}
    >
      <span
        className={`absolute inset-0 z-4 transition-all duration-150 ${dropdownShowing ? 'bg-white/60' : 'pointer-events-none bg-transparent'}`}
      ></span>

      <button
        onClick={() => navigate(`/code/${_id}`)}
        className="absolute inset-0 z-1"
      ></button>

      <div
        className={`absolute top-3 right-3 z-5 ${dropdownShowing ? '' : 'transition-colors duration-200 pointer-fine:scale-90 pointer-fine:opacity-0 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100'}`}
      >
        <Tooltip
          content={dropdownShowing ? 'Close' : 'Menu'}
          position="left"
          animation={{
            startDelay: 600,
          }}
        >
          <button
            onClick={() => {
              if (dropdownShowing) {
                setDropdownShowing(false);
                return;
              }
              setDropdownShowing(true);
            }}
            className={`dropdown-close-btn-${i} $hover:border-neutral-400 grid size-8 place-items-center rounded-lg border border-neutral-200 bg-white transition-colors active:scale-95`}
          >
            <span className="pointer-events-none relative grid size-full place-items-center overflow-hidden rounded-md">
              <AnimatePresence mode="wait">
                {dropdownShowing ? (
                  <motion.span
                    key="x-icon"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="absolute text-neutral-700"
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="ellipsis-icon"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="absolute text-neutral-700"
                  >
                    <EllipsisIcon size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </button>
        </Tooltip>

        <AnimatePresence>
          {dropdownShowing && (
            <motion.div
              ref={dropDownRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-[calc(100%+4px)] right-0 origin-top-right"
            >
              <div className="grid min-w-30 overflow-hidden rounded-xl border border-neutral-200 bg-white text-sm">
                <motion.div
                  layoutId={`update_modal_${_id}`}
                  className="grid bg-white"
                >
                  <button
                    onClick={() => {
                      setUpdateDetails({
                        folder_id: _id,
                        folder_name: folder_name,
                        folder_description: folder_description,
                      });
                    }}
                    className="flex items-center justify-start gap-2.5 px-4 py-2.5 transition-colors hover:bg-neutral-100 pointer-fine:cursor-pointer"
                  >
                    <PencilLineIcon
                      size={16}
                      className="text-neutral-600"
                    />
                    <span>Edit</span>
                  </button>
                </motion.div>

                <motion.div
                  className="grid bg-white"
                  layoutId={`delete-modal_${_id}`}
                >
                  <button
                    onClick={() => {
                      setFolderDeleteDetails({
                        folder_id: _id,
                        folder_name: folder_name,
                      });
                    }}
                    className="flex items-center justify-start gap-2.5 px-4 py-2.5 transition-colors hover:bg-neutral-100 pointer-fine:cursor-pointer"
                  >
                    <Trash2Icon
                      size={16}
                      className="text-neutral-600"
                    />
                    <span>Delete</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-4 space-y-2">
        <h3 className="line-clamp-2 max-w-8/10 tracking-tight">
          {folder_name || 'Unknown'}
        </h3>
        <p className="line-clamp-2 leading-relaxed text-neutral-600 sm:line-clamp-3 lg:line-clamp-4">
          {folder_description || 'Click to view folder content'}
        </p>
      </div>

      <div className="relative z-1 flex w-fit gap-2">
        <Tooltip
          content="Updated on"
          animation={{ delay: 40 }}
          hideOnTouch={false}
        >
          <FormatedDate
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs text-neutral-700"
            time={updated_at}
          />
        </Tooltip>

        <Tooltip
          content={`${code_blocks.length} Blocks`}
          animation={{ delay: 40 }}
          hideOnTouch={false}
        >
          <div className="relative z-2 flex w-fit cursor-default items-center gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 text-xs text-neutral-700">
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
