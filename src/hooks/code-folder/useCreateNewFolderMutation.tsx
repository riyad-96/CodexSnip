import { queryClient } from '@/main';
import type { AddFolderDetailsType } from '@/types/codeFolderTypes';
import { useMutation } from '@tanstack/react-query';
import { useAxios } from '../axios.hook';

type UseCreateNewFolderMutation = {
  setAddFolderDetails: React.Dispatch<
    React.SetStateAction<AddFolderDetailsType | null>
  >;
};

export default function useCreateNewFolderMutation({
  setAddFolderDetails,
}: UseCreateNewFolderMutation) {
  const server = useAxios();

  return useMutation({
    mutationFn: async (value: AddFolderDetailsType) => {
      const response = await server.post('/codefolder/add', {
        folder_name: value.folder_name,
        folder_description: value.folder_description,
      });
      return response.data;
    },
    onSuccess() {
      setAddFolderDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
    },
  });
}
