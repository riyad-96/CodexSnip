import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Nav from './Nav';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 left-0 z-10 w-full py-2">
      <div className="bg-code mx-auto flex h-[60px] max-w-[1300px] items-center justify-between rounded-xl px-3 shadow-sm md:px-4">
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

        <Nav />
      </div>
    </header>
  );
}
