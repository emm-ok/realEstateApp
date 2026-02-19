"use client";

import DeleteAccountModal from "@/components/settings/sidebar/DeleteAccountModal";
import { useState } from "react";

export default function DeleteAccountPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <p className="text-gray-500 text-sm">
          Manage your account preferences and security.
        </p>
      </div>

      <div className="rounded-2xl border p-6 space-y-4">
        <h2 className="text-lg font-medium text-red-600">
          Danger Zone
        </h2>

        <p className="text-sm text-gray-600">
          Deleting your account will permanently remove all your data.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-red-600 px-4 py-2 text-white text-sm font-medium hover:bg-red-700 transition"
        >
          Delete Account
        </button>
      </div>

      <DeleteAccountModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
