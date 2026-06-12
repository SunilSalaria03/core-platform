import SignupForm from "./components/SignupForm";

export default function SignupPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">Sign up</h1>
      <p className="text-sm text-gray-600 mb-6">Create your account</p>
      <SignupForm />
    </>
  );
}
