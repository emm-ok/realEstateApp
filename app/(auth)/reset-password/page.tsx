"use client";

import { confirmPasswordResetToken } from "@/lib/user";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { token, newPassword: password }

    const res = await confirmPasswordResetToken(data)
    setMessage(res.message);
    toast.success(res.message);
  };

  return (
     <div className="min-h-screen w-screen flex flex-col justify-center items-center p-10">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>

      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New password"
          className="border border-gray-300 p-2 w-full mb-4 rounded-full "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="bg-black text-white p-2 w-full rounded-full">
          Reset Password
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}