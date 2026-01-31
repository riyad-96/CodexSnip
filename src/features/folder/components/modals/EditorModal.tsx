import { useState } from "react";
import { useCodeStore } from "../../store/code.store";
import type { EditorUpdateValuesType, EditorValuesType } from "../../types/editor";
import Modal from "@/shared/components/ui/Modal";
import Select from "../Select";
import { supportedLanguages } from "../../lib/editorLanguage";
import { supportedThemes } from "../../lib/editorStyle";
import GlossyButton from "@/shared/components/ui/GlossyButton";

type EditorModalProps = {
  editorState: 'new' | 'update' | null;
  setEditorState: React.Dispatch<React.SetStateAction<'new' | 'update' | null>>;
  actions: {
    addNewCodeBlock: (values: EditorValuesType) => void;
    updateCodeBlock: (values: EditorUpdateValuesType) => void;
  };
  isAdding: boolean;
  isUpdating: boolean;
  layoutId?: string;
};

export default function EditorModal({
  editorState,
  setEditorState,
  actions,
  isAdding,
  isUpdating,
}: EditorModalProps) {
  const editDetails = useCodeStore((s) => s.editDetails);
  const { addNewCodeBlock, updateCodeBlock } = actions;

  const [values, setValues] = useState<EditorValuesType>(() => {
    if (editorState === 'update') {
      return {
        title: editDetails?.title ?? '',
        description: editDetails?.description ?? '',
        code: editDetails?.code ?? '',
        language: editDetails?.language ?? 'plaintext',
        theme: editDetails?.theme ?? 'coy',
      };
    }
    return {
      title: '',
      description: '',
      code: '',
      language: 'plaintext',
      theme: 'coy',
    };
  });

  return (
    <Modal
      onMouseDown={() => setEditorState(null)}
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
              setValues((prev) => ({ ...prev, description: e.target.value }))
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
            className="relative max-h-125 min-h-50 resize-y rounded-xl border border-neutral-200 bg-white px-4 py-3 font-[monospace] text-base transition-colors outline-none focus:border-neutral-400 max-sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        {!isAdding && !isUpdating && (
          <GlossyButton
            content={
              <span className="grid h-9 place-items-center px-5">Cancel</span>
            }
            onClick={() => setEditorState(null)}
          />
        )}
        <GlossyButton
          onClick={() => {
            if (isAdding || isUpdating) return;
            if (editorState === 'new') {
              addNewCodeBlock(values);
            } else {
              updateCodeBlock({
                ...values,
                code_block_id: editDetails?._id as string,
              });
            }
          }}
          content={
            <span className="grid h-9 min-w-25 place-items-center px-5">
              {isAdding || isUpdating ? (
                <span className="loading loading-spinner loading-xs opacity-80"></span>
              ) : (
                <span>{editorState === 'new' ? 'Add block' : 'Update'}</span>
              )}
            </span>
          }
          primary
        />
      </div>
    </Modal>
  );
}
