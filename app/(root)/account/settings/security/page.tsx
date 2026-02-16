"use client";

import PasswordSection from "./sections/PasswordSection";
import TwoFactorSection from "./sections/TwoFactorSection";
import SessionsSection from "./sections/SessionsSection";
import AlertsSection from "./sections/AlertsSection";
import DevicesSection from "./sections/DevicesSection";
import DangerZone from "./sections/DangerZone";

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
