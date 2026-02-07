type LogoPropsTypes = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function Logo({ onClick }: LogoPropsTypes) {
  return (
    <div className="text-xl md:text-2xl">
      <button
        onClick={onClick}
        className="tracking-tight transition-colors pointer-fine:hover:text-neutral-600"
      >
        CodexSnip
      </button>
    </div>
  );
}
