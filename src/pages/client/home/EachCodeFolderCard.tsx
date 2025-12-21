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
import { useCodeContext } from '../../../contexts/CodeContext';

type EachCodeFolderCard = {
  i: number;
  folder: CodeFolder;
};

export default function EachCodeFolderCard({ i, folder }: EachCodeFolderCard) {
  const { _id, code_blocks, folder_name, folder_description, updated_at } =
    folder;

  const navigate = useNavigate();

  const [dropdownShowing, setDropdownShowing] = useState(false);

  const dropDownRef = useDropdownClose({
    ignoredSelectors: [`.dropdown-close-btn-${i}`, '.uni-modal'],
    isOpen: dropdownShowing,
    onClose: () => setDropdownShowing(false),
  });

  // update folder details
  const { setUpdateDetails, setFolderDeleteDetails } = useCodeContext();

  // delete folder

  return (
    <motion.div
      layoutId={`folder_card_${folder._id}`}
      className={`bg-code ring-code-200 group border-code-100 relative grid min-h-[clamp(7.5rem,5.6484rem+8.2292vw,12.4375rem)] cursor-default grid-rows-[1fr_auto] overflow-hidden rounded-2xl border px-4 py-3 ring-0 transition-shadow duration-150 ${dropdownShowing ? 'border-code-200 ring-3' : 'pointer-fine:hover:border-code-200 pointer-fine:hover:ring-2'}`}
    >
      <button
        onClick={() => navigate(`/code/${_id}`)}
        className="absolute inset-0 z-1"
      ></button>

      <div
        className={`absolute top-2 right-2 z-3 ${dropdownShowing ? '' : 'transition-[scale,opacity] duration-150 pointer-fine:scale-60 pointer-fine:opacity-0 pointer-fine:group-hover:scale-100 pointer-fine:group-hover:opacity-100'}`}
      >
        <Tooltip
          content={dropdownShowing ? 'Close' : 'Menu'}
          tooltipOptions={{
            position: 'left',
          }}
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
            className={`dropdown-close-btn-${i} bg-code-50 border-code-100 inset-shadow-code grid size-8 place-items-center rounded-lg border shadow-xs inset-shadow-2xs active:transform-[scale(0.96)]`}
          >
            <span className="pointer-events-none relative grid size-full place-items-center overflow-hidden rounded-md">
              <AnimatePresence mode="wait">
                {dropdownShowing ? (
                  <motion.span
                    key="x-icon"
                    initial={{ scaleY: 0.5, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0.5, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="absolute"
                  >
                    <X size="18" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="ellipsis-icon"
                    initial={{ scaleX: 0.5, opacity: 1 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    exit={{ scaleX: 0.5, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="absolute"
                  >
                    <EllipsisIcon size="18" />
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
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.1 }}
              className="absolute top-[calc(100%+5px)] right-0 origin-top-right"
            >
              <div className="border-code-50 bg-code grid rounded-lg border py-1 text-sm shadow-xs">
                <motion.div
                  layoutId={`update_modal_${_id}`}
                  className="bg-code grid"
                >
                  <button
                    onClick={() => {
                      setUpdateDetails({
                        folder_id: _id,
                        folder_name: folder_name,
                        folder_description: folder_description,
                      });
                    }}
                    className="hover:bg-code-50 flex items-center justify-start gap-2 px-3 py-1.5"
                  >
                    <span>
                      <PencilLineIcon size="14" />
                    </span>
                    <span>Edit</span>
                  </button>
                </motion.div>

                <motion.div
                  className="bg-code grid"
                  layoutId={`delete-modal_${_id}`}
                >
                  <button
                    onClick={() => {
                      setFolderDeleteDetails({
                        folder_id: _id,
                        folder_name: folder_name,
                      });
                    }}
                    className="hover:bg-code-50 flex items-center justify-start gap-2 px-3 py-1.5"
                  >
                    <span>
                      <Trash2Icon size="14" />
                    </span>
                    <span>Delete</span>
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mb-4 space-y-2">
        <h3 className="text-code-600 line-clamp-2 max-w-8/10 text-xl font-semibold">
          {folder_name || 'Unknown'}
        </h3>
        <p className="text-code-700 line-clamp-2 sm:line-clamp-3 lg:line-clamp-4">
          {folder_description || 'Click to view folder content'}
        </p>
      </div>

      <div className="relative z-1 flex w-fit gap-1">
        <Tooltip
          content="Updated on"
          animation={{ delay: 40 }}
          tooltipOptions={{
            hideOnTouch: false,
          }}
        >
          <FormatedDate
            className="bg-code-50 border-code-100 inset-shadow-code border shadow-xs inset-shadow-2xs"
            time={updated_at}
          />
        </Tooltip>

        <Tooltip
          content={`${code_blocks.length} Blocks`}
          animation={{ delay: 40 }}
          tooltipOptions={{
            hideOnTouch: false,
          }}
        >
          <div className="bg-code-50 border-code-100 inset-shadow-code relative z-2 flex w-fit cursor-default items-center gap-1 rounded-lg border px-2 py-1 text-xs shadow-xs inset-shadow-2xs">
            <span>
              <FileBracesCornerIcon size="14" />
            </span>
            :<span>{code_blocks.length}</span>
          </div>
        </Tooltip>
      </div>
    </motion.div>
  );
}
