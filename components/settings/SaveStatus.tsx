import { useSettingsStore } from "@/store/settings.store";

export function SaveStatus() {
  const { saveStatus, dirty } = useSettingsStore();

  return (
    <div className="text-sm mb-4">
      {dirty ? "Unsaved changes" : "All changes saved"}
    </div>
  );
}
