import { useQuery } from '@tanstack/react-query';
import type { CodeFolderWithCodeBlocks } from '../types/types';
import type { AxiosError } from 'axios';
import { useAuthStore } from '@/features/auth/store/auth.store';
import useAxios from '@/shared/hooks/useAxios';

export default function useFetchCodeFolderQuery({
  folderId,
}: {
  folderId: string;
}) {
  const user = useAuthStore((s) => s.user);
  const server = useAxios();

  return useQuery<CodeFolderWithCodeBlocks, AxiosError>({
    queryKey: ['code_folder', folderId],
    queryFn: async () => {
      const response = await server.get(`/codefolder/get/${folderId}`);
      return response.data;
    },
    enabled: !!user,
  });
}
