import { useAuthStore } from '@/features/auth/store/auth.store';
import { useSearchStore } from '@/features/search/store/search.store';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Nav from './Nav';
import SearchButton from '@/features/search/components/SearchButton';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const { setSearchModalShowing } = useSearchStore();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setSearchModalShowing(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setSearchModalShowing]);

  return (
    <header className="sticky top-0 left-0 z-10 w-full py-2">
      <div className="mx-auto flex h-15 max-w-325 items-center justify-between rounded-2xl border border-neutral-200 bg-white px-3 md:px-4">
        <Logo
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
            } else {
              window.location.reload();
            }
          }}
        />

        <div className="flex items-center gap-3">
          {user && <SearchButton />}
          <Nav />
        </div>
      </div>
    </header>
  );
}
