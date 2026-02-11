import { useQuery } from '@tanstack/react-query';
import api from '@/shared/lib/api';
import { useAuthStore } from '@/features/auth/store/auth.store';
import type { Folder } from '@/features/folder/types/types';
import FolderActionBar from '@/features/folder/components/FolderActionBar';
import EachFolderCard from '@/features/folder/components/folder-card/EachFolderCard';

export default function HomeContent() {
  const user = useAuthStore((s) => s.user);

  const { isLoading, data = [] } = useQuery<Folder[]>({
    queryKey: ['folders'],
    queryFn: async () => {
      const res = await api.get('/codefolder/getall');
      return res.data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center pt-32">
        <span className="loading loading-spinner loading-lg opacity-70" />
      </div>
    );
  }

  return (
    <>
      <section className="pt-12 md:pt-16">
        {/* Action bar */}
        <FolderActionBar count={data.length} />

        {/* Content */}
        {user && data.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-neutral-300 py-22 text-center">
            <p className="text-neutral-500">
              No folders yet. Create your first one to start saving code.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {user &&
              data.map((folder) => (
                <EachFolderCard
                  key={folder._id}
                  folder={folder}
                />
              ))}
          </div>
        )}
      </section>
    </>
  );
}
