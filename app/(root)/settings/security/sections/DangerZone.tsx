import SettingCard from "@/components/SettingCard";
import DeleteAccountPage from "../../delete-account/page";

export default function DangerZone() {
  return (
    <SettingCard title="Danger Zone" description="Irreversible actions">
      <DeleteAccountPage />
    </SettingCard>
  );
}
