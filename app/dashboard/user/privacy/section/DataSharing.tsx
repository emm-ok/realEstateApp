import SettingCard from "@/components/SettingCard";

export default function DataSharing() {
  return (
    <SettingCard
      title="Data Sharing"
      description="How your data is used"
    >
      <label className="flex gap-3 items-center">
        <input type="checkbox" />
        Allow analytics & product improvements
      </label>

      <label className="flex gap-3 items-center">
        <input type="checkbox" />
        Allow marketing communications
      </label>
    </SettingCard>
  );
}
