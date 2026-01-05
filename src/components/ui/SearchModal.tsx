import { useState } from 'react';
import { useSearchStore } from '../../store/search.store';
import Modal from './Modal';
import { useDebounce } from 'kitzo';
import { useQuery } from '@tanstack/react-query';
import { useAxios } from '@/hooks/axios.hook';
import type { CodeBlock, CodeFolder } from '@/types/types';
import { ChevronRight, File, Folder, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import getCodeNavigationId from '@/utils/getCodeNavigationId';

type QueryFnDataType = {
  codes: CodeBlock[];
  folders: CodeFolder[];
};

export default function SearchModal() {
  const { setSearchModalShowing } = useSearchStore();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const server = useAxios();

  const { data, isLoading, error } = useQuery<QueryFnDataType>({
    queryKey: ['search', debouncedSearch],
    queryFn: async () => {
      const response = await server.post('/code/search', {
        search: debouncedSearch,
      });
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <Modal
      className="max-h-175 w-full max-w-150 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
      onMouseDown={() => setSearchModalShowing(false)}
    >
      <div className="sticky top-0 border-b border-neutral-100 bg-white px-4 py-5">
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-400"
            size={20}
          />
          <input
            autoFocus
            type="text"
            placeholder="Search code blocks and folders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full min-w-0 rounded-xl border border-neutral-200 bg-neutral-50 py-3.5 pr-4 pl-12 transition-colors outline-none focus:border-neutral-900 focus:bg-white"
          />
        </div>
      </div>

      <div className="max-h-125 overflow-y-auto px-4 py-4">
        {isLoading && (
          <div className="grid h-50 place-items-center">
            <div className="flex flex-col items-center gap-3">
              <span className="loading loading-spinner loading-md"></span>
              <p className="text-sm text-neutral-500">Searching...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="grid h-50 place-items-center">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="rounded-full bg-red-50 p-3">
                <svg
                  className="h-6 w-6 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-red-600">Something went wrong</p>
              <p className="text-sm text-neutral-500">Please try again</p>
            </div>
          </div>
        )}

        {data && !data.codes.length && !data.folders.length && (
          <div className="grid h-50 place-items-center">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="rounded-full bg-neutral-100 p-4">
                <Search
                  className="text-neutral-400"
                  size={24}
                />
              </div>
              <div>
                <p className="mb-1 text-neutral-900">No results found</p>
                <p className="text-sm text-neutral-500">
                  Try searching with different keywords
                </p>
              </div>
            </div>
          </div>
        )}

        {data && (
          <div className="space-y-6">
            {data.codes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <File
                    size={16}
                    className="text-neutral-400"
                  />
                  <h3 className="text-xs tracking-wider text-neutral-500 uppercase">
                    Code Blocks ({data.codes.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {data.codes.map((c) => (
                    <div
                      key={c._id}
                      className="group relative flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-colors duration-200 hover:border-neutral-900 pointer-fine:cursor-pointer"
                    >
                      <Link
                        className="absolute inset-0 z-5"
                        onClick={() => setSearchModalShowing(false)}
                        to={`/code/${c.folder_id}#${getCodeNavigationId(c.title, c._id)}`}
                      />

                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        <div className="mt-0.5 shrink-0 rounded-lg bg-neutral-100 p-2.5 transition-colors group-hover:bg-neutral-900">
                          <File
                            size={18}
                            className="text-neutral-600 transition-colors group-hover:text-white"
                          />
                        </div>
                        <div className="grid min-w-0 gap-1">
                          <h4 className="tracking-tight">
                            {c.title || 'Untitled block'}
                          </h4>
                          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
                            {c.description || 'No description'}
                          </p>
                        </div>
                      </div>

                      <div className="ml-4 shrink-0">
                        <ChevronRight
                          strokeWidth={1.5}
                          size={20}
                          className="text-neutral-400 transition-colors group-hover:translate-x-1 group-hover:text-neutral-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.folders.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 px-1">
                  <Folder
                    size={16}
                    className="text-neutral-400"
                  />
                  <h3 className="text-xs tracking-wider text-neutral-500 uppercase">
                    Folders ({data.folders.length})
                  </h3>
                </div>
                <div className="space-y-2">
                  {data.folders.map((f) => (
                    <div
                      key={f._id}
                      className="group relative flex items-center justify-between rounded-xl border border-neutral-200 bg-white px-5 py-4 transition-colors duration-200 hover:border-neutral-900 pointer-fine:cursor-pointer"
                    >
                      <Link
                        className="absolute inset-0 z-5"
                        onClick={() => setSearchModalShowing(false)}
                        to={`/code/${f._id}`}
                      />

                      <div className="flex min-w-0 flex-1 items-start gap-4">
                        <div className="mt-0.5 shrink-0 rounded-lg bg-neutral-100 p-2.5 transition-colors group-hover:bg-neutral-900">
                          <Folder
                            size={18}
                            className="text-neutral-600 transition-colors group-hover:text-white"
                          />
                        </div>
                        <div className="grid min-w-0 gap-1">
                          <h4 className="tracking-tight">
                            {f.folder_name || 'Untitled folder'}
                          </h4>
                          <p className="line-clamp-2 text-sm leading-relaxed text-neutral-500">
                            {f.folder_description || 'No description'}
                          </p>
                        </div>
                      </div>

                      <div className="ml-4 shrink-0">
                        <ChevronRight
                          strokeWidth={1.5}
                          size={20}
                          className="text-neutral-400 transition-colors group-hover:translate-x-1 group-hover:text-neutral-900"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
