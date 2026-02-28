"use client";

import BlockedUsers from "./section/BlockedUsers";
import DataDeletion from "./section/DataDeletion";
import DataExport from "./section/DataExport";
import DataSharing from "./section/DataSharing";
import ProfileVisibility from "./section/ProfileVisibility";
import SearchVisibility from "./section/SearchVisibility";

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Privacy Settings</h1>

      <ProfileVisibility />
      <DataSharing />
      <SearchVisibility />
      <BlockedUsers />
      <DataExport />
      <DataDeletion />
    </div>
  );
}
