// dashboard/page.tsx
"use client";

import ChatPreview from "@/components/dashboard/ChatPreview";
import StatsCard from "@/components/dashboard/StatsCard";
import ActiveListing from "@/components/dashboard/ActiveListing";

import { Coins, Handshake, House, User } from "lucide-react";
import Image from "next/image";
import chartImage from "@/public/undraw_visual-data_1eya.png";

const stats = [
  { id: 1, icon: User, value: 120, label: "Active Leads" },
  { id: 2, icon: Coins, value: "$96.7M", label: "Total Revenue" },
  { id: 3, icon: House, value: 23, label: "Active Listings" },
  { id: 4, icon: Handshake, value: 42, label: "Total Closed" },
];

export default function Dashboard() {
  return (
    <section className="w-full space-y-6">
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.id}
            Icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-xl shadow p-4">
            <Image
              src={chartImage}
              alt="Performance Chart"
              className="w-1/2 h-auto"
              priority
            />
          </div>

          <ActiveListing />
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <ChatPreview />
        </div>
      </div>
    </section>
  );
}
