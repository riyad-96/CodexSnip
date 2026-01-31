import LoginForm from '@/features/auth/components/LoginForm';

export default function Login() {
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">
        Welcome back!
      </h1>

      <LoginForm />
    </div>
  );
}
