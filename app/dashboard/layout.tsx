import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
