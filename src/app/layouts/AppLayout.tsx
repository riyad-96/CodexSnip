import { useAuthStore } from '@/features/auth/store/auth.store';
import CreateNewFolderModal from '@/features/folder/components/modals/CreateNewFolderModal';
import DeleteFolderModal from '@/features/folder/components/modals/DeleteFolderModal';
import UpdateFolderDetailsModal from '@/features/folder/components/modals/UpdateFolderDetailsModal';
import { PrefetchSearchData } from '@/features/prefetch/prefetchSearchData';
import SearchModal from '@/features/search/components/SearchModal';
import Footer from '@/shared/components/footer/Footer';
import Header from '@/shared/components/header/Header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="scroller-element grid h-screen grid-rows-[auto_1fr_auto] overflow-y-auto px-2 md:px-3">
      {user ? <Header /> : <div></div>}

      <main className="mx-auto w-full max-w-325">
        <Outlet />

        {user && (
          <>
            <PrefetchSearchData />
            <SearchModal />
            <UpdateFolderDetailsModal />
            <CreateNewFolderModal />
            <DeleteFolderModal />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
