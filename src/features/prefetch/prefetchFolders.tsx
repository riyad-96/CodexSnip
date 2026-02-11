import { queryClient } from '@/main';
import api from '@/shared/lib/api';
import { useAuthStore } from '../auth/store/auth.store';

export function PrefetchFolders() {
  const user = useAuthStore((s) => s.user);

  if (!user) return <></>;

  queryClient.prefetchQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const response = await api.get('/codefolder/getall');
      return response.data;
    },
  });

  return <></>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function prefetchFolders() {
  queryClient.prefetchQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const response = await api.get('/codefolder/getall');
      return response.data;
    },
  });
}
