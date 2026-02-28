// sections/CancelSubscription.tsx
import SettingCard from "@/components/SettingCard";

export default function CancelSubscription() {
  return (
    <SettingCard
      title="Cancel Subscription"
      description="This will downgrade your account"
    >
      <button className="px-4 py-2 text-red-600 border border-red-300 rounded hover:bg-red-50">
        Cancel Plan
      </button>
    </SettingCard>
  );
}
