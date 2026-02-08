"use client";

import { Apple } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Loader from "./Loader";

const GoogleAppleButton = () => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);

  return (
    <div>
      {/* OAuth */}
      <button
        onClick={() => {
          setGoogleLoading(true);
          const redirect =
            new URLSearchParams(window.location.search).get("redirect") || "/";

          window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google?redirect=${encodeURIComponent(redirect)}`;
        }}
        className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-3 font-medium hover:bg-gray-100 transition"
      >
        {googleLoading ? (
          <Loader text="Redirecting to Google..." />
        ) : (
          <>
            <FcGoogle size={22} />
            Sign in with Google
          </>
        )}
      </button>

      <button
        // onClick={() => signIn("github", { callbackUrl: "/" })}
        className="mt-2 w-full bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center gap-3 rounded-lg py-3 font-medium transition"
      >
        {appleLoading ? (
          <Loader text="Redirecting..." />
        ) : (
          <>
            <Apple size={22} />
            Sign in with Apple
          </>
        )}
      </button>
    </div>
  );
};

export default GoogleAppleButton;
