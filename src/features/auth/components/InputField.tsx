import { EyeClosedIcon, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState, type HTMLInputTypeAttribute } from 'react';
import ErrorElement from './ErrorElement';
import { motion, AnimatePresence } from 'motion/react';

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
      <label
        className="w-fit pl-1"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2 transition-colors outline-none focus:border-neutral-400"
          type={
            type === 'password' ? (passShowing ? 'text' : 'password') : type
          }
          {...rest}
        />
        {type === 'password' && (
          <button
            onClick={() => {
              setPassShowing((prev) => !prev);
            }}
            type="button"
            className="absolute top-1/2 right-1 grid h-8 w-11 -translate-y-1/2 place-items-center rounded-lg bg-neutral-100 pointer-fine:hover:bg-neutral-200"
          >
            <AnimatePresence mode="wait">
              {passShowing ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.08 }}
                  key="eye-opened"
                >
                  <EyeIcon size="18" />
                </motion.span>
              ) : (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ duration: 0.08 }}
                  key="eye-off"
                >
                  <EyeOffIcon size="18" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        )}
      </div>
      <ErrorElement error={error} />
    </div>
  );
}
