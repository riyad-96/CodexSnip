type DefaultType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type GlossyButtonProps = {
  primary?: boolean;
} & DefaultType;

export default function Button({
  onClick,
  primary,
  ...rest
}: GlossyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`grid origin-center overflow-hidden rounded-xl border text-sm transition-colors active:scale-98 pointer-fine:cursor-pointer ${
        primary
          ? 'border-neutral-900 bg-neutral-900 tracking-wide text-neutral-100'
          : 'border-neutral-200 bg-white text-neutral-900 pointer-fine:hover:border-neutral-400'
      }`}
      {...rest}
    >
      {rest.children}
    </button>
  );
}
