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
            <div className="relative size-8 overflow-hidden rounded-full">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName as string}
                />
              ) : (
                <span className="text-code-800 grid size-full">
                  <ProfilePlaceholderSvg className="size-full" />
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
                    scale: 0.8,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  exit={{
                    scale: 0.8,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.1,
                  }}
                  className="dropdown bg-code absolute top-[calc(100%+20px)] right-0 w-[120px] origin-top-right overflow-hidden rounded-lg py-1 shadow"
                >
                  <div className="grid">
                    {/* <button className="px-5 pointer-fine:hover:bg-code-50 py-1.5 text-start">
                      Profile
                    </button> */}
                    <button
                      onClick={() => {
                        signOut(auth).then(() => {
                          toast.success('Logout successful');
                          queryClient.clear();
                        });
                      }}
                      className="pointer-fine:hover:bg-code-50 px-5 py-1.5 text-start"
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
        <div className="flex items-center gap-1">
          <Link
            className="rounded-full px-3 py-1 text-sm font-medium underline active:transform-[scale(0.96)]"
            to="/auth/login"
          >
            Login
          </Link>
          <GlossyButton
            content={
              <Link
                className="px-3 py-1"
                to="/auth/signup"
              >
                Register
              </Link>
            }
          />
        </div>
      )}
    </nav>
  );
}
