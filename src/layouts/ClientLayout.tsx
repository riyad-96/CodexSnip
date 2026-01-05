import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import SearchModal from '../components/ui/SearchModal';
import { useSearchStore } from '../store/search.store';
import { AnimatePresence } from 'motion/react';

export default function ClientLayout() {
  const { searchModalShowing } = useSearchStore();

  return (
    <div className="scroller-element grid h-full grid-rows-[auto_1fr_auto] overflow-y-auto px-2 md:px-3">
      <Header />

      <main className="mx-auto w-full max-w-[1300px]">
        <Outlet />
      </main>
      <Footer />

      <AnimatePresence>{searchModalShowing && <SearchModal />}</AnimatePresence>
    </div>
  );
}
