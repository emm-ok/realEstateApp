"use client";

import React, { ReactNode, useState } from "react";
import Sidebar from "@/components/settings/sidebar/Sidebar";
import SettingsTopbar from "@/components/settings/SettingsTopbar";

interface Props {
  children: ReactNode;
}

export default function SettingsLayout({ children }: Props) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Sidebar
        expanded={sidebarExpanded}
        setExpanded={setSidebarExpanded}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300
          md:ml-[72px] ${sidebarExpanded ? "md:ml-[260px]" : ""}
        `}
      >
        <SettingsTopbar setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
