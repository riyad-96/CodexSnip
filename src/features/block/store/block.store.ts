import type { DeleteInfoType } from '@/features/folder/types/editor';
import type { CodeBlock } from '@/features/folder/types/types';
import type { SetState } from '@/shared/types';
import { create } from 'zustand';

type BlockStore = {
  editorState: 'new' | 'update' | null;
  setEditorState: SetState<'new' | 'update' | null>;
  blockDeleteDetails: DeleteInfoType | null;
  setBlockDeleteDetails: SetState<DeleteInfoType | null>;
  blockEditDetails: CodeBlock | null;
  setBlockEditDetails: SetState<CodeBlock | null>;
};

const store = create<BlockStore>((set) => ({
  editorState: null,
  setEditorState: (state) => {
    set((s) => ({
      editorState: typeof state === 'function' ? state(s.editorState) : state,
    }));
  },
  blockDeleteDetails: null,
  setBlockDeleteDetails: (state) => {
    set((s) => ({
      blockDeleteDetails:
        typeof state === 'function' ? state(s.blockDeleteDetails) : state,
    }));
  },
  blockEditDetails: null,
  setBlockEditDetails: (state) => {
    set((s) => ({
      blockEditDetails:
        typeof state === 'function' ? state(s.blockEditDetails) : state,
    }));
  },
}));

export const blockStore = store;
export const useBlockStore = store;
