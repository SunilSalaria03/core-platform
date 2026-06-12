import SigninForm from "./components/SigninForm";

export default function SigninPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">Signin</h1>
      <p className="text-sm text-gray-600 mb-6">Sign in to continue</p>
      <SigninForm />
    </>
  );
}
