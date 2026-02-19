// sections/PushNotifications.tsx
import SettingCard from "@/components/SettingCard";

export default function PushNotifications() {
  return (
    <SettingCard
      title="Push Notifications"
      description="Mobile & browser alerts"
    >
      <label className="flex gap-3 items-center">
        <input type="checkbox" />
        Enable push notifications
      </label>
    </SettingCard>
  );
}
