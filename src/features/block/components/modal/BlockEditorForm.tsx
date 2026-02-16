import Button from '@/shared/components/ui/Button';
import Select from '@/shared/components/ui/Select';
import { supportedLanguages } from '@/features/folder/lib/editorLanguage';
import { supportedThemes } from '@/features/folder/lib/editorStyle';
import type { EditorValuesType } from '@/features/folder/types/editor';
import { useState } from 'react';

type BlockEditorFormProps = {
  initialValues: EditorValuesType;
  onSubmit: (values: EditorValuesType) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel: string;
};

export default function BlockEditorForm({
  initialValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel,
}: BlockEditorFormProps) {
  const [values, setValues] = useState<EditorValuesType>(initialValues);

  return (
    <>
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
        {!isSubmitting && (
          <Button
            onClick={onCancel}
            className="grid place-items-center"
            variant="outline"
          >
            Cancel
          </Button>
        )}
        <Button
          onClick={() => onSubmit(values)}
          variant="default"
          className="grid h-8.5 min-w-25 place-items-center sm:h-9.5"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-xs opacity-80"></span>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </>
  );
}
