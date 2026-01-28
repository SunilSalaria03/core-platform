import AuthGuard from "../../../common/guards/authGuard";

export default function AdminDashboardPage() {
  return (
    <AuthGuard>
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </div>
    </AuthGuard>
  );
}
