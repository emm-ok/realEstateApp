const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Agent" },
  { id: 3, name: "User" },
  { id: 4, name: "Moderator" },
];

export default function RoleList({ onSelect }: any) {
  return (
    <div className="w-1/3 border-r border-gray-300 p-4 space-y-2">
      <h3 className="font-semibold mb-2">Roles</h3>

      {roles.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelect(role)}
          className="w-full text-left px-3 py-2 rounded hover:bg-gray-100"
        >
          {role.name}
        </button>
      ))}
    </div>
  );
}
