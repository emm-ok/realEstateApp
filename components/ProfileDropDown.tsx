import { formatFullName } from "@/utils";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FolderArchive, Settings, User, UserCheck2Icon } from "lucide-react";
import Help from "./Help";
import Logout from "./Logout";

const ProfileDropDown = ({
  profileRef,
  initials,
  user,
  profileOpen,
  setProfileOpen,
  setRedirecting,
  confirm,
}) => {
  return (
    <div className="relative" ref={profileRef}>
      <button onClick={() => setProfileOpen((p) => !p)}>
        <Avatar className="w-10 h-10 font-bold shadow-md">
          <AvatarImage
            src={user?.image || ""}
            alt={`${initials || ""}`}
            className="w-full h-full object-cover"
          />
          <AvatarFallback className="p-5">{initials}</AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 bg-white mt-2 shadow-lg rounded-lg"
          >
            <Link
              href="/account/settings/account"
              className="flex gap-2 p-4 hover:bg-gray-100"
            >
              <button>
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
              </button>

              <div>
                <h2 className="font-bold text-sm">
                  {formatFullName(user?.name)}
                </h2>
                <h4 className="font-extralight text-xs">{user?.email}</h4>
              </div>
            </Link>
            <div className="w-full h-[.1px] bg-gray-300 mb-2" />
            <Link
              href="/account/settings/account"
              className="flex gap-1 items-center px-4 py-2 text-xs hover:bg-gray-100"
            >
              <User size={18} />
              Profile
            </Link>
            {user.role === "user" && (
              <Link
                href="/account/become-agent"
                className="flex gap-1 items-center px-4 py-2 text-xs hover:bg-gray-100 rounded-full border border-gray-300"
              >
                <UserCheck2Icon size={18} />
                Become an Agent
              </Link>
            )}
            <Link
              href="/account/collection"
              className="flex gap-1 items-center px-4 py-2 text-xs hover:bg-gray-100"
            >
              <FolderArchive size={18} />
              Collections
            </Link>
            <Help />
            <Link
              href="/account/settings/account"
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

export default ProfileDropDown;
