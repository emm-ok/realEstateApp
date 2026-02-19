import SettingCard from "@/components/SettingCard";

export default function SearchVisibility() {
  return (
    <SettingCard
      title="Search Visibility"
      description="Appear in search results"
    >
      <label className="flex gap-3 items-center">
        <input type="checkbox" />
        Allow my profile to be indexed
      </label>
    </SettingCard>
  );
}
