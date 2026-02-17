"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import { Menu } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useConfirm } from "@/components/confirm/ConfirmProvider";
import ProfileDropDown from "../ProfileDropDown";
import Link from "next/link";

interface Props {
  setMobileOpen: (value: boolean) => void;
}

export default function SettingsTopbar({ setMobileOpen }: Props) {
  const { user } = useAuth();
  const confirm = useConfirm();
  const profileRef = useRef<HTMLDivElement | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
      <div className="h-14 px-4 md:px-8 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={20} />
          </button>

          <Link href="/" className="flex gap-2 items-center">
            <Image src={logo} alt="Logo" width={32} height={32} />
            <span className="font-semibold hidden sm:inline">VeriSpace</span>
          </Link>
        </div>

        {/* Search */}
        <div className="hidden md:block w-80">
          <input
            placeholder="Search settings..."
            className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-neutral-800 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Profile */}
        {user && (
          <ProfileDropDown
            profileRef={profileRef}
            initials={initials}
            user={user}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
            setRedirecting={() => {}}
            confirm={confirm}
          />
        )}
      </div>
    </header>
  );
}
