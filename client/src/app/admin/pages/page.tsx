export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Admin Dashboard 2
          </h1>
          <p className="text-gray-600 mb-6">
            Welcome to the Admin Panel. This is a dummy page to test routing functionality.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900">User Management</h3>
              <p className="text-blue-700">Manage system users</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900">System Settings</h3>
              <p className="text-green-700">Configure application settings</p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900">Analytics</h3>
              <p className="text-purple-700">View system analytics</p>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Admin Action Button
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}