import CodeNavMenu from './components/CodeNavMenu';
import EditorModal from './EditorModal';
import GlossyButton from '../../../components/ui/GlossyButton';
import CodeBlockView from './CodeBlockView';
import DeleteModal from '../../../components/ui/DeleteModal';
import Modal from '../../../components/ui/ModalLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useAxios } from '../../../hooks/axios.hook';
import { AnimatePresence, motion } from 'motion/react';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useCodeContext } from '../../../contexts/CodeContext';
import { FileBracesCornerIcon, PencilLineIcon } from 'lucide-react';
import { Tooltip } from 'kitzo';

// types
import type {
  CodeFolder,
  CodeFolderWithCodeBlocks,
} from '../../../types/types';
import type { AxiosError } from 'axios';
import type { EditorValuesType, EditorUpdateValuesType } from './types/types';
import type { UpdateFolderDetailsType } from '../../../contexts/CodeContext';

export default function CodeFolder() {
  const { user } = useAuthContext();
  const {
    editorState,
    setEditorState,
    deletingInfo,
    setDeletingInfo,
    editDetails,
  } = useCodeContext();

  const server = useAxios();
  const params = useParams();
  const codeFolderId = params.id;
  const queryClient = useQueryClient();

  const {
    data: codeFolder,
    isLoading: codeFolderLoading,
    error: codeFolderError,
  } = useQuery<CodeFolderWithCodeBlocks, AxiosError>({
    queryKey: ['code_folder', codeFolderId],
    queryFn: async () => {
      const response = await server.get(`/codefolder/get/${codeFolderId}`);
      return response.data;
    },
    enabled: !!user,
  });

  const code_blocks = codeFolder?.code_blocks ?? [];

  // udpate folder details
  const {
    updateDetails,
    setUpdateDetails,
    updatingFolderDetails,
    updateFolderDetails,
  } = useCodeContext();

  // add new code block
  const { mutate: addNewCodeBlock, isPending: isAddingCodeBlock } = useMutation(
    {
      mutationFn: async (values: EditorValuesType) => {
        const response = await server.post('/code/add', {
          folder_id: codeFolderId,
          ...values,
        });
        return response.data;
      },
      onSuccess: () => {
        setEditorState(null);
        queryClient.invalidateQueries({
          queryKey: ['code_folder', codeFolderId],
        });
        queryClient.invalidateQueries({
          queryKey: ['code_partials', codeFolderId],
        });
      },
    },
  );

  // update code block
  const { mutate: updateCodeBlock, isPending: isUpdatingCodeBlock } =
    useMutation({
      mutationFn: async (values: EditorUpdateValuesType) => {
        const response = await server.patch('/code/update', {
          folder_id: codeFolderId,
          ...values,
        });
        return response.data;
      },
      onSuccess: (_data, { code_block_id }) => {
        setEditorState(null);
        queryClient.invalidateQueries({
          queryKey: ['code_folder', codeFolderId],
        });
        queryClient.invalidateQueries({
          queryKey: ['code_block', code_block_id],
        });
        queryClient.invalidateQueries({
          queryKey: ['code_folders'],
        });
        queryClient.invalidateQueries({
          queryKey: ['code_partials', codeFolderId],
        });
      },
    });

  // delete code block
  const { mutate: deleteCodeBlock, isPending: isDeletingCodeBlock } =
    useMutation({
      mutationFn: async (code_block_id: string) => {
        const response = await server.delete(
          `/code/delete/${codeFolderId}/${code_block_id}`,
        );
        return response.data;
      },
      onSuccess: () => {
        setDeletingInfo(null);
        queryClient.invalidateQueries({
          queryKey: ['code_folder', codeFolderId],
        });
        queryClient.invalidateQueries({
          queryKey: ['code_partials', codeFolderId],
        });
      },
    });

  if (codeFolderError) {
    return (
      <div>
        <p className="pt-16 text-center">Folder doesn't exists</p>
      </div>
    );
  }

  if (codeFolderLoading) {
    return (
      <div className="flex justify-center pt-42">
        <span className="loading loading-spinner loading-xl opacity-80"></span>
      </div>
    );
  }

  return (
    <div className="pt-8">
      <div className="flex gap-2">
        <div className="max-w-130 space-y-2">
          <h2 className="text-code-800 max-w-8/10 text-xl font-semibold">
            {codeFolder?.folder_name || 'Unknown folder name'}
          </h2>
          <p className="text-code-800">
            {codeFolder?.folder_description || 'No description yet'}
          </p>
        </div>

        <motion.div layoutId="folder-details-update-modal">
          <Tooltip
            content={
              <span className="bg-code-800 box-content grid min-w-20 rounded-md px-2 py-1.5 text-center text-xs font-light tracking-wide text-white">
                <span>Edit folder</span>
                <span>name & description</span>
              </span>
            }
            tooltipOptions={{
              position: 'left-start',
            }}
            animation={{
              startDelay: 400,
            }}
          >
            <GlossyButton
              content={
                <span className="bg-code grid h-7 place-items-center px-3">
                  <PencilLineIcon size="16" />
                </span>
              }
              onClick={() =>
                setUpdateDetails({
                  folder_name: codeFolder?.folder_name as string,
                  folder_description: codeFolder?.folder_description as string,
                  folder_id: codeFolder?._id as string,
                })
              }
            />
          </Tooltip>
        </motion.div>
      </div>

      <div className="mt-4 mb-6 flex items-center justify-between">
        <Tooltip
          content={`${code_blocks.length} Blocks`}
          tooltipOptions={{
            position: 'top-start',
          }}
          animation={{ delay: 40 }}
        >
          <div className="bg-code border-code-100 inset-shadow-code relative z-2 flex w-fit cursor-default items-center gap-1 rounded-lg border px-2 py-1 text-xs shadow-xs inset-shadow-2xs">
            <span>
              <FileBracesCornerIcon size="14" />
            </span>
            :<span>{code_blocks.length}</span>
          </div>
        </Tooltip>

        <motion.div
          className="relative z-5"
          layoutId="create-code-block-modal"
        >
          <GlossyButton
            content={<span className="bg-white px-6 py-2">Add Block</span>}
            onClick={() => setEditorState('new')}
          />
        </motion.div>
      </div>

      {code_blocks.length > 0 ? (
        <div
          className={`grid ${code_blocks.length > 1 ? 'gap-3 md:grid-cols-[auto_1fr]' : ''}`}
        >
          {code_blocks.length > 1 && (
            <div className="w-50 max-md:hidden">
              <CodeNavMenu code_blocks={code_blocks} />
            </div>
          )}

          <div className="space-y-8">
            {code_blocks.map((block) => (
              <CodeBlockView
                key={block._id}
                block={block}
                linkNavEnabled={code_blocks.length > 1}
              />
            ))}
          </div>
        </div>
      ) : (
        <p className="pt-16 text-center">No Code blocks in this folder yet</p>
      )}

      <AnimatePresence>
        {editorState && (
          <EditorModal
            layoutId={
              editorState === 'new'
                ? 'create-code-block-modal'
                : `update-code-block-modal-${editDetails?._id}`
            }
            editorState={editorState}
            setEditorState={setEditorState}
            actions={{ addNewCodeBlock, updateCodeBlock }}
            isAdding={isAddingCodeBlock}
            isUpdating={isUpdatingCodeBlock}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deletingInfo && (
          <DeleteModal
            layoutId={`delete-modal_${deletingInfo.code_block_id}`}
            title="Delete code block!"
            description={
              <span className="font-light tracking-wide">
                Delete '
                <span className="font-medium">
                  {deletingInfo.code_block_title || 'Untitled'}
                </span>
                ' code block permanently? This action is irreversible.
              </span>
            }
            isLoading={isDeletingCodeBlock}
            cancelFn={() => setDeletingInfo(null)}
            clickFn={() => {
              if (isDeletingCodeBlock) return;
              deleteCodeBlock(deletingInfo.code_block_id);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {updateDetails && (
          <Modal
            layoutId="folder-details-update-modal"
            className="w-full max-w-125 rounded-2xl bg-white p-4"
            onMouseDown={() => setUpdateDetails(null)}
          >
            <div className="mb-4 space-y-2">
              <div className="grid gap-1">
                <label
                  className="w-fit"
                  htmlFor="folder-title"
                >
                  Name
                </label>
                <input
                  className="border-code-150 focus:ring-code-300 focus:border-code-300 rounded-md border px-3 py-2 ring-2 ring-transparent transition-shadow outline-none"
                  id="folder-title"
                  type="text"
                  placeholder="Folder name"
                  value={updateDetails.folder_name}
                  onChange={(e) =>
                    setUpdateDetails(
                      (prev) =>
                        ({
                          ...prev,
                          folder_name: e.target.value,
                        }) as UpdateFolderDetailsType,
                    )
                  }
                />
              </div>

              <div className="grid gap-1">
                <label
                  className="w-fit"
                  htmlFor="folder-description"
                >
                  Description
                </label>
                <textarea
                  className="border-code-150 focus:ring-code-300 focus:border-code-300 max-h-75 min-h-25 rounded-md border px-3 py-2 ring-2 ring-transparent transition-shadow outline-none"
                  id="folder-description"
                  placeholder="Folder description"
                  value={updateDetails.folder_description}
                  onChange={(e) =>
                    setUpdateDetails(
                      (prev) =>
                        ({
                          ...prev,
                          folder_description: e.target.value,
                        }) as UpdateFolderDetailsType,
                    )
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <GlossyButton
                content={
                  <span className="grid h-7 place-items-center px-4">
                    Cancel
                  </span>
                }
                onClick={() => setUpdateDetails(null)}
              />
              <GlossyButton
                content={
                  <span className="grid h-7 min-w-20 place-items-center px-4">
                    {updatingFolderDetails ? (
                      <span className="loading loading-spinner loading-xs opacity-80"></span>
                    ) : (
                      <span>Update</span>
                    )}
                  </span>
                }
                onClick={() => {
                  if (updatingFolderDetails) return;
                  updateFolderDetails({
                    folder_name: updateDetails.folder_name,
                    folder_description: updateDetails.folder_description,
                    folder_id: updateDetails.folder_id,
                  });
                }}
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
