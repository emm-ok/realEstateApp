"use client";

import { useState } from "react";
import { LayoutGrid, LogOut, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAVS } from "@/config/sidebarConfig";
import { Role } from "@/types/sidebar";
import { useAuth } from "@/context/AuthContext";

type SidebarProps = {
  role?: Role;
};

// export default function Sidebar({ role = "user" }: SidebarProps) {
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { logout } = useAuth();
  //   const navs = SIDEBAR_NAVS[role];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 px-4 py-2 rounded bg-gray-300"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-lg z-50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        md:static fixed top-0 left-0 h-full w-60 z-50 shadow-md
        transform transition-transform duration-300 bg-white
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between p-4 border-gray-700">
          <h1 className="text-lg font-semibold">Admin Panel</h1>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {SIDEBAR_NAVS.superadmin.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 p-2 rounded transition
                  hover:bg-gray-300
                  ${isActive(item.path) ? "bg-gray-800" : ""}
                `}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-800 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
}
