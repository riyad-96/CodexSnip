import { Tooltip } from 'kitzo';
import type { Block as BlockT } from '../types/types';
import { FileBracesCornerIcon, PlusIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Button from '@/shared/components/ui/Button';
import NavMenu from './NavMenu';
import Block from '../../block/components/Block';
import { useBlockStore } from '@/features/block/store/block.store';
import EditorModal from '@/features/block/components/modal/EditorModal';
import BlockDeleteModal from '@/features/block/components/modal/BlockDeleteModal';

type FolderContentType = {
  code_blocks: BlockT[];
};

export default function FolderContent({ code_blocks }: FolderContentType) {
  const { editorState, setEditorState } = useBlockStore();

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <Tooltip
          content={`${code_blocks.length} Blocks`}
          position="top-start"
          animation={{ delay: 40 }}
        >
          <div className="relative z-2 flex w-fit cursor-default items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
            <FileBracesCornerIcon
              size={16}
              className="text-neutral-600"
            />
            <span>{code_blocks.length}</span>
          </div>
        </Tooltip>

        {code_blocks.length !== 0 && (
          <div className="relative z-5">
            <Button
              onClick={() => setEditorState('new')}
              primary
            >
              <span className="flex items-center gap-2 px-4 py-2.5">
                <PlusIcon
                  size={16}
                  strokeWidth="3"
                />
                <span>Add Block</span>
              </span>
            </Button>
          </div>
        )}
      </div>

      {code_blocks.length > 0 ? (
        <div
          className={`grid ${code_blocks.length > 1 ? 'gap-4 md:grid-cols-[auto_1fr]' : ''}`}
        >
          {code_blocks.length > 1 && (
            <div className="w-50 max-md:hidden">
              <NavMenu code_blocks={code_blocks} />
            </div>
          )}

          <div className="min-w-0 space-y-6">
            {code_blocks.map((block) => (
              <Block
                key={block._id}
                block={block}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-20">
          <div className="mx-auto max-w-md text-center">
            <div className="px-8 py-12">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-100">
                <FileBracesCornerIcon
                  size={32}
                  className="text-neutral-600"
                />
              </div>
              <h3 className="mb-2 tracking-tight">No code blocks yet</h3>
              <p className="mb-6 text-neutral-600">
                Start by adding your first code block to this folder.
              </p>
              <div className="mx-auto w-fit">
                <Button
                  onClick={() => setEditorState('new')}
                  primary
                >
                  <span className="flex items-center gap-2 px-4 py-2.5">
                    <PlusIcon
                      size={16}
                      strokeWidth="3"
                    />
                    <span>Add Block</span>
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>{editorState && <EditorModal />}</AnimatePresence>
      <BlockDeleteModal />
    </>
  );
}
