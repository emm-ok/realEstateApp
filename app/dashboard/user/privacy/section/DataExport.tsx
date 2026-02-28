import SettingCard from "@/components/SettingCard";

export default function DataExport() {
  return (
    <SettingCard
      title="Data Export"
      description="Download a copy of your data"
    >
      <button className="px-4 py-2 border rounded hover:bg-gray-100">
        Request Data Export
      </button>

      <p className="text-xs text-gray-500">
        We’ll email you a download link.
      </p>
    </SettingCard>
  );
}
