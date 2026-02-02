import UpdateFolderDetailsModal from '@/features/folder/components/modals/UpdateFolderDetailsModal';
import { PrefetchFolders } from '@/features/prefetch/prefetchFolders';
import { PrefetchSearchData } from '@/features/prefetch/prefetchSearchData';
import SearchModal from '@/features/search/components/SearchModal';
import Footer from '@/shared/components/footer/Footer';
import Header from '@/shared/components/header/Header';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  return (
    <div className="scroller-element grid h-screen grid-rows-[auto_1fr_auto] overflow-y-auto px-2 md:px-3">
      <Header />

      <main className="mx-auto w-full max-w-325 min-w-0">
        <Outlet />
      </main>
      <Footer />

      <PrefetchFolders />
      <PrefetchSearchData />
      <SearchModal />
      <UpdateFolderDetailsModal />
    </div>
  );
}
