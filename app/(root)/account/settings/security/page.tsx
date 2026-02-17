"use client";

import AlertsSection from "./sections/AlertsSection";
import DangerZone from "./sections/DangerZone";
import DevicesSection from "./sections/DevicesSection";
import PasswordSection from "./sections/PasswordSection";
import SessionsSection from "./sections/SessionsSection";
import TwoFactorSection from "./sections/TwoFactorSection";



export default function SecurityPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Security Settings</h1>

      <PasswordSection />
      <TwoFactorSection />
      <SessionsSection />
      <AlertsSection />
      <DevicesSection />
      <DangerZone />
    </div>
  );
}
