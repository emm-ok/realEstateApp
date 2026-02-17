"use client";

import Hero from "@/components/create-company/Hero";
import CompanyRequirements from "@/components/create-company/Requirements";
import StartCard from "@/components/create-company/StartCard";
import StatusCard from "@/components/create-company/StatusCard";

export default function CreateCompanyPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-20 px-4">
      <div className="w-full max-w-4xl space-y-12">
        <Hero />
        <StatusCard />
        <CompanyRequirements />
        <StartCard />
      </div>
    </div>
  );
}
