// sections/CurrentPlan.tsx
import SettingCard from "@/components/SettingCard";

export default function CurrentPlan() {
  return (
    <SettingCard
      title="Current Plan"
      description="Your subscription details"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-medium">Pro Plan</p>
          <p className="text-sm text-gray-500">$29 / month</p>
        </div>
        <button className="btn-primary">Upgrade</button>
      </div>
    </SettingCard>
  );
}
