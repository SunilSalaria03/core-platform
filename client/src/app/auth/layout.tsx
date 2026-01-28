import PublicGuard from "@/common/guards/publicGuard";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicGuard>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-xl border p-6">{children}</div>
      </div>
    </PublicGuard>
  );
}
