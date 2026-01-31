import Logo from '../components/header/Logo';

export default function LoadingScreen() {
  return (
    <div className="bg-code-50 grid h-dvh place-items-center">
      <div className="cursor-default">
        <Logo />
      </div>
    </div>
  );
}
