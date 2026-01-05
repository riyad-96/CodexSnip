import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Nav from './Nav';
import { useAuthContext } from '../../contexts/AuthContext';
import { Search } from 'lucide-react';
import { useSearchStore } from '@/store/search.store';
import { useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
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
  }, []);

  return (
    <header className="sticky top-0 left-0 z-10 w-full py-2">
      <div className="mx-auto flex h-15 max-w-325 items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 md:px-6">
        <Logo
          layoutId="CodexSnip-logo"
          onClick={() => {
            if (location.pathname !== '/') {
              navigate('/');
            } else {
              window.location.reload();
            }
          }}
        />

        <div className="flex items-center gap-3">
          {user && (
            <button
              onClick={() => setSearchModalShowing(true)}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm transition-colors hover:border-neutral-900 pointer-fine:cursor-pointer"
            >
              <Search
                size={16}
                className="text-neutral-600"
              />
              <span className="text-xs tracking-wide text-neutral-600">
                CTRL + K
              </span>
            </button>
          )}
          <Nav />
        </div>
      </div>
    </header>
  );
}
