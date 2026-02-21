import { formatFullName } from "@/utils";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  ChevronDown,
  FolderArchive,
  Settings,
  User,
  UserCheck2Icon,
} from "lucide-react";
import Help from "../Help";
import Logout from "../Logout";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const DashboardProfileDropDown = ({
  profileRef,
  initials,
  user,
  profileOpen,
  setProfileOpen,
  setRedirecting,
  confirm,
}) => {
  return (
    <div className="relative w-full z-40" ref={profileRef}>
      <button
        onClick={() => setProfileOpen(p => !p)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800 transition"
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div className="hidden md:block text-left">
          <p className="text-sm font-medium">
            {formatFullName(user?.name)}
          </p>
          <p className="text-xs text-muted-foreground">
            {user?.email}
          </p>
        </div>

        <ChevronDown size={16} />
      </button>

      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 bg-white mt-2 shadow-lg rounded-lg w-[200px]"
          >
            <div className="w-full h-[.1px] bg-gray-300 mb-2" />
            <Link
              href="/settings/profile"
              className="flex gap-1 items-center px-4 py-2 text-xs hover:bg-gray-100"
            >
              <User size={18} />
              Profile
            </Link>
            {user.role === "user" && (
              <Link
                href="/become-agent"
                className="flex gap-1 items-center px-4 py-2 text-xs hover:bg-gray-100 rounded-full border border-gray-300"
              >
                <UserCheck2Icon size={18} />
                Become an Agent
              </Link>
            )}
            <Link
              href="/collection"
              className="flex gap-1 items-center px-4 py-2 text-xs hover:bg-gray-100"
            >
              <FolderArchive size={18} />
              Collections
            </Link>
            <Help />
            <Link
              href="/settings/profile"
              className="flex gap-1 items-center px-4 py-2 text-xs hover:bg-gray-100"
            >
              <Settings size={18} />
              Settings
            </Link>
            <Logout />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardProfileDropDown;
