import SettingCard from "@/components/SettingCard";
import { useState } from "react";

export default function TwoFactorSection() {
  const [enabled, setEnabled] = useState(false);

  return (
    <SettingCard
      title="Two-Factor Authentication"
      description="Extra layer of security using your phone"
    >
      <div className="flex justify-between items-center">
        <span
          className={`text-sm ${
            enabled ? "text-green-600" : "text-gray-500"
          }`}
        >
          {enabled ? "Enabled" : "Disabled"}
        </span>

        <button
          onClick={() => setEnabled(!enabled)}
          className="btn-secondary"
        >
          {enabled ? "Disable" : "Enable"}
        </button>
      </div>
    </SettingCard>
  );
}
