import cn from '@/shared/lib/cn';

type DefaultAttributesType = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type ButtonVariants = 'outlined' | 'filled' | 'delete';

type ButtonProps = {
  variant?: ButtonVariants;
} & DefaultAttributesType;

export default function Button({ variant, className, ...rest }: ButtonProps) {
  function getVariants(variant: ButtonVariants | undefined) {
    switch (variant) {
      case 'outlined':
        return 'rounded-xl text-sm border border-neutral-200 bg-neutral-50 px-2.5 py-1.5 sm:px-3 sm:py-2 pointer-fine:hover:border-neutral-300';
      case 'filled':
        return 'rounded-xl text-sm border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 px-2.5 py-1.5 sm:px-3 sm:py-2';
      case 'delete':
        return 'rounded-xl text-sm border border-red-600 bg-red-600 text-white px-2.5 py-1.5 sm:px-3 sm:py-2';
      default:
        return 'text-sm';
    }
  }

  return (
    <button
      className={cn(getVariants(variant), className)}
      {...rest}
    >
      {rest.children}
    </button>
  );
}
