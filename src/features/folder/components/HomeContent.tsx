import { useQuery } from '@tanstack/react-query';
import { useCodeStore } from '../store/code.store';
import { useNavigate } from 'react-router-dom';
import useAxios from '@/shared/hooks/useAxios';
import type { CodeFolder } from '../types/types';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { LogInIcon, PlusIcon } from 'lucide-react';
import EachCodeFolderCard from './EachCodeFolderCard';

export default function HomeContent() {
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

  const { setCreateNewFolderDetails } = useCodeStore();

  // visitor state check
  const isOldVisitor = localStorage.getItem('visitor_state');

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center pt-42">
          <span className="loading loading-spinner loading-xl opacity-80"></span>
        </div>
      ) : (
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 xl:grid-cols-4">
          <div className="relative z-5 grid min-h-[clamp(8.75rem,7.5rem+6.25vw,12.5rem)] place-items-center overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors duration-200 select-none hover:border-neutral-400 pointer-fine:cursor-pointer">
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
                setCreateNewFolderDetails({
                  folder_name: '',
                  folder_description: '',
                });
              }}
              className="absolute inset-0"
            ></button>
          </div>

          {user &&
            data?.map((f, i) => (
              <EachCodeFolderCard
                key={f._id}
                i={i}
                folder={f}
              />
            ))}
        </div>
      )}
    </>
  );
}
