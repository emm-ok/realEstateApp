"use client";

import { useState } from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DeleteAccountModal({ open, onClose }) {
  const [confirmText, setConfirmText] = useState("");
  const [confirmText2, setConfirmText2] = useState("");
  const { user, deleteUser } = useAuth();
  const router = useRouter()

  if (!open) return null;

  const isConfirmed = confirmText === user?.email;
  const isConfirmed2 = confirmText2 === user?.email;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl p-6 space-y-6 z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-600">
            <Trash2 />
            <h2 className="font-semibold text-lg">
              Delete Account
            </h2>
          </div>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        {/* Warning */}
        <div className="flex gap-3 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
          <AlertTriangle size={18} />
          <p>
            This action is permanent and cannot be undone.
          </p>
        </div>

        {/* Consequences */}
        <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>Your account will be permanently deleted</li>
          <li>All your data will be removed</li>
          <li>You will lose access immediately</li>
        </ul>

        {/* Confirm text */}
        <div>
          <label className="text-sm font-medium">
            Type <span className="font-bold">{user?.email}</span> to confirm
          </label>
          <input
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        {/* Confirm text */}
        <div>
          <label className="text-sm font-medium">
            Type <span className="font-bold">{user?.email}</span> to confirm delete
          </label>
          <input
            value={confirmText2}
            onChange={(e) => setConfirmText2(e.target.value)}
            className="mt-1 w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border py-2 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={deleteUser}
            disabled={!isConfirmed || !isConfirmed2}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition
              ${
                isConfirmed && isConfirmed2
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
