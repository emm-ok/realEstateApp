export default function PermissionToggle({ permission }: any) {
  return (
    <label className="flex items-center gap-3 border rounded p-3">
      <input type="checkbox" />
      <span className="text-sm">{permission}</span>
    </label>
  );
}
