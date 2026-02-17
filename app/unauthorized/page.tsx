"use client";

import { useAuth } from "@/context/AuthContext";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function UnauthorizedPage() {
  const { user } = useAuth();

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

        <Link href="/" className="btn-primary">
          Go to back Home
        </Link>
      </div>
    </div>
  );
}
