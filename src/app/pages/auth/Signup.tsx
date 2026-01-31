import SignupForm from "@/features/auth/components/SignupForm";

export default function Signup() {
  return (
    <div>
      <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">
        Create account!
      </h1>

      <SignupForm />
    </div>
  );
}
