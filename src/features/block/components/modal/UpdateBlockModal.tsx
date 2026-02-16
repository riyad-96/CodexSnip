import Modal from '@/shared/components/ui/Modal';
import { useBlockStore } from '@/features/block/store/block.store';
import useUpdateCodeBlockMutation from '../../hooks/useUpdateCodeBlockMutation';
import BlockEditorForm from './BlockEditorForm';
import type { EditorValuesType } from '@/features/folder/types/editor';

import type { Block } from '@/features/folder/types/types';

export default function UpdateBlockModal({ block }: { block: Block }) {
  const { setBlockEditDetails, setEditorState } = useBlockStore();
  const { mutate: updateCodeBlock, isPending } = useUpdateCodeBlockMutation();

  const handleClose = () => {
    setEditorState(null);
    setBlockEditDetails(null);
  };

  const initialValues: EditorValuesType = {
    title: block.title,
    description: block.description,
    code: block.code,
    language: block.language,
    theme: block.theme,
  };

  const handleSubmit = (values: EditorValuesType) => {
    updateCodeBlock({
      ...values,
      code_block_id: block._id,
      folder_id: block.folder_id,
    });
  };

  return (
    <Modal
      onMouseDown={handleClose}
      className="w-full max-w-175 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <BlockEditorForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        isSubmitting={isPending}
        submitLabel="Update"
      />
    </Modal>
  );
}
