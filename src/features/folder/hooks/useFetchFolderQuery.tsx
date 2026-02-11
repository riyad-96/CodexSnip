import { useQuery } from '@tanstack/react-query';
import type { CodeFolderWithBlocks } from '../types/types';
import type { AxiosError } from 'axios';
import { useAuthStore } from '@/features/auth/store/auth.store';
import api from '@/shared/lib/api';

export default function useFetchCodeFolderQuery({
  folderId,
}: {
  folderId: string;
}) {
  const user = useAuthStore((s) => s.user);

  return useQuery<CodeFolderWithBlocks, AxiosError>({
    queryKey: ['folder_with_blocks', folderId],
    queryFn: async () => {
      const response = await api.get(`/codefolder/get/${folderId}`);
      return response.data;
    },
    enabled: !!user,
  });
}
