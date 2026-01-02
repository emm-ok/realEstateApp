"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

export default function VerificationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={64} />
        </div>

        {/* Content */}
        <h1 className="text-2xl font-bold text-gray-900">
          Verification Successful 🎉
        </h1>
        <p className="text-gray-500 mt-2">
          Your account has been successfully verified.  
          You can now continue.
        </p>

        {/* Action */}
        <button
          className="mt-8 w-full rounded-lg bg-black text-white py-3 font-semibold hover:opacity-90 transition"
          onClick={() => console.log("Go to dashboard")}
        >
          Go to Dashboard
        </button>

        {/* Secondary */}
        <p className="text-sm text-gray-400 mt-4">
          If you didn’t request this, please contact support.
        </p>
      </div>
    </div>
  );
}
