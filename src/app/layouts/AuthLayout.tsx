import { auth, googleProvider } from '@/features/auth/lib/firebase.config';
import { GoogleIcon } from '@/shared/assets/Svgs';
import Logo from '@/shared/components/header/Logo';
import { signInWithPopup } from 'firebase/auth';
import { toast } from 'kitzo';
import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AuthLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname.includes('login');

  const [trying, setTrying] = useState<boolean>(false);

  async function googleSignIn() {
    setTrying(true);
    try {
      await signInWithPopup(auth, googleProvider);
      localStorage.setItem('visitor_state', 'old');
    } catch (err) {
      console.error(err);
      toast.error('Login failed');
    } finally {
      setTrying(false);
    }
  }

  return (
    <div className="grid h-dvh place-items-center overflow-y-auto p-4 pt-16 pb-26">
      {trying && (
        <div className="fixed inset-0 z-20 cursor-not-allowed bg-white/30"></div>
      )}

      <div className="fixed top-4 left-4">
        <Logo onClick={() => navigate('/')} />
      </div>

      <div className="w-full max-w-87.5 md:max-w-100">
        <Outlet />
        <div className="mt-2 grid gap-2">
          <span className="text-center">or</span>
          <button
            onClick={googleSignIn}
            className="keyboard-focus-effect flex h-10 items-center justify-center gap-1 rounded-xl bg-neutral-900 tracking-wide text-neutral-50"
          >
            <GoogleIcon size="20" />
            <span>Continue with google</span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1 text-sm">
          <span>
            {isLoginPage
              ? "Don't have an account?"
              : 'Already have an account?'}
          </span>
          <Link
            className="text-blue-500 underline-offset-1 transition-[text-underline-offset] pointer-fine:hover:underline pointer-fine:hover:underline-offset-6"
            to={isLoginPage ? '/auth/signup' : '/auth/login'}
            children={isLoginPage ? 'Signup' : 'Login'}
            replace
          />
        </div>
      </div>
    </div>
  );
}
