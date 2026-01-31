import { Link, useNavigate } from 'react-router-dom';
import { ProfilePlaceholderSvg } from '../../assets/Svgs';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/firebase.config';
import { toast } from 'kitzo';
import { useAuthStore } from '@/store/auth.store';
import { queryClient } from '@/main';

export default function Nav() {
  const user = useAuthStore((s) => s.user);
  const [dropdownShowing, setDropdownShowing] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    function closeDropdown(e: PointerEvent | TouchEvent) {
      const doc = e.target as HTMLElement;
      if (doc.closest('.dropdown')) return;
      if (doc.closest('.dropdown-btn')) return;
      setDropdownShowing(false);
    }

    document.addEventListener('click', closeDropdown);
    document.addEventListener('touchstart', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
      document.removeEventListener('touchstart', closeDropdown);
    };
  }, []);

  return (
    <nav>
      {user ? (
        <div>
          <div className="relative">
            <div className="relative size-9 overflow-hidden rounded-full">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName as string}
                  className="object-cover"
                />
              ) : (
                <span className="grid size-full bg-neutral-100">
                  <ProfilePlaceholderSvg className="size-full text-neutral-600" />
                </span>
              )}
              <button
                onClick={() => {
                  if (dropdownShowing) {
                    setDropdownShowing(false);
                    return;
                  }
                  setDropdownShowing(true);
                }}
                className="dropdown-btn absolute inset-0 z-1"
              ></button>
            </div>

            <AnimatePresence>
              {dropdownShowing && (
                <motion.div
                  initial={{
                    scale: 0.95,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0.95,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  className="dropdown absolute top-[calc(100%+12px)] right-0 min-w-35 origin-top-right overflow-hidden rounded-xl border border-neutral-200 bg-white"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setDropdownShowing(false);
                      }}
                      className="w-full px-4 py-2.5 text-start transition-colors hover:bg-neutral-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        signOut(auth).then(() => {
                          toast.success('Logout successful');
                          queryClient.clear();
                          queryClient.invalidateQueries();
                          setDropdownShowing(false);
                        });
                      }}
                      className="w-full px-4 py-2.5 text-start transition-colors hover:bg-neutral-100"
                    >
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <Link
            className="rounded-xl px-4 py-2 text-sm transition-colors hover:bg-neutral-100"
            to="/auth/login"
          >
            Login
          </Link>

          <Link
            className="rounded-xl border border-neutral-900 bg-neutral-900 px-4 py-2 text-sm text-white"
            to="/auth/signup"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
