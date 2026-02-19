// sections/MarketingPreferences.tsx
import SettingCard from "@/components/SettingCard";

export default function MarketingPreferences() {
  return (
    <SettingCard
      title="Marketing"
      description="Promotions & offers"
    >
      <label className="flex gap-3 items-center">
        <input type="checkbox" />
        Receive marketing emails
      </label>
    </SettingCard>
  );
}
