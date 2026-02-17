// sections/EmailNotifications.tsx
import SettingCard from "@/components/SettingCard";

export default function EmailNotifications() {
  return (
    <SettingCard
      title="Email Notifications"
      description="Control emails we send"
    >
      <label className="flex gap-3 items-center">
        <input type="checkbox" defaultChecked />
        Account activity
      </label>

      <label className="flex gap-3 items-center">
        <input type="checkbox" />
        Security alerts
      </label>
    </SettingCard>
  );
}
