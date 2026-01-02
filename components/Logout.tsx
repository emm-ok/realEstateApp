"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold">Log out?</h1>
        <p className="text-gray-500 mt-2">
          You’ll be signed out of your account.
        </p>

        <div className="mt-8 flex gap-4">
          <button
            className="flex-1 border rounded-lg py-3"
            onClick={() => router.back()}
          >
            Cancel
          </button>

          <button
            className="flex-1 bg-primary text-white rounded-lg py-3"
            onClick={() => signOut({ callbackUrl: "/auth/signin" })}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
