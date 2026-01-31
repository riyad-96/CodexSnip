import { Tooltip } from 'kitzo';
import type { CodeBlock } from '../types/types';
import { FileBracesCornerIcon, PlusIcon } from 'lucide-react';
import { motion } from 'motion/react';
import GlossyButton from '@/shared/components/ui/GlossyButton';
import CodeNavMenu from './CodeNavMenu';
import Block from '../../block/components/Block';
import { useBlockStore } from '@/features/block/store/block.store';

type CodeFolderContentType = {
  code_blocks: CodeBlock[];
};

export default function CodeFolderContent({
  code_blocks,
}: CodeFolderContentType) {
  const setEditorState = useBlockStore((s) => s.setEditorState);

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
          <motion.div
            className="relative z-5"
            layoutId="create-code-block-modal"
          >
            <GlossyButton
              content={
                <span className="flex items-center gap-2 px-4 py-2.5">
                  <PlusIcon
                    size={16}
                    strokeWidth="3"
                  />
                  <span>Add Block</span>
                </span>
              }
              onClick={() => setEditorState('new')}
              primary
            />
          </motion.div>
        )}
      </div>

      {code_blocks.length > 0 ? (
        <div
          className={`grid ${code_blocks.length > 1 ? 'gap-4 md:grid-cols-[auto_1fr]' : ''}`}
        >
          {code_blocks.length > 1 && (
            <div className="w-50 max-md:hidden">
              <CodeNavMenu code_blocks={code_blocks} />
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
                <GlossyButton
                  content={
                    <span className="flex items-center gap-2 px-4 py-2.5">
                      <PlusIcon
                        size={16}
                        strokeWidth="3"
                      />
                      <span>Add Block</span>
                    </span>
                  }
                  onClick={() => setEditorState('new')}
                  primary
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
