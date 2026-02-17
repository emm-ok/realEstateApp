"use client";

import { useState } from "react";
import { LogOut, Menu, Settings, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR_NAVS } from "@/config/sidebarConfig";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import logo from "@/assets/logo2.png";
import { useConfirm } from "../confirm/ConfirmProvider";
import { logoutUser } from "@/lib/auth";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();
  const confirm = useConfirm();

  const isActive = (href: string) => 
    pathname === href ;

  return (
    <motion.aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded(!expanded)} // mobile
      animate={{ width: expanded ? 260 : 64 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="fixed h-screen z-50 bg-gray-500/20 backdrop-blur-lg shadow-lg flex flex-col justify-between overflow-hidden"
    >
      {/* Logo */}
      <div className="">
        <div
          className={`flex gap-4 items-center py-4 ${
            expanded ? "justify-between px-4" : "justify-center"
          }`}
        >
          {expanded ? (
            <X onClick={() => setExpanded(false)}/>
          ) : (
            <Menu onClick={() => setExpanded(true)} />
          )}
          {expanded && (
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="VeriSpace logo"
                width={40}
                height={40}
                className="rounded-full shadow-sm"
              />
              <span className=" font-bold text-primary">VeriSpace</span>
            </Link>
          )}

          {/* {!expanded && (
            <Image
              src={logo}
              alt="VeriSpace logo"
              width={36}
              height={36}
              className="rounded-full shadow-sm"
            />
          )} */}
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 px-2">
          {SIDEBAR_NAVS.superadmin.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`flex items-center rounded-md transition
                ${
                  expanded
                    ? "gap-3 px-3 py-3 justify-start"
                    : "justify-center py-3"
                }
                ${
                  isActive(item.path)
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-200"
                }
              `}
              >
                <Icon size={18} />

                {expanded && <span className="">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col gap-1 px-2 pb-4">
        <Link
          href={`/account/settings/profile`}
          className={`flex items-center rounded-md transition
            ${
              expanded ? "gap-3 px-3 py-3 justify-start" : "justify-center py-3"
            }
            ${
              isActive(`/account/settings/profile`)
                ? "bg-neutral-300 font-semibold"
                : "hover:bg-gray-200"
            }
          `}
        >
          <Settings size={18} />
          {expanded && <span className="">Settings</span>}
        </Link>

        {user && (
          <button
            onClick={() =>
              confirm({
                title: "Are you sure you want to logout?",
                description: "You'll be signed out of your account",
                confirmText: "Logout",
                variant: "warning",
                onConfirm: async () => {
                  await logoutUser();
                  toast.loading("Redirecting...");
                  window.location.href = "/login";
                },
              })
            }
            className={`flex items-center rounded-md transition text-left
              ${
                expanded
                  ? "gap-3 px-3 py-3 justify-start"
                  : "justify-center py-3"
              }
              hover:bg-gray-200
            `}
          >
            <LogOut size={18} />
            {expanded && <span className="">Logout</span>}
          </button>
        )}
      </div>
    </motion.aside>
  );
}
