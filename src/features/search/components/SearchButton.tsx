import { SearchIcon } from 'lucide-react';
import { useSearchStore } from '../store/search.store';
import { queryClient } from '@/main';
import useAxios from '@/shared/hooks/useAxios';

export default function SearchButton() {
  const setSearchModalShowing = useSearchStore((s) => s.setSearchModalShowing);
  const server = useAxios();

  function prefetchSearch() {
    queryClient.prefetchQuery({
      queryKey: ['search', ''],
      queryFn: async () => {
        const response = await server.post('/code/search', {
          search: '',
        });
        return response.data;
      },
    });
  }

  return (
    <button
      onMouseEnter={prefetchSearch}
      onMouseDown={prefetchSearch}
      onClick={() => setSearchModalShowing(true)}
      className="flex items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm pointer-fine:hover:border-neutral-400"
    >
      <SearchIcon
        size={16}
        className="text-neutral-600"
      />
      <span className="text-xs tracking-wide text-neutral-600">CTRL + K</span>
    </button>
  );
}
