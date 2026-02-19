import SettingCard from "@/components/SettingCard";

export default function ProfileVisibility() {
  return (
    <SettingCard
      title="Profile Visibility"
      description="Who can see your profile"
    >
      <select className="border rounded p-2">
        <option>Public</option>
        <option>Only logged-in users</option>
        <option>Only me</option>
      </select>
    </SettingCard>
  );
}
