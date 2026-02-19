"use client";

import { useState } from "react";
import RoleList from "./RoleList";
import RoleEditor from "./RoleEditor";

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState<any>(null);

  return (
    <div className="flex h-[80vh] border border-gray-200 shadow-md rounded-xl overflow-hidden">
      <RoleList onSelect={setSelectedRole} />
      <RoleEditor role={selectedRole} />
    </div>
  );
}
