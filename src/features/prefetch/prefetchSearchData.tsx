import { queryClient } from '@/main';
import api from '@/shared/lib/api';

export function PrefetchSearchData() {
  queryClient.prefetchQuery({
    queryKey: ['search', ''],
    queryFn: async () => {
      const response = await api.post('/code/search', {
        search: '',
      });
      return response.data;
    },
  });

  return <></>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function prefetchSearchData() {
  queryClient.prefetchQuery({
    queryKey: ['search', ''],
    queryFn: async () => {
      const response = await api.post('/code/search', {
        search: '',
      });
      return response.data;
    },
  });
}
