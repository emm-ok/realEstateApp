import SettingCard from "@/components/SettingCard";

export default function SessionsSection() {
  return (
    <SettingCard
      title="Active Sessions"
      description="Devices currently logged in"
    >
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Chrome · Lagos, Nigeria</span>
          <button className="text-red-500">Log out</button>
        </div>
        <div className="flex justify-between">
          <span>iPhone · London, UK</span>
          <button className="text-red-500">Log out</button>
        </div>
      </div>
    </SettingCard>
  );
}
