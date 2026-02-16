import SettingCard from "@/components/SettingCard";

export default function DangerZone() {
  return (
    <SettingCard
      title="Danger Zone"
      description="Irreversible actions"
    >
      <button className="px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50">
        Delete Account
      </button>
    </SettingCard>
  );
}
