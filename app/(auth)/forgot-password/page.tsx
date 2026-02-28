"use client";

import Loader from "@/components/ui/Loader";
import { requestPasswordReset } from "@/lib/user";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await requestPasswordReset(email);
      setMessage(res.message)

      setTimeout(() => {
        setMessage("");
      }, 3000)
      toast.info(res.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col justify-center items-center p-10">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>

      <form onSubmit={handleSubmit} className="w-full shadow-md p-4 border border-gray-300 rounded-xl">
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-2 w-full mb-4 rounded-full "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-black text-white p-2 w-full rounded-full"
          disabled={loading}
        >
          {loading ? <Loader text="Sending..." /> : "Send"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}