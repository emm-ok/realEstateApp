"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { toast } from "sonner";
import { getUserById, suspendUserById } from "@/lib/admin";
import { AdminUserDetails } from "@/types/admin";
import {
  ActivitySection,
  CompanySection,
  ProfileSection,
  SecuritySection,
  StatusBadge,
} from "./SubComponents";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

type TabKey = "profile" | "security" | "activity" | "company";

export default function AdminUserDetailsDrawer({
  userId,
  isOpen,
  onClose,
}: Props) {
  const [user, setUser] = useState<AdminUserDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("profile");
  const [mounted, setMounted] = useState(false);

  // Prevent SSR hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && userId) {
      fetchUser(userId);
    }
  }, [isOpen, userId]);

  const fetchUser = async (id: string) => {
    try {
      setLoading(true);
      const data = await getUserById(id);
      setUser(data.user as AdminUserDetails);
    } finally {
      setLoading(false);
    }
  };

  const handleSuspendToggle = async () => {
    if (!user) return;

    const data = await suspendUserById(user._id, !user.isSuspended);
    toast.success(data.message);
    fetchUser(user._id);
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Drawer */}
          <motion.div
            className="relative w-full max-w-xl h-full bg-white shadow-2xl overflow-y-auto p-6"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
          >
            {/* Close Button */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">User Details</h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={18} />
              </button>
            </div>

            {loading ? (
              <div className="py-20 text-center">
                <Loader text="Loading..." />
              </div>
            ) : user ? (
              <>
                {/* Header */}
                <div className="mb-8 flex items-center gap-2">
                  <div className="">
                    <Avatar className="font-bold">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={`${initials || ""}`}
                        className="w-full h-full object-cover"
                      />
                      <AvatarFallback className="p-2 shadow-md border border-gray-400">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <div className="flex gap-2 mt-3 flex-wrap">
                      <StatusBadge
                        label={user.isActive ? "Active" : "Inactive"}
                        color={user.isActive ? "green" : "gray"}
                      />
                      <StatusBadge
                        label={user.isSuspended ? "Suspended" : "Not Suspended"}
                        color={user.isSuspended ? "red" : "green"}
                      />
                      <StatusBadge label={user.role} color="blue" />
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mb-6 text-sm font-medium border-b border-gray-400">
                  {(
                    ["profile", "security", "activity", "company"] as TabKey[]
                  ).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 capitalize transition ${
                        activeTab === tab
                          ? "border-b-2 border-gray-300"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Content */}
                {activeTab === "profile" && <ProfileSection user={user} />}

                {activeTab === "security" && (
                  <SecuritySection
                    user={user}
                    onSuspendToggle={handleSuspendToggle}
                  />
                )}

                {activeTab === "activity" && <ActivitySection user={user} />}

                {activeTab === "company" && <CompanySection user={user} />}
              </>
            ) : (
              <div className="py-20 text-center">User not found.</div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
