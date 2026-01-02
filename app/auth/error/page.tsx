"use client";

import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const params = useSearchParams();
  const error = params.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-xl font-bold text-red-600">
          Authentication Error
        </h1>
        <p className="mt-2 text-gray-600">
          {error ?? "Something went wrong"}
        </p>
      </div>
    </div>
  );
}
