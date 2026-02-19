// sections/ProductUpdates.tsx
import SettingCard from "@/components/SettingCard";

export default function ProductUpdates() {
  return (
    <SettingCard
      title="Product Updates"
      description="New features and improvements"
    >
      <label className="flex gap-3 items-center">
        <input type="checkbox" defaultChecked />
        Notify me about new features
      </label>
    </SettingCard>
  );
}
