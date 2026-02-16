import type { Block } from '@/features/folder/types/types';
import NewBlockModal from './NewBlockModal';
import UpdateBlockModal from './UpdateBlockModal';

type EditorModalProps = {
  mode: 'new' | 'update';
  block: Block | null;
};

export default function EditorModal({ mode, block }: EditorModalProps) {
  if (mode === 'new') {
    return <NewBlockModal />;
  }

  if (mode === 'update' && block) {
    return <UpdateBlockModal block={block} />;
  }

  return null;
}
