import { create } from 'zustand';

import type { DeleteInfoType } from '@/app/pages/client/code/types/types';
import type { CodeBlock } from '@/types/types';
import type { FolderDeleteDetailsType, UpdateFolderDetailsType } from '@/types/codeFolderTypes';

type SetState<T> = (state: T | ((prev: T) => T)) => void;

type CodeStore = {
  deletingInfo: DeleteInfoType | null;
  setDeletingInfo: SetState<DeleteInfoType | null>;
  editorState: 'new' | 'update' | null;
  setEditorState: SetState<'new' | 'update' | null>;
  editDetails: CodeBlock | null;
  setEditDetails: SetState<CodeBlock | null>;
  updateDetails: UpdateFolderDetailsType | null;
  setUpdateDetails: SetState<UpdateFolderDetailsType | null>;
  folderDeleteDetails: FolderDeleteDetailsType | null;
  setFolderDeleteDetails: SetState<FolderDeleteDetailsType | null>;
};

const store = create<CodeStore>((set) => ({
  deletingInfo: null,
  setDeletingInfo: (state) => {
    set((s) => ({
      deletingInfo: typeof state === 'function' ? state(s.deletingInfo) : state,
    }));
  },
  editorState: null,
  setEditorState: (state) => {
    set((s) => ({
      editorState: typeof state === 'function' ? state(s.editorState) : state,
    }));
  },
  editDetails: null,
  setEditDetails: (state) => {
    set((s) => ({
      editDetails: typeof state === 'function' ? state(s.editDetails) : state,
    }));
  },
  updateDetails: null,
  setUpdateDetails: (state) => {
    set((s) => ({
      updateDetails:
        typeof state === 'function' ? state(s.updateDetails) : state,
    }));
  },
  folderDeleteDetails: null,
  setFolderDeleteDetails: (state) => {
    set((s) => ({
      folderDeleteDetails:
        typeof state === 'function' ? state(s.folderDeleteDetails) : state,
    }));
  },
}));

export const codeStore = store;
export const useCodeStore = store;
