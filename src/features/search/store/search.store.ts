import { create } from 'zustand';

type SearchState = {
  searchModalShowing: boolean;
  setSearchModalShowing: (searchModalShowing: boolean) => void;
};

const useSearchStore = create<SearchState>((set) => ({
  searchModalShowing: false,
  setSearchModalShowing: (searchModalShowing: boolean) =>
    set({ searchModalShowing }),
}));

export { useSearchStore };
