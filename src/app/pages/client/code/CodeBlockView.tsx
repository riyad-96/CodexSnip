import { CheckIcon, CopyIcon, PencilLineIcon, Trash2Icon } from 'lucide-react';
import { copy } from 'kitzo/fns';
import { Tooltip } from 'kitzo';
import { useState } from 'react';
import { supportedLanguages } from './utils/editorLanguage';
import FormatedDate from '../home/components/FormatedDate';
import { AnimatePresence, motion } from 'motion/react';

// syntax highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { getStyle, supportedThemes } from './utils/editorStyle';
import getCodeNavigationId from '@/utils/getCodeNavigationId';
import { useCodeStore } from '@/store/code.store';
import type { CodeBlock } from '@/types/types';
import GlossyButton from '@/components/ui/GlossyButton';

type CodeBlockViewProps = {
  block: CodeBlock;
};

export default function CodeBlockView({ block }: CodeBlockViewProps) {
  const { setDeletingInfo, setEditDetails, setEditorState } = useCodeStore();

  const [copied, setCopied] = useState<boolean>(false);

  const id = getCodeNavigationId(block.title, block._id);

  return (
    <motion.div
      layout
      id={'#' + id}
      className="relative scroll-mt-21.25 rounded-2xl border border-neutral-200 bg-white px-4 pt-5 pb-4"
    >
      <div className="absolute top-0 right-5 -translate-y-1/2">
        <Tooltip
          content="Created on"
          position="bottom"
          hideOnTouch={false}
        >
          <FormatedDate
            className="rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs text-neutral-700"
            time={block?.created_at as string}
          />
        </Tooltip>
      </div>

      <div className="mb-4 pl-1">
        <h3 className="mb-1 tracking-tight">
          {block?.title ? (
            block?.title
          ) : (
            <span className="text-neutral-400">Untitled code block</span>
          )}
        </h3>
        <p className="leading-relaxed text-neutral-600">
          {block?.description ? (
            block?.description
          ) : (
            <span className="text-neutral-400">
              No description yet. Add one if you like
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 pt-2 pb-4">
        <div className="flex items-center gap-2">
          <Tooltip content="Language">
            <span className="grid h-8 cursor-default place-items-center rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm text-neutral-700">
              {
                supportedLanguages.find((l) => l.value === block?.language)
                  ?.name
              }
            </span>
          </Tooltip>

          <Tooltip content="Theme">
            <span className="grid h-8 cursor-default place-items-center rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 text-sm text-neutral-700">
              {supportedThemes.find((t) => t.value === block?.theme)?.name}
            </span>
          </Tooltip>
        </div>

        <div className="flex items-center gap-2">
          <motion.div
            className="relative z-5 rounded-xl"
            layoutId={`delete-modal_${block._id}`}
          >
            <Tooltip content="Delete!">
              <GlossyButton
                content={
                  <span className="grid h-8 place-items-center px-3.5">
                    <Trash2Icon
                      size={16}
                      className="text-neutral-700"
                    />
                  </span>
                }
                onClick={() =>
                  setDeletingInfo({
                    folder_id: block?.folder_id,
                    code_block_id: block?._id,
                    code_block_title: block?.title,
                  })
                }
              />
            </Tooltip>
          </motion.div>

          <motion.div
            className="relative z-5 rounded-xl"
            layoutId={`update-code-block-modal-${block._id}`}
          >
            <Tooltip content="Edit">
              <GlossyButton
                content={
                  <span className="grid h-8 place-items-center px-3.5">
                    <PencilLineIcon
                      size={16}
                      className="text-neutral-700"
                    />
                  </span>
                }
                onClick={() => {
                  setEditDetails(block);
                  setEditorState('update');
                }}
              />
            </Tooltip>
          </motion.div>

          <Tooltip content={copied ? 'Copied' : 'Copy'}>
            <GlossyButton
              content={
                <span className="relative grid h-8 w-11 place-items-center">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copyied-icon"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="absolute text-neutral-700"
                      >
                        <CheckIcon size={16} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy-icon"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="absolute text-neutral-700"
                      >
                        <CopyIcon size={16} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              }
              onClick={async () => {
                await copy(block?.code);
                if (copied) return;
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            />
          </Tooltip>
        </div>
      </div>

      <div className={`syntax-highlighted-container`}>
        <SyntaxHighlighter
          children={block?.code as string}
          style={getStyle(block?.theme)}
          language={block?.language}
          customStyle={{
            fontSize: 'clamp(0.875rem, 0.8333rem + 0.1852vw, 1rem)',
            padding: '1rem 1.25rem',
            margin: 0,
            minHeight: 40,
            maxHeight: 450,
            borderRadius: 12,
          }}
          showLineNumbers={true}
        />
      </div>

      <div className="pt-4 pl-1">
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-600">Updated:</span>
          <FormatedDate
            className="rounded-lg border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-700"
            time={block?.updated_at as string}
          />
        </div>
      </div>
    </motion.div>
  );
}
