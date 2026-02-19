import SettingCard from "@/components/SettingCard";
import ChangePassword from "@/components/settings/sidebar/ChangePassword";

export default function PasswordSection() {
  return (
    <SettingCard
      title="Password"
      description="Change your account password"
    >
      <ChangePassword />
    </SettingCard>
  );
}
