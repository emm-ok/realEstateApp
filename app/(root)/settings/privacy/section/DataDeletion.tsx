import SettingCard from "@/components/SettingCard";

export default function DataDeletion() {
  return (
    <SettingCard
      title="Delete My Data"
      description="This action is irreversible"
    >
      <button className="px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50">
        Permanently Delete Account
      </button>
    </SettingCard>
  );
}
