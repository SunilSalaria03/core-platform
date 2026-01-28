import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-2">Login</h1>
      <p className="text-sm text-gray-600 mb-6">Sign in to continue</p>
      <LoginForm />
    </>
  );
}
