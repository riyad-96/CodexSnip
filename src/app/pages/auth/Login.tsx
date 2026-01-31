import { useForm } from 'react-hook-form';
import type { EmailPassword } from './types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';
import { toast } from 'kitzo';
import { useState } from 'react';
import { auth } from '@/configs/firebase.config';
import InputField from '@/components/auth/InputField';

export default function Login() {
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
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">
        Welcome back!
      </h1>

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

        <button className="bg-code-900 text-code-100 keyboard-focus-effect block h-10 w-full rounded-full tracking-wide">
          {logging ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <span>Login</span>
          )}
        </button>
      </form>
    </div>
  );
}
