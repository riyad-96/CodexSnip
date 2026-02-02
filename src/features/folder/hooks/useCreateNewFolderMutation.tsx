import api from '@/shared/api';
import type { AddFolderDetailsType } from '../types/codeFolderTypes';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/main';

type UseCreateNewFolderMutation = {
  setFolderCreateDetails: React.Dispatch<
    React.SetStateAction<AddFolderDetailsType | null>
  >;
};

export default function useCreateNewFolderMutation({
  setFolderCreateDetails,
}: UseCreateNewFolderMutation) {
  return useMutation({
    mutationFn: async (value: AddFolderDetailsType) => {
      const response = await api.post('/codefolder/add', {
        folder_name: value.folder_name,
        folder_description: value.folder_description,
      });
      return response.data;
    },
    onSuccess() {
      setFolderCreateDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['folders'],
      });
    },
  });
}
