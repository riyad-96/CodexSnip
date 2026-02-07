import { useForm } from 'react-hook-form';
import type { EmailPassword } from '../types/types';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase.config';
import { toast } from 'kitzo';
import type { FirebaseError } from 'firebase/app';
import InputField from './InputField';

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailPassword>();

  const [logging, setLogging] = useState<boolean>(false);

  async function login(data: EmailPassword) {
    if (logging) return;
    setLogging(true);
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem('visitor_state', 'old');
      toast.success('Login successful');
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === 'auth/invalid-credential') {
        toast.error('Invalid email/password', {
          duration: 3500,
        });
      }
      if (error.code === 'auth/too-many-requests') {
        toast.error('Try again later', {
          duration: 3500,
        });
      }
    } finally {
      setLogging(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(login)}
      className="grid gap-2"
    >
      <InputField
        id="email"
        type="email"
        label="Email"
        placeholder="Your email"
        autoComplete="on"
        error={errors.email?.message}
        {...register('email', {
          required: {
            value: true,
            message: 'Email is required',
          },
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please type valid email address',
          },
        })}
      />
      <InputField
        id="password"
        type="password"
        label="Password"
        placeholder="Your password"
        autoComplete="on"
        error={errors.password?.message}
        {...register('password', {
          required: {
            value: true,
            message: 'Password is required',
          },
          minLength: {
            value: 6,
            message: 'Must be at least 6 characters long',
          },
        })}
      />

      <button className="keyboard-focus-effect mt-4 block h-10 w-full rounded-xl bg-neutral-900 tracking-wide text-neutral-100">
        {logging ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          <span>Login</span>
        )}
      </button>
    </form>
  );
}
