import Logo from '../header/Logo';

export default function LoadingScreen() {
  return (
    <div className="grid h-dvh place-items-center bg-neutral-50">
      <div className="cursor-default">
        <Logo />
      </div>
    </div>
  );
}
