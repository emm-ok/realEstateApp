"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { settingsNav } from "@/config/settings.config";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Sidebar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const getInitials = (name = "") => {
    const parts = name.trim().split(" ");
    if (parts.length === 0) return "";
    if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(user?.name);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.aside
      // onMouseEnter={() => setExpanded(true)}
      // onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded(!expanded)}
      animate={{ width: expanded ? 260 : 64 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed h-screen bg-gray-500/20 backdrop-blur-lg shadow-lg z-40 flex flex-col overflow-hidden m-2 rounded-xl"
    >
      {/* Header */}
      <div
        className={`flex items-center py-4 ${
          expanded ? "justify-between px-4" : "justify-center"
        }`}
      >
        {expanded ? (
          <X onClick={() => setExpanded(false)} />
        ) : (
          <Menu onClick={() => setExpanded(true)} />
        )}
        {expanded && <h2 className="text-lg font-bold">Settings</h2>}

        {expanded && (
          <Avatar className="w-10 h-10 font-bold">
          <AvatarImage src={user?.image || ""} className="object-cover" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 px-2">
        {settingsNav.map((item) => (
          <Link
            key={item.id}
            href={`/account/settings/${item.id}`}
            className={`group flex items-center rounded-md transition
              ${expanded ? "gap-3 px-3 py-3 justify-start" : "justify-center py-3"}
              ${
                isActive(`/account/settings/${item.id}`)
                  ? "bg-neutral-300 font-semibold"
                  : "hover:bg-neutral-300"
              }
            `}
          >
            <item.icon size={20} />

            {/* Label (completely removed when collapsed) */}
            {expanded && (
              <span className="whitespace-nowrap">
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </motion.aside>
  );
}
