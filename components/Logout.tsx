import { logoutUser } from "@/lib/auth";
import React from "react";
import { toast } from "sonner";
import { useConfirm } from "./confirm/ConfirmProvider";

const Logout = () => {
    const confirm = useConfirm();
    
  return (
    <button
      onClick={() =>
        confirm({
          title: "Are you sure you want to logout?",
          description: "You'll be signed out of your account",
          confirmText: "Logout",
          variant: "warning",
          onConfirm: async () => {
            await logoutUser();
            toast.loading("Redirecting to Login...");
            window.location.href = "/login";
            toast.success("Logged out successfully");
          },
        })
      }
      className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
    >
      Log out
    </button>
  );
};

export default Logout;
