import SettingCard from "@/components/SettingCard";

export default function DevicesSection() {
  return (
    <SettingCard
      title="Trusted Devices"
      description="Devices you marked as safe"
    >
      <ul className="text-sm space-y-1">
        <li>MacBook Pro</li>
        <li>iPhone 14</li>
      </ul>
    </SettingCard>
  );
}
