"use client";

import { useAuth } from "@/context/AuthContext";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center space-y-6">
        <ShieldAlert className="mx-auto text-red-500" size={48} />

        <h1 className="text-2xl font-semibold">Access Denied</h1>

        <p className="text-gray-600">
          You don’t have permission to view this page.
        </p>

        {user && (
          <p className="text-sm text-gray-500">
            Logged in as <span className="font-medium">{user.email}</span>
          </p>
        )}

        <button onClick={handleBack} className="btn-primary">
          Go Back
        </button>
      </div>
    </div>
  );
}
