import { Link } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { ProfilePlaceholderSvg } from '../../assets/Svgs';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/firebase.config';
import { toast } from 'kitzo';
import GlossyButton from '../ui/GlossyButton';
import { useQueryClient } from '@tanstack/react-query';

export default function Nav() {
  const { user } = useAuthContext();
  const [dropdownShowing, setDropdownShowing] = useState<boolean>(false);
  const queryClient = useQueryClient();

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
                <span className="grid size-full bg-zinc-100">
                  <ProfilePlaceholderSvg className="size-full text-zinc-600" />
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
                className="dropdown-btn absolute inset-0 z-1 pointer-fine:cursor-pointer"
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
                  className="dropdown absolute top-[calc(100%+12px)] right-0 min-w-35 origin-top-right overflow-hidden rounded-xl border border-zinc-200 bg-white"
                >
                  <div className="py-1">
                    <button
                      onClick={() => {
                        signOut(auth).then(() => {
                          toast.success('Logout successful');
                          queryClient.clear();
                        });
                      }}
                      className="w-full px-4 py-2.5 text-start transition-colors hover:bg-zinc-100 pointer-fine:cursor-pointer"
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
        <div className="flex items-center gap-2">
          <Link
            className="rounded-xl px-4 py-2 text-sm transition-colors hover:bg-zinc-100 pointer-fine:cursor-pointer"
            to="/auth/login"
          >
            Login
          </Link>

          <Link
            className="inline-block rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-zinc-900 pointer-fine:cursor-pointer"
            to="/auth/signup"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
