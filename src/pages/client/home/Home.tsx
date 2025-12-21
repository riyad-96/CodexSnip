import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAxios } from '../../../hooks/axios.hook';
import { LogInIcon, PlusIcon } from 'lucide-react';
import type { CodeFolder } from '../../../types/types';
import EachCodeFolderCard from './EachCodeFolderCard';
import { useAuthContext } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Modal from '../../../components/ui/ModalLayout';
import { useCodeContext } from '../../../contexts/CodeContext';
import type { UpdateFolderDetailsType } from '../../../contexts/CodeContext';
import GlossyButton from '../../../components/ui/GlossyButton';
import DeleteModal from '../../../components/ui/DeleteModal';
import { useState } from 'react';

type AddFolderDetailsType = {
  folder_name: string;
  folder_description: string;
};

export default function Home() {
  const server = useAxios();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

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

  const { mutate: createNewFolder, isPending: isNewFolderCreating } =
    useMutation({
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

  // update folder
  const {
    updateDetails,
    setUpdateDetails,
    updatingFolderDetails,
    updateFolderDetails,
    folderDeleteDetails,
    setFolderDeleteDetails,
    deleteFolder,
    deletingFolder,
  } = useCodeContext();

  // visitor state check
  const isOldVisitor = localStorage.getItem('visitor_state');

  return (
    <div className="pt-12">
      <div className="space-y-2">
        <h1 className="text-code-700 text-center text-[clamp(1.125rem,0.6302rem+1.0309vw,1.5rem)] font-semibold tracking-wide">
          {user ? `Welcome Back` : 'Organize and Highlight Your Code'}
        </h1>
        <p className="text-code-650 mx-auto max-w-[360px] text-center text-[clamp(0.875rem,0.8271rem+0.2128vw,1rem)]">
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
        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 xl:grid-cols-4">
          <motion.div
            layoutId="add-folder"
            className={`text-code-400 hover:text-code-600 bg-code border-code-100 ring-code-200 pointer-fine:hover:border-code-200 relative z-5 grid min-h-[clamp(7.5rem,5.6484rem+8.2292vw,12.4375rem)] place-items-center overflow-hidden rounded-2xl border ring-0 transition-[color,box-shadow] duration-150 select-none pointer-fine:hover:ring-2`}
          >
            {isNewFolderCreating ? (
              <span className="loading loading-spinner loading-xl opacity-80"></span>
            ) : (
              <>
                <div className="grid justify-items-center">
                  {user ? (
                    <>
                      <span>
                        <PlusIcon size="36" />
                      </span>
                      <span className="text-lg font-semibold">
                        Add Code folder
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        <LogInIcon size="36" />
                      </span>
                      <span className="text-lg font-semibold">
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
            className="w-full max-w-[500px] rounded-2xl bg-white p-4"
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
                  className="border-code-150 focus:ring-code-300 focus:border-code-300 max-h-[300px] min-h-[100px] rounded-md border px-3 py-2 ring-2 ring-transparent transition-shadow outline-none"
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

      {/* New folder data Modal */}
      <AnimatePresence>
        {addFolderDetails && (
          <Modal
            layoutId="add-folder"
            className="w-full max-w-[500px] rounded-2xl bg-white p-4"
            onMouseDown={() => setAddFolderDetails(null)}
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

              <div className="grid gap-1">
                <label
                  className="w-fit"
                  htmlFor="folder-description"
                >
                  Description
                </label>
                <textarea
                  className="border-code-150 focus:ring-code-300 focus:border-code-300 max-h-[300px] min-h-[100px] rounded-md border px-3 py-2 ring-2 ring-transparent transition-shadow outline-none"
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
                  <span className="grid h-7 place-items-center px-4">
                    Cancel
                  </span>
                }
                onClick={() => setAddFolderDetails(null)}
              />
              <GlossyButton
                content={
                  <span className="grid h-7 min-w-20 place-items-center px-4">
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
              <span className="font-light tracking-wide">
                Permanently delete the{' '}
                <span className="font-medium">
                  '{folderDeleteDetails.folder_name || 'Unknown'}'
                </span>{' '}
                folder? This action{' '}
                <span className="font-medium">is irreversible</span> and will
                remove all code blocks inside it.
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
