import { useQuery } from '@tanstack/react-query';
import { useAxios } from '../../../hooks/axios.hook';
import { LogInIcon, PlusIcon } from 'lucide-react';
import type { CodeFolder } from '../../../types/types';
import EachCodeFolderCard from './EachCodeFolderCard';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Modal from '../../../components/ui/ModalLayout';
import type { UpdateFolderDetailsType } from '../../../contexts/CodeContext';
import GlossyButton from '../../../components/ui/GlossyButton';
import DeleteModal from '../../../components/ui/DeleteModal';
import { useState } from 'react';
import { useAuthStore } from '@/store/auth.store';
import useUpdateFolderDetailsMutation from '@/hooks/code-folder/useUpdateFolderDetailsMutation';
import useDeleteFolderMutation from '@/hooks/code-folder/useDeleteFolderMutation';
import { useCodeStore } from '@/store/code.store';
import type { AddFolderDetailsType } from '@/types/codeFolderTypes';
import useCreateNewFolderMutation from '@/hooks/code-folder/useCreateNewFolderMutation';

export default function Home() {
  const navigate = useNavigate();

  const server = useAxios();
  const user = useAuthStore((s) => s.user);

  const { isLoading, data } = useQuery<CodeFolder[]>({
    queryKey: ['code_folders'],
    queryFn: async () => {
      const response = await server.get('/codefolder/getall');
      return response.data;
    },
    enabled: !!user,
  });

  // create new folder
  const [addFolderDetails, setAddFolderDetails] =
    useState<AddFolderDetailsType | null>(null);

  // mutation: create new folder
  const { mutate: createNewFolder, isPending: isNewFolderCreating } =
    useCreateNewFolderMutation({ setAddFolderDetails });

  // code store states
  const {
    updateDetails,
    setUpdateDetails,
    folderDeleteDetails,
    setFolderDeleteDetails,
  } = useCodeStore();

  // mutation: update folder
  const { mutate: updateFolderDetails, isPending: updatingFolderDetails } =
    useUpdateFolderDetailsMutation();
  // mutation: delete folder
  const { mutate: deleteFolder, isPending: deletingFolder } =
    useDeleteFolderMutation();

  // visitor state check
  const isOldVisitor = localStorage.getItem('visitor_state');

  return (
    <div className="pt-12">
      <div className="space-y-3">
        <h1 className="text-center text-[clamp(1.125rem,0.6302rem+1.0309vw,1.5rem)] tracking-tight">
          {user ? `Welcome Back` : 'Organize and Highlight Your Code'}
        </h1>
        <p className="mx-auto max-w-90 text-center text-[clamp(0.875rem,0.8271rem+0.2128vw,1rem)] leading-relaxed text-neutral-600">
          {user
            ? 'Continue organizing your code snippets and explore your saved folders'
            : 'Sign up to create folders and save your favorite snippets with syntax highlighting for multiple languages and themes.'}
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center pt-42">
          <span className="loading loading-spinner loading-xl opacity-80"></span>
        </div>
      ) : (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 xl:grid-cols-4">
          <motion.div
            layoutId="add-folder"
            className="relative z-5 grid min-h-[clamp(8.75rem,7.5rem+6.25vw,12.5rem)] place-items-center overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors duration-200 select-none hover:border-neutral-400 pointer-fine:cursor-pointer"
          >
            {isNewFolderCreating ? (
              <span className="loading loading-spinner loading-xl opacity-80"></span>
            ) : (
              <>
                <div className="grid justify-items-center gap-2">
                  {user ? (
                    <>
                      <div className="rounded-xl bg-neutral-100 p-3 transition-colors group-hover:bg-neutral-900">
                        <PlusIcon
                          size={28}
                          className="text-neutral-600"
                        />
                      </div>
                      <span className="tracking-tight">Add Code folder</span>
                    </>
                  ) : (
                    <>
                      <div className="rounded-xl bg-neutral-100 p-3">
                        <LogInIcon
                          size={28}
                          className="text-neutral-600"
                        />
                      </div>
                      <span className="tracking-tight">
                        {isOldVisitor ? 'Login' : 'Get started'}
                      </span>
                    </>
                  )}
                </div>
                <button
                  onClick={() => {
                    if (!user) {
                      navigate(isOldVisitor ? '/auth/login' : '/auth/signup');
                      return;
                    }
                    setAddFolderDetails({
                      folder_name: '',
                      folder_description: '',
                    });
                  }}
                  className="absolute inset-0"
                ></button>
              </>
            )}
          </motion.div>

          {data?.map((f, i) => (
            <EachCodeFolderCard
              key={f._id}
              i={i}
              folder={f}
            />
          ))}
        </div>
      )}

      {/* Update Modal */}
      <AnimatePresence>
        {updateDetails && (
          <Modal
            layoutId={`update_modal_${updateDetails.folder_id}`}
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

      {/* New folder data Modal */}
      <AnimatePresence>
        {addFolderDetails && (
          <Modal
            layoutId="add-folder"
            className="w-full max-w-125 rounded-2xl border border-neutral-200 bg-white p-6"
            onMouseDown={() => setAddFolderDetails(null)}
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
                  value={addFolderDetails.folder_name}
                  onChange={(e) =>
                    setAddFolderDetails(
                      (prev) =>
                        ({
                          ...prev,
                          folder_name: e.target.value,
                        }) as AddFolderDetailsType,
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
                  value={addFolderDetails.folder_description}
                  onChange={(e) =>
                    setAddFolderDetails(
                      (prev) =>
                        ({
                          ...prev,
                          folder_description: e.target.value,
                        }) as AddFolderDetailsType,
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
                onClick={() => setAddFolderDetails(null)}
              />
              <GlossyButton
                content={
                  <span className="grid h-9 min-w-20 place-items-center px-5">
                    {isNewFolderCreating ? (
                      <span className="loading loading-spinner loading-xs opacity-80"></span>
                    ) : (
                      <span>Create</span>
                    )}
                  </span>
                }
                onClick={() => {
                  if (isNewFolderCreating) return;
                  createNewFolder({
                    folder_name: addFolderDetails.folder_name,
                    folder_description: addFolderDetails.folder_description,
                  });
                }}
                primary
              />
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {folderDeleteDetails && (
          <DeleteModal
            layoutId={`delete-modal_${folderDeleteDetails.folder_id}`}
            title="Delete this folder!"
            description={
              <span className="tracking-wide text-neutral-600">
                Permanently delete the{' '}
                <span className="text-neutral-900">
                  '{folderDeleteDetails.folder_name || 'Unknown'}'
                </span>{' '}
                folder? This action{' '}
                <span className="text-neutral-900">is irreversible</span> and
                will remove all code blocks inside it.
              </span>
            }
            cancelFn={() => setFolderDeleteDetails(null)}
            clickFn={() => deleteFolder(folderDeleteDetails)}
            isLoading={deletingFolder}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
