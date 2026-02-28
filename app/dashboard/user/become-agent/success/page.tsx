"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SuccessAnimation from "./SuccessAnimation";
import { useAuth } from "@/context/AuthContext";

export default function SuccessPage() {
  const { user } = useAuth();
  const router = useRouter();

  // Auto redirect after 6s
  useEffect(() => {
    const t = setTimeout(() => {
      router.push(`/dashboard/${user?.role}`);
    }, 6000);

    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 to-slate-900">
      <div className="text-center space-y-6 animate-fadeIn">
        <SuccessAnimation />

        <h1 className="text-3xl font-bold text-white">
          Application Submitted 🎉
        </h1>

        <p className="text-slate-400 max-w-md mx-auto">
          Your application is under review. We’ll notify you by email once it’s
          approved.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push("/")}
            className="px-5 py-2 rounded-lg bg-white text-black font-medium hover:scale-105 transition"
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => router.push("/settings/profile")}
            className="px-5 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
          >
            My Account
          </button>
        </div>

        <p className="text-xs text-slate-600">
          Redirecting automatically in 6 seconds…
        </p>
      </div>
    </div>
  );
}
