import Modal from '@/shared/components/ui/Modal';
import { useBlockStore } from '@/features/block/store/block.store';
import useAddNewCodeBlockMutation from '../../hooks/useAddNewCodeBlockMutation';
import BlockEditorForm from './BlockEditorForm';
import type { EditorValuesType } from '@/features/folder/types/editor';

export default function NewBlockModal() {
  const { setEditorState, setBlockEditDetails } = useBlockStore();
  const { mutate: addNewCodeBlock, isPending } = useAddNewCodeBlockMutation();

  const handleClose = () => {
    setEditorState(null);
    setBlockEditDetails(null);
  };

  const initialValues: EditorValuesType = {
    title: '',
    description: '',
    code: '',
    language: 'plaintext',
    theme: 'coy',
  };

  return (
    <Modal
      onMouseDown={handleClose}
      className="w-full max-w-175 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6"
    >
      <BlockEditorForm
        initialValues={initialValues}
        onSubmit={addNewCodeBlock}
        onCancel={handleClose}
        isSubmitting={isPending}
        submitLabel="Add Block"
      />
    </Modal>
  );
}
