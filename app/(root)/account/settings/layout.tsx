"use client";

import { Sidebar } from "@/components/settings/sidebar/Sidebar";
import { SaveStatus } from "@/components/settings/SaveStatus";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 max-w-4xl">
        <SaveStatus />
        {children}
      </main>
    </div>
  );
}
