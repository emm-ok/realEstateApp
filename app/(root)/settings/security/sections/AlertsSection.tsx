import SettingCard from "@/components/SettingCard";

export default function AlertsSection() {
  return (
    <SettingCard
      title="Login Alerts"
      description="Get notified on new device login"
    >
      <label className="flex items-center gap-3">
        <input type="checkbox" />
        Email me when a new device logs in
      </label>
    </SettingCard>
  );
}
