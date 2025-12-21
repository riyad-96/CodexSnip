import { useForm } from 'react-hook-form';
import type { EmailPassword } from './types';
import InputField from '../../components/auth/InputField';
import type { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../configs/firebase.config';
import { toast } from 'kitzo';

export default function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EmailPassword>();

  const [signing, setSigning] = useState<boolean>(false);

  async function signup(data: EmailPassword) {
    if (signing) return;
    setSigning(true);
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem('visitor_state', 'old');
      toast.success('Registration successful');
    } catch (err) {
      const error = err as FirebaseError;
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Email already exists');
      }
    } finally {
      setSigning(false);
    }
  }

  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">
        Create account!
      </h1>

      <form
        onSubmit={handleSubmit(signup)}
        className="grid gap-2"
      >
        <InputField
          id="email"
          type="email"
          label="Email"
          placeholder="Your email"
          autoComplete="off"
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
          autoComplete="off"
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
          {signing ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            <span>Signup</span>
          )}
        </button>
      </form>
    </div>
  );
}
