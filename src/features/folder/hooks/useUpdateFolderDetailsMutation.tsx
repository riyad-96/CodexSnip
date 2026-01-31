import useAxios from "@/shared/hooks/useAxios";
import { useCodeStore } from "../store/folder.store";
import { useMutation } from "@tanstack/react-query";
import type { UpdateFolderDetailsType } from "../types/codeFolderTypes";
import { queryClient } from "@/main";

export default function useUpdateFolderDetailsMutation() {
  const setFolderUpdateDetails = useCodeStore((s) => s.setFolderUpdateDetails);
  const server = useAxios();

  return useMutation({
    mutationFn: async (value: UpdateFolderDetailsType): Promise<string> => {
      const response = await server.patch<string>('/codefolder/update', value);
      return response.data;
    },
    onSuccess: (_, value) => {
      setFolderUpdateDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folder', value.folder_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
    },
  });
}
