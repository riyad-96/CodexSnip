import SearchModal from '@/features/search/components/SearchModal';
import { useSearchStore } from '@/features/search/store/search.store';
import Footer from '@/shared/components/footer/Footer';
import Header from '@/shared/components/header/Header';
import { AnimatePresence } from 'motion/react';
import { Outlet } from 'react-router-dom';

export default function AppLayout() {
  const { searchModalShowing } = useSearchStore();

  return (
    <div className="scroller-element grid h-screen grid-rows-[auto_1fr_auto] overflow-y-auto px-2 md:px-3">
      <Header />

      <main className="mx-auto w-full max-w-325 min-w-0">
        <Outlet />
      </main>
      <Footer />

      <AnimatePresence>{searchModalShowing && <SearchModal />}</AnimatePresence>
    </div>
  );
}
