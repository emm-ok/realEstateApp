"use client";
import Topbar from "@/components/admin/Topbar";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/context/AuthContext";

export default function UserDashboardLayout({ children }) {
  const { user } = useAuth();

  return (
      <div className="flex h-screen bg-gray-50">
      <Sidebar role="agent" />

      {/* Main content */}
      <main className="p-4 flex-1 overflow-y-auto space-y-6 ml-20">
        <Topbar user={user} />
        {children}
      </main>
    </div>
  );
}
