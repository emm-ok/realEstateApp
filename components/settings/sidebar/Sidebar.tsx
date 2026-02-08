"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { settingsNav } from "@/config/settings.config";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Settings, X } from "lucide-react";

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ===== MOBILE TOGGLE BUTTON ===== */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-20 right-4 z-50 bg-card text-card-foreground shadow-md p-2 rounded-lg flex items-center gap-2 hover:bg-gray-200"
        aria-label="Open Menu"
      >
        <Settings size={24} />
      </button>

      {/* ===== MOBILE DRAWER ===== */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/30 md:hidden "
            onClick={() => setMobileOpen(false)}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 w-[80%] bg-white max-w-xs h-full bg-background shadow-lg md:hidden flex flex-col text-xs"
          >
            <div className="flex items-center justify-between p-4">
              <Avatar className="w-10 h-10 font-bold">
                <AvatarImage src={user?.image || ""} className="object-cover" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 p-4">
              {settingsNav.map((item) => (
                <Link
                  key={item.id}
                  href={`/account/settings/${item.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-2 rounded transition 
                    ${isActive(`/account/settings/${item.id}`)
                      ? "bg-neutral-200 dark:bg-neutral-800 font-semibold"
                      : "hover:bg-neutral-100 dark:hover:bg-neutral-700"}
                  `}
                >
                  <item.icon size={16} />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        </>
      )}

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-background shadow-md p-4">
        <Avatar className="w-10 h-10 font-bold mb-6">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <nav className="flex flex-col gap-1">
          {settingsNav.map((item) => (
            <Link
              key={item.id}
              href={`/account/settings/${item.id}`}
              className={`flex items-center gap-2 px-3 py-2 rounded transition
                ${isActive(`/account/settings/${item.id}`)
                  ? "bg-neutral-200 dark:bg-neutral-800 font-semibold"
                  : "hover:bg-neutral-100 dark:hover:bg-neutral-700"}
              `}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
