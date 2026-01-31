import CodeNavMenu from './components/CodeNavMenu';
import EditorModal from './EditorModal';
import CodeBlockView from './CodeBlockView';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { FileBracesCornerIcon, PencilLineIcon, PlusIcon } from 'lucide-react';
import { Tooltip } from 'kitzo';

// types

import type { AxiosError } from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { useCodeStore } from '@/store/code.store';
import useAddNewCodeBlockMutation from '@/hooks/code-block/useAddNewCodeBlockMutation';
import useUpdateCodeBlockMutation from '@/hooks/code-block/useUpdateCodeBlockMutation';
import useDeleteCodeBlockMutation from '@/hooks/code-block/useDeleteCodeBlockMutation';
import useUpdateFolderDetailsMutation from '@/hooks/code-folder/useUpdateFolderDetailsMutation';
import type { UpdateFolderDetailsType } from '@/types/codeFolderTypes';
import { useAxios } from '@/hooks/axios.hook';
import GlossyButton from '@/components/ui/GlossyButton';
import DeleteModal from '@/components/ui/DeleteModal';
import Modal from '@/components/ui/ModalLayout';
import type { CodeFolderWithCodeBlocks } from '@/types/types';

export default function CodeFolder() {
  const user = useAuthStore((s) => s.user);

  const {
    editorState,
    setEditorState,
    deletingInfo,
    setDeletingInfo,
    editDetails,
  } = useCodeStore();

  const server = useAxios();
  const params = useParams();
  const codeFolderId = params.id as string;

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
  const { updateDetails, setUpdateDetails } = useCodeStore();

  // mutation: update folder details
  const { mutate: updateFolderDetails, isPending: updatingFolderDetails } =
    useUpdateFolderDetailsMutation();

  // mutation: add new code block
  const { mutate: addNewCodeBlock, isPending: isAddingCodeBlock } =
    useAddNewCodeBlockMutation({ codeFolderId });

  // mutation: update code block
  const { mutate: updateCodeBlock, isPending: isUpdatingCodeBlock } =
    useUpdateCodeBlockMutation({ codeFolderId });

  // mutation: delete code block
  const { mutate: deleteCodeBlock, isPending: isDeletingCodeBlock } =
    useDeleteCodeBlockMutation({ codeFolderId });

  if (codeFolderError) {
    return (
      <div className="pt-20">
        <div className="mx-auto max-w-md text-center">
          <div className="rounded-2xl border border-neutral-200 bg-white px-8 py-12">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-100">
              <svg
                className="size-8 text-neutral-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="mb-2 tracking-tight">Folder not found</h3>
            <p className="text-neutral-600">
              This folder doesn't exist or you don't have access to it.
            </p>
          </div>
        </div>
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
      <div className="mb-6 flex items-start gap-3">
        <div className="flex-1 space-y-2 pl-2">
          <h2 className="text-2xl tracking-tight">
            {codeFolder?.folder_name || 'Unknown folder name'}
          </h2>
          <p className="leading-relaxed text-neutral-600">
            {codeFolder?.folder_description || 'No description yet'}
          </p>
        </div>

        <motion.div layoutId="folder-details-update-modal">
          <Tooltip
            content={
              <span className="box-content grid min-w-20 rounded-lg bg-neutral-900 px-2.5 py-2 text-center text-xs text-white">
                <span>Edit folder</span>
                <span>name & description</span>
              </span>
            }
            position="left-start"
            animation={{
              startDelay: 400,
            }}
          >
            <GlossyButton
              content={
                <span className="grid h-9 place-items-center px-3.5">
                  <PencilLineIcon
                    size={16}
                    className="text-neutral-700"
                  />
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

      <div className="mb-8 flex items-center justify-between">
        <Tooltip
          content={`${code_blocks.length} Blocks`}
          position="top-start"
          animation={{ delay: 40 }}
        >
          <div className="relative z-2 flex w-fit cursor-default items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
            <FileBracesCornerIcon
              size={16}
              className="text-neutral-600"
            />
            <span>{code_blocks.length}</span>
          </div>
        </Tooltip>

        {codeFolder && codeFolder.code_blocks.length !== 0 && (
          <motion.div
            className="relative z-5"
            layoutId="create-code-block-modal"
          >
            <GlossyButton
              content={
                <span className="flex items-center gap-2 px-4 py-2.5">
                  <PlusIcon
                    size={16}
                    strokeWidth="3"
                  />
                  <span>Add Block</span>
                </span>
              }
              onClick={() => setEditorState('new')}
              primary
            />
          </motion.div>
        )}
      </div>

      {code_blocks.length > 0 ? (
        <div
          className={`grid ${code_blocks.length > 1 ? 'gap-4 md:grid-cols-[auto_1fr]' : ''}`}
        >
          {code_blocks.length > 1 && (
            <div className="w-50 max-md:hidden">
              <CodeNavMenu code_blocks={code_blocks} />
            </div>
          )}

          <div className="min-w-0 space-y-6">
            {code_blocks.map((block) => (
              <CodeBlockView
                key={block._id}
                block={block}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-20">
          <div className="mx-auto max-w-md text-center">
            <div className="px-8 py-12">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-neutral-100">
                <FileBracesCornerIcon
                  size={32}
                  className="text-neutral-600"
                />
              </div>
              <h3 className="mb-2 tracking-tight">No code blocks yet</h3>
              <p className="mb-6 text-neutral-600">
                Start by adding your first code block to this folder.
              </p>
              <div className="mx-auto w-fit">
                <GlossyButton
                  content={
                    <span className="flex items-center gap-2 px-4 py-2.5">
                      <PlusIcon
                        size={16}
                        strokeWidth="3"
                      />
                      <span>Add Block</span>
                    </span>
                  }
                  onClick={() => setEditorState('new')}
                  primary
                />
              </div>
            </div>
          </div>
        </div>
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
              <span className="tracking-wide text-neutral-600">
                Delete '
                <span className="text-neutral-900">
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
            className="w-full max-w-125 rounded-2xl border border-neutral-200 bg-white p-6"
            onMouseDown={() => setUpdateDetails(null)}
          >
            <div className="mb-6 space-y-4">
              <div className="grid gap-2">
                <label
                  className="text-sm text-neutral-700"
                  htmlFor="folder-title"
                >
                  Name
                </label>
                <input
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors outline-none focus:border-neutral-400"
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

              <div className="grid gap-2">
                <label
                  className="text-sm text-neutral-700"
                  htmlFor="folder-description"
                >
                  Description
                </label>
                <textarea
                  className="max-h-75 min-h-25 rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors outline-none focus:border-neutral-400"
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
                  <span className="grid h-9 place-items-center px-5">
                    Cancel
                  </span>
                }
                onClick={() => setUpdateDetails(null)}
              />
              <GlossyButton
                content={
                  <span className="grid h-9 min-w-20 place-items-center px-5">
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
                primary
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
