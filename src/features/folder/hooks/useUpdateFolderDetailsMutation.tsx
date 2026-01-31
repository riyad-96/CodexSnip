import useAxios from "@/shared/hooks/useAxios";
import { useCodeStore } from "../store/code.store";
import { useMutation } from "@tanstack/react-query";
import type { UpdateFolderDetailsType } from "../types/codeFolderTypes";
import { queryClient } from "@/main";

export default function useUpdateFolderDetailsMutation() {
  const setUpdateDetails = useCodeStore((s) => s.setUpdateDetails);
  const server = useAxios();

  return useMutation({
    mutationFn: async (value: UpdateFolderDetailsType): Promise<string> => {
      const response = await server.patch<string>('/codefolder/update', value);
      return response.data;
    },
    onSuccess: (_, value) => {
      setUpdateDetails(null);
      queryClient.invalidateQueries({
        queryKey: ['code_folder', value.folder_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['code_folders'],
      });
    },
  });
}
