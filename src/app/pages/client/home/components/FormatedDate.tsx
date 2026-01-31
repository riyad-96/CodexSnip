import { format } from 'date-fns';
import { Clock10Icon } from 'lucide-react';

type FormatedDatePropsType = {
  time: string | number | Date;
  className?: string;
};

export default function FormatedDate({
  time,
  className,
}: FormatedDatePropsType) {
  return (
    <div
      className={`relative z-2 flex w-fit cursor-default items-center gap-1 rounded-lg px-2 py-1 text-xs ${className}`}
    >
      <span>
        <Clock10Icon size="14" />
      </span>
      <span>{format(time, 'h:mm a • d MMM y ')}</span>
    </div>
  );
}
