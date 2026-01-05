import React, { useState } from 'react';
import type { HTMLInputTypeAttribute } from 'react';
import ErrorElement from './ErrorElement';
import { EyeClosedIcon, EyeIcon } from 'lucide-react';

type InputFieldPropsTypes = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  error: string | null | undefined;
};

export default function InputField({
  id,
  label,
  type,
  error,
  ...rest
}: InputFieldPropsTypes) {
  const [passShowing, setPassShowing] = useState<boolean>(false);

  return (
    <div className="grid gap-1">
      <label className="pl-1 w-fit" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className="border-code-200 ring-code-250 focus:border-code-250 w-full min-w-0 rounded-full border px-4 py-1.5 ring-0 transition-shadow outline-none focus:ring-2"
          type={
            type === 'password' ? (passShowing ? 'text' : 'password') : type
          }
          {...rest}
        />
        {type === 'password' && (
          <button
            onClick={(e) => {
              setPassShowing((prev) => !prev);
              const btn = e.currentTarget;
              const input = btn.closest('button')
                ?.previousElementSibling as HTMLInputElement;
              input.focus();
            }}
            type="button"
            className="pointer-fine:hover:bg-code-150 bg-code-100 absolute top-1/2 right-1 grid h-8 w-11 -translate-y-1/2 place-items-center rounded-full active:transform-[scale(0.96)]"
          >
            {passShowing ? <EyeClosedIcon size="18" /> : <EyeIcon size="18" />}
          </button>
        )}
      </div>
      <ErrorElement error={error} />
    </div>
  );
}
