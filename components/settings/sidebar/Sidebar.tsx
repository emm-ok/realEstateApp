"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { settingsNav } from "@/config/settings.config";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Props {
  expanded: boolean;
  setExpanded: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({
  expanded,
  setExpanded,
  mobileOpen,
  setMobileOpen,
}: Props) {
  const { user } = useAuth();
  const pathname = usePathname();

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href);

  return (
    <>
      {/* Desktop */}
      <motion.aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        animate={{ width: expanded ? 260 : 72 }}
        transition={{ duration: 0.2 }}
        className="hidden md:flex fixed top-0 left-0 h-screen bg-white dark:bg-neutral-900 border-r border-gray-300 z-50 flex-col"
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-center">
          <Avatar className="w-9 h-9">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {settingsNav.map((item) => (
            <Link
              key={item.id}
              href={`/account/settings/${item.id}`}
              className={`flex items-center gap-3 rounded-lg px-3 py-2
                ${
                  isActive(`/account/settings/${item.id}`)
                    ? "bg-gray-300/70"
                    : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                }
              `}
            >
              <item.icon size={20} />
              {expanded && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 h-screen w-64 bg-white dark:bg-neutral-900 z-50"
            >
              <div className="h-14 px-4 flex items-center justify-between border-b border-gray-300">
                <span className="font-semibold">Settings</span>
                <X onClick={() => setMobileOpen(false)} />
              </div>

              <nav className="p-3 space-y-1">
                {settingsNav.map((item) => (
                  <Link
                    key={item.id}
                    href={`/account/settings/${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
                      ${
                        isActive(`/account/settings/${item.id}`)
                          ? "bg-gray-300/70"
                          : "hover:bg-gray-100 dark:hover:bg-neutral-800"
                      }
              `}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
