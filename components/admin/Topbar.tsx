"use client";

import { Bell, Mic, Search, Settings } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import PageLoader from "../ui/PageLoader";
import { useConfirm } from "../confirm/ConfirmProvider";
import DashboardProfileDropDown from "../dashboard/DashboardProfileDropDown";

const Topbar = ({ user }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const confirm = useConfirm();
  const profileRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (redirecting) {
    return <PageLoader text="Logging out..." />;
  }

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "?";

  return (
    <header className="w-full bg-white px-4 py-3">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        
        {/* Left Section */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          
          {/* Search */}
          <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-2 w-full md:w-72">
            <Search size={18} className="text-gray-500" />
            <input
              placeholder="Search..."
              className="outline-none w-full text-sm"
            />
          </div>

          {/* AI Button (hidden text on mobile) */}
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
            <Mic size={18} />
            <span className="hidden sm:block text-sm">
              Assistant
            </span>
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-end gap-4">
          <Bell className="cursor-pointer text-gray-600 hover:text-black" />
          <Settings className="cursor-pointer text-gray-600 hover:text-black" />

          <DashboardProfileDropDown
            profileRef={profileRef}
            initials={initials}
            user={user}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
            setRedirecting={setRedirecting}
            confirm={confirm}
          />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
