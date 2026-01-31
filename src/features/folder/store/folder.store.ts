import { create } from 'zustand';
import type {
  AddFolderDetailsType,
  FolderDeleteDetailsType,
  UpdateFolderDetailsType,
} from '../types/codeFolderTypes';
import type { SetState } from '@/shared/types';

type CodeStore = {
  folderCreateDetails: AddFolderDetailsType | null;
  setFolderCreateDetails: SetState<AddFolderDetailsType | null>;
  folderUpdateDetails: UpdateFolderDetailsType | null;
  setFolderUpdateDetails: SetState<UpdateFolderDetailsType | null>;
  folderDeleteDetails: FolderDeleteDetailsType | null;
  setFolderDeleteDetails: SetState<FolderDeleteDetailsType | null>;
};

const store = create<CodeStore>((set) => ({
  folderCreateDetails: null,
  setFolderCreateDetails: (state) => {
    set((s) => ({
      folderCreateDetails:
        typeof state === 'function' ? state(s.folderCreateDetails) : state,
    }));
  },
  folderUpdateDetails: null,
  setFolderUpdateDetails: (state) => {
    set((s) => ({
      folderUpdateDetails:
        typeof state === 'function' ? state(s.folderUpdateDetails) : state,
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
