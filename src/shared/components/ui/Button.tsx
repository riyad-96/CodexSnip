import cn from '@/shared/lib/cn';
import { type VariantProps, cva } from 'class-variance-authority';

const buttonVariants = cva('text-sm', {
  variants: {
    variant: {
      default:
        'rounded-xl border border-neutral-900 bg-neutral-900 text-white hover:bg-neutral-800 ',
      outline:
        'rounded-xl border border-neutral-200 bg-neutral-50 pointer-fine:hover:border-neutral-300 pointer-fine:hover:bg-neutral-100 shadow-xs',
      destructive: 'rounded-xl border border-red-600 bg-red-600 text-white',
    },
    size: {
      default: 'px-2.5 py-1.5 sm:px-3 sm:py-2',
      sm: 'px-2 py-1 sm:px-2.5 sm:py-1.5',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {};

export default function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ className, variant, size }))}
      {...props}
    />
  );
}
