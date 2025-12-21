import type { CodeBlock } from '../../../types/types';
import GlossyButton from '../../../components/ui/GlossyButton';
import { CheckIcon, CopyIcon, PencilLineIcon, Trash2Icon } from 'lucide-react';
import { copy } from 'kitzo/fns';
import { Tooltip } from 'kitzo';
import { useState } from 'react';
import { supportedLanguages } from './utils/editorLanguage';
import { useCodeContext } from '../../../contexts/CodeContext';
import FormatedDate from '../home/components/FormatedDate';
import { AnimatePresence, motion } from 'motion/react';

// syntax highlighting
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { getStyle, supportedThemes } from './utils/editorStyle';

type CodeBlockViewProps = {
  block: CodeBlock;
  linkNavEnabled: boolean;
};

export default function CodeBlockView({
  block,
  linkNavEnabled,
}: CodeBlockViewProps) {
  const { setDeletingInfo, setEditDetails, setEditorState } = useCodeContext();

  const [copied, setCopied] = useState<boolean>(false);

  const id = block.title.trim()
    ? block?.title
        .trim()
        .toLowerCase()
        .replaceAll(/[^a-zA-Z0-9_]/g, '_')
        .replaceAll(/_+/g, '_') +
      '_' +
      block._id
    : `untitled_${block._id}`;

  return (
    <div
      id={'#' + id}
      className="bg-code relative scroll-mt-[85px] rounded-2xl px-3 pt-4 pb-3 shadow"
    >
      <div className="absolute top-0 right-4 -translate-y-1/3">
        <Tooltip
          content="Created on"
          tooltipOptions={{
            position: 'bottom',
            hideOnTouch: false,
          }}
        >
          <FormatedDate
            className="bg-code-50 border-code-100 inset-shadow-code border shadow-xs inset-shadow-2xs"
            time={block?.created_at as string}
          />
        </Tooltip>
      </div>

      <div className="mb-3 pl-2">
        <h3 className="text-code-800 text-lg font-medium md:text-xl">
          {block?.title ? (
            block?.title
          ) : (
            <span className="text-code-400">Untitled code block</span>
          )}
        </h3>
        <p className="text-code-700">
          {block?.description ? (
            block?.description
          ) : (
            <span className="text-code-300">
              No description yet. Add one if you like
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 pt-2 pb-3">
        <div className="flex items-center gap-1">
          <Tooltip content="Language">
            <span className="bg-code-50 border-code-100 inset-shadow-code grid h-7 cursor-default place-items-center rounded-full border px-3 text-sm shadow-xs inset-shadow-2xs">
              {
                supportedLanguages.find((l) => l.value === block?.language)
                  ?.name
              }
            </span>
          </Tooltip>

          <Tooltip content="Theme">
            <span className="bg-code-50 border-code-100 inset-shadow-code grid h-7 cursor-default place-items-center rounded-full border px-3 text-sm shadow-xs inset-shadow-2xs">
              {supportedThemes.find((t) => t.value === block?.theme)?.name}
            </span>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1">
          <motion.div
            className="relative z-5 rounded-full"
            layoutId={`delete-modal_${block._id}`}
          >
            <Tooltip content="Delete!">
              <GlossyButton
                content={
                  <span className="grid h-7 place-items-center px-3">
                    <Trash2Icon size="16" />
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
            className="relative z-5 rounded-full"
            layoutId={`update-code-block-modal-${block._id}`}
          >
            <Tooltip content="Edit">
              <GlossyButton
                content={
                  <span className="grid h-7 place-items-center px-3">
                    <PencilLineIcon size="16" />
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
                <span className="relative grid h-7 w-10 place-items-center">
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copyied-icon"
                        initial={{ scaleX: 0.5, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0.5, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="absolute"
                      >
                        <CheckIcon size="16" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy-icon"
                        initial={{ scaleX: 0.5, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        exit={{ scaleX: 0.5, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        className="absolute"
                      >
                        <CopyIcon size="16" />
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

      <div
        className={`syntax-highlighted-container mx-auto w-[clamp(16.875rem,-3.125rem+100vw,44.8125rem)] ${linkNavEnabled ? 'md:w-[clamp(31.125rem,-16.875rem+100vw,66.5rem)]' : 'md:w-[clamp(44.375rem,-2.7769rem+98.2332vw,79.125rem)]'}`}
      >
        <SyntaxHighlighter
          children={block?.code as string}
          style={getStyle(block?.theme)}
          language={block?.language}
          customStyle={{
            fontSize: 'clamp(0.875rem, 0.8333rem + 0.1852vw, 1rem)',
            padding: '0.625rem 1rem',
            margin: 0,
            minHeight: 40,
            maxHeight: 450,
            borderRadius: '0.5rem',
          }}
          showLineNumbers={true}
        />
      </div>

      <div className="pt-3">
        <div className="flex items-center gap-1 pl-2">
          <span className="text-sm">Updated:</span>
          <FormatedDate
            className="bg-code-50 shadow-xs"
            time={block?.updated_at as string}
          />
        </div>
      </div>
    </div>
  );
}
