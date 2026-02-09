"use client";

import Hero from "@/components/become-agent/Hero";
import Requirements from "@/components/become-agent/Requirements";
import StartCard from "@/components/become-agent/StartCard";
import StatusCard from "@/components/become-agent/StatusCard";


export default function BecomeAgentPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-20">
      <div className="w-full max-w-3xl space-y-10">
        <Hero />
        <StatusCard />
        <Requirements />
        <StartCard />
      </div>
    </div>
  );
}
