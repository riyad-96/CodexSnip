import { useEffect, useState } from 'react';
import Modal from '@/shared/components/ui/Modal';
import { supportedLanguages } from '@/features/folder/lib/editorLanguage';
import { supportedThemes } from '@/features/folder/lib/editorStyle';
import Button from '@/shared/components/ui/Button';
import { useBlockStore } from '@/features/block/store/block.store';
import type { EditorValuesType } from '@/features/folder/types/editor';
import useAddNewCodeBlockMutation from '../../hooks/useAddNewCodeBlockMutation';
import useUpdateCodeBlockMutation from '../../hooks/useUpdateCodeBlockMutation';
import Select from '@/shared/components/ui/Select';

export default function EditorModal() {
  const { blockEditDetails, setBlockEditDetails, editorState, setEditorState } =
    useBlockStore();

  // mutation: add new code block
  const { mutate: addNewCodeBlock, isPending: isAddingCodeBlock } =
    useAddNewCodeBlockMutation();

  // mutation: update code block
  const { mutate: updateCodeBlock } = useUpdateCodeBlockMutation();

  const [values, setValues] = useState<EditorValuesType>({
    title: '',
    description: '',
    code: '',
    language: 'plaintext',
    theme: 'coy',
  });

  useEffect(() => {
    (() => {
      setValues({
        title: blockEditDetails?.title ?? '',
        description: blockEditDetails?.description ?? '',
        code: blockEditDetails?.code ?? '',
        language: blockEditDetails?.language ?? 'plaintext',
        theme: blockEditDetails?.theme ?? 'coy',
      });
    })();
  }, [blockEditDetails]);

  return (
    <Modal
      onMouseDown={() => {
        setEditorState(null);
        setBlockEditDetails(null);
      }}
      className="w-full max-w-175 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label
            className="text-sm text-neutral-700"
            htmlFor="block-title"
          >
            Title
          </label>
          <input
            id="block-title"
            type="text"
            placeholder="Block title"
            value={values.title}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, title: e.target.value }))
            }
            className="rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors outline-none focus:border-neutral-400"
          />
        </div>
        <div className="grid gap-2">
          <label
            className="text-sm text-neutral-700"
            htmlFor="block-description"
          >
            Description
          </label>
          <textarea
            id="block-description"
            value={values.description}
            onChange={(e) =>
              setValues((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="max-h-37.5 min-h-20 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors outline-none focus:border-neutral-400"
            placeholder="Block description"
          />
        </div>
      </div>

      <div className="relative grid gap-3">
        <div className="grid gap-3 sm:flex sm:items-center sm:justify-end">
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-700 max-sm:flex-1">
              Language
            </span>
            <Select
              className="rounded-xl border border-neutral-200 bg-white transition-colors focus-within:border-neutral-400 max-sm:flex-2 sm:w-35"
              value={values.language}
              onChange={({ value }) => {
                setValues((prev) => ({ ...prev, language: value }));
              }}
              options={supportedLanguages}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-700 max-sm:flex-1">
              Theme
            </span>
            <Select
              className="rounded-xl border border-neutral-200 bg-white transition-colors focus-within:border-neutral-400 max-sm:flex-2 sm:w-35"
              value={values.theme}
              onChange={({ value }) =>
                setValues((prev) => ({ ...prev, theme: value }))
              }
              options={supportedThemes}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <label className="text-sm text-neutral-700">Code</label>
          <textarea
            value={values.code}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, code: e.target.value }))
            }
            placeholder="Type or paste your code here..."
            className="relative max-h-125 min-h-50 resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 font-[monospace] text-sm transition-colors outline-none focus:border-neutral-400 max-sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {!isAddingCodeBlock && (
          <Button
            onClick={() => {
              setEditorState(null);
              setBlockEditDetails(null);
            }}
            className="grid place-items-center"
            variant="outline"
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={() => {
            if (isAddingCodeBlock) return;
            if (editorState === 'new') {
              addNewCodeBlock(values);
            } else {
              updateCodeBlock({
                ...values,
                code_block_id: blockEditDetails?._id as string,
                folder_id: blockEditDetails?.folder_id as string,
              });
            }
          }}
          variant="default"
          className="grid h-8.5 min-w-25 place-items-center sm:h-9.5"
        >
          {editorState === 'new' ? (
            <>
              {isAddingCodeBlock ? (
                <span className="loading loading-spinner loading-xs opacity-80"></span>
              ) : (
                'Add Block'
              )}
            </>
          ) : (
            'Update'
          )}
        </Button>
      </div>
    </Modal>
  );
}
