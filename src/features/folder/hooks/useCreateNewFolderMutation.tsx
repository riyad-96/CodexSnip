import useAxios from "@/shared/hooks/useAxios";
import type { AddFolderDetailsType } from "../types/codeFolderTypes";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/main";


type UseCreateNewFolderMutation = {
  setCreateNewFolderDetails: React.Dispatch<
    React.SetStateAction<AddFolderDetailsType | null>
  >;
};

export default function useCreateNewFolderMutation({
  setCreateNewFolderDetails,
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
      setCreateNewFolderDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
    },
  });
}
