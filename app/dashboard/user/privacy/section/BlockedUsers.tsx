import SettingCard from "@/components/SettingCard";

export default function BlockedUsers() {
  return (
    <SettingCard
      title="Blocked Users"
      description="People you’ve blocked"
    >
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>john@example.com</span>
          <button className="text-blue-600">Unblock</button>
        </div>

        <div className="flex justify-between">
          <span>mary@example.com</span>
          <button className="text-blue-600">Unblock</button>
        </div>
      </div>
    </SettingCard>
  );
}
