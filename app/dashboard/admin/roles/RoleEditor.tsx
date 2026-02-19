import PermissionToggle from "./PermissionToggle";

const ALL_PERMISSIONS = [
  "CREATE_PROPERTY",
  "EDIT_PROPERTY",
  "DELETE_PROPERTY",
  "APPROVE_AGENT",
  "BAN_USER",
  "VIEW_FINANCE",
];

export default function RoleEditor({ role }: any) {
  if (!role) {
    return (
      <div className="w-2/3 flex items-center justify-center text-gray-400">
        Select a role
      </div>
    );
  }

  return (
    <div className="w-2/3 p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold">{role.name}</h2>
        <p className="text-gray-500">Edit permissions</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {ALL_PERMISSIONS.map((perm) => (
          <PermissionToggle key={perm} permission={perm} />
        ))}
      </div>

      <button className="btn-primary">Save Changes</button>
    </div>
  );
}
