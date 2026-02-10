import cn from '@/shared/lib/cn';

type TooltipContentProps = React.HTMLAttributes<HTMLDivElement>;

export default function TooltipContent({
  className,
  ...props
}: TooltipContentProps) {
  return (
    <div
      className={cn(
        'rounded-xl bg-neutral-900 px-2.5 py-1.25 text-sm text-white opacity-90',
        className,
      )}
      {...props}
    />
  );
}
