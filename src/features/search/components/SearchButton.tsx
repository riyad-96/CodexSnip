import { SearchIcon } from 'lucide-react';
import { useSearchStore } from '../store/search.store';
import { prefetchSearchData } from '@/features/prefetch/prefetchSearchData';

export default function SearchButton() {
  const setSearchModalShowing = useSearchStore((s) => s.setSearchModalShowing);

  return (
    <button
      onClick={() => {
        setSearchModalShowing(true);
        prefetchSearchData();
      }}
      className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm pointer-fine:hover:border-neutral-400"
    >
      <SearchIcon
        size={14}
        className="text-neutral-600"
      />
      <span className="text-xs tracking-wide text-neutral-600">CTRL + K</span>
    </button>
  );
}
