import SettingCard from "@/components/SettingCard";

export default function PasswordSection() {
  return (
    <SettingCard
      title="Password"
      description="Change your account password"
    >
      <div className="flex gap-3">
        <input type="password" placeholder="Current password" />
        <input type="password" placeholder="New password" />
        <button className="btn-primary">Update</button>
      </div>
    </SettingCard>
  );
}
