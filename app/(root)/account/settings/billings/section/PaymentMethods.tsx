// sections/PaymentMethods.tsx
import SettingCard from "@/components/SettingCard";

export default function PaymentMethods() {
  return (
    <SettingCard
      title="Payment Methods"
      description="Manage your cards"
    >
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Visa •••• 4242</span>
          <button className="text-red-500">Remove</button>
        </div>

        <button className="text-blue-600">Add new card</button>
      </div>
    </SettingCard>
  );
}
