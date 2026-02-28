// sections/Invoices.tsx
import SettingCard from "@/components/SettingCard";

export default function Invoices() {
  return (
    <SettingCard
      title="Invoices"
      description="Your billing history"
    >
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Jan 2024</span>
          <button className="text-blue-600">Download</button>
        </div>
        <div className="flex justify-between">
          <span>Dec 2023</span>
          <button className="text-blue-600">Download</button>
        </div>
      </div>
    </SettingCard>
  );
}
